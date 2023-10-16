import { ConnectPins } from "../../../logic-engine/GraphEditor/commands/ConnectPins"

describe('ConnectPins', function () {
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
          pin: 'result_pin'
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
        type: 2,
        outputUuid: 'out1',
      },
      {
        uuid: 'result_pin2',
        type: 2,
        outputUuid: 'out2',
        pinned: {
          node: 'entry',
          pin: 'arg_pin2'
        }
      }]
    }
  }

  it('for multiple should set pinned objects', () => {
    const newNodes = ConnectPins(nodes, {node: nodes.entry, pin: nodes.entry.pins[1]}, {node: nodes.return, pin: nodes.return.pins[1]})
    expect(newNodes[0].pins[0]).toBe(nodes.entry.pins[0])
    expect(newNodes[0].pins[2]).toBe(nodes.entry.pins[2])
    expect(newNodes[0].pins[1].pinned).toStrictEqual([{node: 'return', pin: 'result_pin'}])
    expect(newNodes[1].pins[1].pinned).toStrictEqual({node: 'entry', pin: 'arg_pin'})
  })

  it('for multiple should set pinned objects', () => {
    const newNodes = ConnectPins(nodes, {node: nodes.return, pin: nodes.return.pins[1]}, {node: nodes.entry, pin: nodes.entry.pins[1]})
    expect(newNodes[0].pins[0]).toBe(nodes.return.pins[0])
    expect(newNodes[0].pins[2]).toBe(nodes.return.pins[2])
    expect(newNodes[0].pins[1].pinned).toStrictEqual({node: 'entry', pin: 'arg_pin'})
    expect(newNodes[1].pins[1].pinned).toStrictEqual([{node: 'return', pin: 'result_pin'}])
  })

  it('should return empty if source eq destination nodes', () => {
    const newNodes = ConnectPins(nodes, {node: nodes.entry, pin: nodes.return.pins[1]}, {node: nodes.entry, pin: nodes.entry.pins[1]})
    expect(newNodes).toBe(undefined)
  })

  it('should add pinned to existed pinned', () => {
    const newNodes = ConnectPins(nodes, {node: nodes.entry, pin: nodes.entry.pins[2]}, {node: nodes.return, pin: nodes.return.pins[2]})

    expect(newNodes[0].pins[2].pinned).toStrictEqual([{"node": "return", "pin": "result_pin"}, {"node": "return", "pin": "result_pin2"}])
    expect(newNodes[1].pins[2].pinned).toStrictEqual({"node": "entry", "pin": "arg_pin2"})
  })
})
