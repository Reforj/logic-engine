import Return from '../../../logic-engine/Runtime/commands/Nodes/types/Return'

describe('Return arguments', function () {
  const func = {
    nodes: {
      'return': {
        uuid: 'reutnr',
        type: 'Return',
        pins: [{
          side: 0,
          exec: true,
          pinned: {
            node: 'return',
            socket: 'return_in'
          }
        },
        {
          side: 0,
          type: 'Var',
          outputUuid: 'output',
          uuid: 'output_arg',
          defaultValue: 10,
          pinned: {}
        }]
      },
    },
  }

  const node = new Return(func.nodes.return, func)

  it('exec should return next node and socekt outputs', () => {
    expect(node.exec(func, ['hello'])).toStrictEqual({return: true, outputs: ["hello"]})
  })

  it('exec should ignore extra args', () => {
    expect(node.exec(func, ['hello', '123'])).toStrictEqual({return: true, outputs: ["hello"]})
  })

  it('exec should return default value if pin not pinned', () => {
  const data = {...func.nodes.return}
  data.pins[1].pinned = null
  const node = new Return(data, func)
  expect(node.exec(func, [])).toStrictEqual({return: true, outputs: [10]})
  })
})
