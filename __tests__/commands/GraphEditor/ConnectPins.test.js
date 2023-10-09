import { ConnectPins } from "../../../logic-engine/GraphEditor/commands/ConnectPins";

describe('ConnectPins', function () {
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
          socket: 'result_pin'
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
        pinned: {
          node: 'entry',
          socket: 'arg_pin2'
        }
      }]
    }
  }

  it('for multiple should set pinned objects', () => {
    const newNodes = ConnectPins(nodes, {node: nodes.entry, pin: nodes.entry.pins[1]}, {node: nodes.return, pin: nodes.return.pins[1]})
    expect(newNodes[0].pins[0]).toBe(nodes.entry.pins[0])
    expect(newNodes[0].pins[2]).toBe(nodes.entry.pins[2])
    expect(newNodes[0].pins[1].pinned).toStrictEqual([{node: 'return', socket: 'result_pin'}])
    expect(newNodes[1].pins[1].pinned).toStrictEqual({node: 'entry', socket: 'arg_pin'})
  })

  it('for multiple should set pinned objects', () => {
    const newNodes = ConnectPins(nodes, {node: nodes.return, pin: nodes.return.pins[1]}, {node: nodes.entry, pin: nodes.entry.pins[1]})
    expect(newNodes[0].pins[0]).toBe(nodes.return.pins[0])
    expect(newNodes[0].pins[2]).toBe(nodes.return.pins[2])
    expect(newNodes[0].pins[1].pinned).toStrictEqual({node: 'entry', socket: 'arg_pin'})
    expect(newNodes[1].pins[1].pinned).toStrictEqual([{node: 'return', socket: 'result_pin'}])
  })

  it('should return empty if source eq destination nodes', () => {
    const newNodes = ConnectPins(nodes, {node: nodes.entry, pin: nodes.return.pins[1]}, {node: nodes.entry, pin: nodes.entry.pins[1]})
    expect(newNodes).toBe(undefined)
  })

  it('should add pinned to existed pinned', () => {
    const newNodes = ConnectPins(nodes, {node: nodes.entry, pin: nodes.entry.pins[2]}, {node: nodes.return, pin: nodes.return.pins[2]})

    expect(newNodes[0].pins[2].pinned).toStrictEqual([{"node": "return", "socket": "result_pin"}, {"node": "return", "socket": "result_pin2"}])
    expect(newNodes[1].pins[2].pinned).toStrictEqual({"node": "entry", "socket": "arg_pin2"})
  })
});
