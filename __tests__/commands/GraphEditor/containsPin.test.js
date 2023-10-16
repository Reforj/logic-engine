import {  containsPin } from "../../../logic-engine/GraphEditor/commands/AddPinned"


describe('containsPin', function () {
  const nodes = {
    'entry': {
      uuid: 'entry',
      type: 'Entry',
      execOutputs: [{uuid: 'entry_out'}],
      pins: [{
        side: "Out",
        type: 'Exec',
        pinned: {
          node: 'return',
          pin: 'return_in'
        },
      },
      {
        uuid: 'arg_pin',
        side: 'Out',
        type: 'Var',
        name: 'input',
        pinned: [{
          node: 'return',
          pin: 'out1'
        },{
          node: 'return',
          pin: 'out2'
        }]
      },
      {
        uuid: 'arg_pin2',
        side: 'Out',
        type: 'Var',
        name: 'input2',
        pinned: {
          node: 'return2',
          pin: 'out2'
        }
      }]
    },
    'return': {
      uuid: 'return',
      type: 'Return',
      pins: [{
        side: "In",
        type: 'Exec',
        pinned: {
          node: 'entry',
          pin: 'entry_out'
        }
      },
      {
        uuid: 'result_pin',
        side: 'In',
        type: 'Var',
        outputUuid: 'out1',
        pinned: {
          node: 'entry',
          pin: 'arg_pin'
        }
      },
      {
        uuid: 'result_pin2',
        side: 'In',
        type: 'Var',
        outputUuid: 'out2',
        pinned: {
          node: 'entry',
          pin: 'arg_pin2'
        }
      }]
    }
  }

  it('should return passed arg', () => {
    expect(containsPin(null, {node: 'return', pin: 'return_in'})).toBe(false)
    expect(containsPin(nodes.entry.pins[0].pinned, {node: 'return', pin: 'return_in'})).toBe(true)
    expect(containsPin(nodes.entry.pins[0].pinned, {node: 'return', pin: 'return_in2'})).toBe(false)
    expect(containsPin(nodes.entry.pins[1].pinned, {node: 'return', pin: 'out1'})).toBe(true)
    expect(containsPin(nodes.entry.pins[1].pinned, {node: 'return', pin: 'out2'})).toBe(true)
    expect(containsPin(nodes.entry.pins[1].pinned, {node: 'return', pin: 'out3'})).toBe(false)
  })
})
