import { addPinned} from "../../../logic-engine/GraphEditor/commands/AddPinned";


describe('addPinned', function () {
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

  it('for multiple should set pinned object', () => {
    expect(addPinned(nodes.entry.pins, 'arg_pin', {node: 'return', socket: 'return_in'})).toStrictEqual([{"pinned": null, "side": "Out", "type": "Exec"}, {"multiple": true, "name": "input", "pinned": [{"node": "return", "socket": "return_in"}], "side": "Out", "type": "Var", "uuid": "arg_pin"}, {"multiple": true, "name": "input2", "pinned": [{"node": "return", "socket": "out1"}], "side": "Out", "type": "Var", "uuid": "arg_pin2"}])
    expect(addPinned(nodes.entry.pins, 'arg_pin2', {node: 'return', socket: 'return_in'})).toStrictEqual([{"pinned": null, "side": "Out", "type": "Exec"}, {"multiple": true, "name": "input", "side": "Out", "type": "Var", "uuid": "arg_pin"}, {"multiple": true, "name": "input2", "pinned": [{"node": "return", "socket": "out1"}, {"node": "return", "socket": "return_in"}], "side": "Out", "type": "Var", "uuid": "arg_pin2"}])
  })
});
