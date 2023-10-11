import {  AddConnection, buildPinnedPin, addPinned} from "../../../logic-engine/GraphEditor/commands/AddPinned"


describe('buildPinnedPin', function () {
  const nodes = {
    'entry': {
      uuid: 'entry',
      type: 'Entry',
      execOutputs: [{uuid: 'entry_out'}],
      pins: [{
        side: "Out",
        type: 'Exec',
        pinned: null,
      },
      {
        uuid: 'arg_pin',
        side: 'Out',
        type: 'Var',
        name: 'input',
        multiple: true,
        // pinned: [{
        //   node: 'return',
        //   socket: 'out1'
        // },{
        //   node: 'return',
        //   socket: 'out2'
        // }]
      },
      {
        uuid: 'arg_pin2',
        side: 'Out',
        type: 'Var',
        name: 'input2',
        multiple: true,
        pinned: [{
          node: 'return',
          socket: 'out1'
        }]
      }]
    },
    'return': {
      uuid: 'return',
      type: 'Return',
      pins: [{
        side: "In",
        type: 'Exec',
        // pinned: {
        //   node: 'entry',
        //   socket: 'entry_out'
        // }
      },
      {
        uuid: 'result_pin',
        side: 'In',
        type: 'Var',
        outputUuid: 'out1',
        // pinned: {
        //   node: 'entry',
        //   socket: 'arg_pin'
        // }
      },
      {
        uuid: 'result_pin2',
        side: 'In',
        type: 'Var',
        outputUuid: 'out2',
        // pinned: {
        //   node: 'entry',
        //   socket: 'arg_pin2'
        // }
      }]
    }
  }

  it('for non multiple should set pinned object', () => {
    expect(buildPinnedPin(nodes.entry.pins[0], {node: 'return', socket: 'return_in'}).pinned).toStrictEqual({"node": "return", "socket": "return_in"})
  })

  it('for multipins should add pin to pinned', () => {
    expect(buildPinnedPin(nodes.entry.pins[1], {node: 'return', socket: 'out1'}).pinned).toStrictEqual([{"node": "return", "socket": "out1"}])
    expect(buildPinnedPin(nodes.entry.pins[1], {node: 'return', socket: 'out2'}).pinned).toStrictEqual([{"node": "return", "socket": "out2"}])
    expect(buildPinnedPin(nodes.entry.pins[2], {node: 'return', socket: 'out2'}).pinned).toStrictEqual([{"node": "return", "socket": "out1"}, {"node": "return", "socket": "out2"}])
    expect(buildPinnedPin(nodes.entry.pins[2], {node: 'return', socket: 'out1'}).pinned).toBe(nodes.entry.pins[2].pinned)
    expect(buildPinnedPin(nodes.return.pins[1], {node: 'entry', socket: 'arg_pin'}).pinned).toStrictEqual({"node": "entry", "socket": "arg_pin"})
  })
})
