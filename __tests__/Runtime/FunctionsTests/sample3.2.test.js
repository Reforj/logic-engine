import BuildFunction from '../../../logic-engine/Runtime/commands/BuildFunction'

describe('Func with arguments and pin with multiple connections', function () {
  const data = {
    nodes: {
      'entry': {
        uuid: 'entry',
        type: 'Entry',
        pins: [{
          side: 1,
          exec: true,
          pinned: {
            node: 'return',
            socket: 'return_in'
          },
        },
        {
          uuid: 'arg_pin',
          side: 1,
          type: 'Var',
          inputUuid: 'arg1',
          name: 'input',
          pinned: [{
            node: 'return',
            socket: 'result_pin'
          },{
            node: 'return',
            socket: 'result_pin2'
          }]
        }]
      },
      'return': {
        uuid: 'return',
        type: 'Return',
        exec: true,
        pins: [{
          side: 0,
          exec: true,
          pinned: {
            node: 'entry',
            socket: 'entry_out'
          }
        },
        {
          uuid: 'result_pin',
          side: 0,
          outputUuid: 'out1',
          pinned: {
            node: 'entry',
            socket: 'arg_pin'
          }
        },
        {
          uuid: 'result_pin2',
          side: 0,
          outputUuid: 'out2',
          pinned: {
            node: 'entry',
            socket: 'arg_pin'
          }
        }]
      }
    },
    inputs: [{uuid: 'arg1', name: 'input'}],
    outputs: [{uuid: 'out1', name: 'result'}, {uuid: 'out2', name: 'result2'}],
  }

  const func = BuildFunction(data)

  it('should return passed arg', () => {
    expect(func({func: data}, 5, 10)).toStrictEqual([5, 5])
  })
})
