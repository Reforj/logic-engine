import Entry from '../../../logic-engine/Runtime/commands/Nodes/types/Entry'

describe('Func with arguments', function () {
  const func = {
    nodes: {
      'entry': {
        uuid: 'entry',
        type: 'Entry',
        pins: [{
          uuid: 'exec_out',
          side: 'Out',
          exec: true,
          pinned: {
            node: 'return',
            socket: 'return_in'
          }
        },
        {
          side: 'Out',
          inputUuid: 'arg1',
          uuid: 'input_arg'
        }]
      },
      'return': {
        uuid: 'return',
        type: 'Return',
        execInputs: [{uuid: 'return_in'}]
      }
    },
    inputs: [{uuid: 'arg1', name: 'input'}],
    outputs: [{uuid: 'out1', name: 'output'}],
  }

  const node = new Entry(func.nodes.entry, func)

  it('should exec should return next node and socekt outputs', () => {
    expect(node.exec(func, ['hello'])).toStrictEqual({next: {uuid: 'return'}, outputs: ['hello']})
  })

  it('should ignore extra params', () => {
    expect(node.exec(func, ['hello', 'world'])).toStrictEqual({next: {uuid: 'return'}, outputs: ['hello']})
  })

  it('should return next null', () => {
    expect(new Entry({pins: [{uuid: 'entry_out', exec: true, side: 'Out'}]}, {inputs: []}).exec({}, [])).toStrictEqual({next: null, outputs: []})
  })
})
