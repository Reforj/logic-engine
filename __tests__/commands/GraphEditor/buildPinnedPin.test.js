import {  AddConnection, buildPinnedPin, addPinned} from "../../../logic-engine/GraphEditor/commands/AddPinned"


describe('buildPinnedPin', function () {
  const nodes = {
    'entry': {
      uuid: 'entry',
      type: 'Entry',
      execOutputs: [{uuid: 'entry_out'}],
      pins: [{
        type: 1,
        pinned: null,
      },
      {
        uuid: 'arg_pin',
        type: 3,
        name: 'input',
      },
      {
        uuid: 'arg_pin2',
        type: 3,
        name: 'input2',
        pinned: [{
          node: 'return',
          pin: 'out1'
        }]
      }]
    },
    'return': {
      uuid: 'return',
      type: 'Return',
      pins: [{
        type: 0,
      },
      {
        uuid: 'result_pin',
        type: 1,
        outputUuid: 'out1',
      },
      {
        uuid: 'result_pin2',
        type: 1,
        outputUuid: 'out2',
      }]
    }
  }

  it('for non multiple should set pinned object', () => {
    expect(buildPinnedPin(nodes.entry.pins[0], {node: 'return', pin: 'return_in'}).pinned).toStrictEqual({"node": "return", "pin": "return_in"})
  })

  it('for multipins should add pin to pinned', () => {
    expect(buildPinnedPin(nodes.entry.pins[1], {node: 'return', pin: 'out1'}).pinned).toStrictEqual([{"node": "return", "pin": "out1"}])
    expect(buildPinnedPin(nodes.entry.pins[1], {node: 'return', pin: 'out2'}).pinned).toStrictEqual([{"node": "return", "pin": "out2"}])
    expect(buildPinnedPin(nodes.entry.pins[2], {node: 'return', pin: 'out2'}).pinned).toStrictEqual([{"node": "return", "pin": "out1"}, {"node": "return", "pin": "out2"}])
    expect(buildPinnedPin(nodes.entry.pins[2], {node: 'return', pin: 'out1'}).pinned).toBe(nodes.entry.pins[2].pinned)
    expect(buildPinnedPin(nodes.return.pins[1], {node: 'entry', pin: 'arg_pin'}).pinned).toStrictEqual({"node": "entry", "pin": "arg_pin"})
  })
})
