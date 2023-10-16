import { addPinned} from "../../../logic-engine/GraphEditor/commands/AddPinned"


describe('addPinned', function () {
  const nodes = {
    'entry': {
      uuid: 'entry',
      type: 'Entry',
      execOutputs: [{uuid: 'entry_out'}],
      pins: [{
        type: 0,
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
        type: 1,
      },
      {
        uuid: 'result_pin',
        type: 3,
        outputUuid: 'out1',
      },
      {
        uuid: 'result_pin2',
        type: 3,
        outputUuid: 'out2',
      }]
    }
  }

  it('for multiple should set pinned object', () => {
    expect(addPinned(nodes.entry.pins, 'arg_pin', {node: 'return', pin: 'return_in'})).toStrictEqual(
      [ {"pinned": null, "type": 0},
        {"name": "input", "type": 3, "pinned": [{"node": "return", "pin": "return_in"}], "uuid": "arg_pin"},
        {"name": "input2", "type": 3, "pinned": [{"node": "return", "pin": "out1"}], "uuid": "arg_pin2"}
    ])
    expect(addPinned(nodes.entry.pins, 'arg_pin2', {node: 'return', pin: 'return_in'})).toStrictEqual(
      [
        {"pinned": null, type: 0},
        {"name": "input", "uuid": "arg_pin", type: 3},
        {"name": "input2", type: 3, "pinned": [{"node": "return", "pin": "out1"},
        {"node": "return", "pin": "return_in"}], "uuid": "arg_pin2"}]
    )
  })
})
