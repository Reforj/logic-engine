import BuildFunction from '../../../logic-engine/Runtime/commands/BuildFunction'

describe('Func with arguments and cross connections', function () {
  const data = {
    nodes: {
      'entry': {
        uuid: 'entry',
        type: 'Entry',
        execOutputs: [{uuid: 'entry_out'}],
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
          name: 'input',
          pinned: {
            node: 'return',
            socket: 'out2'
          }
        },
        {
          uuid: 'arg_pin2',
          side: 1,
          type: 'Var',
          name: 'input2',
          pinned: {
            node: 'return2',
            socket: 'out1'
          }
        }]
      },
      'return': {
        uuid: 'return',
        type: 'Return',
        execInputs: [{uuid: 'return_in'}],
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
          type: 'Var',
          outputUuid: 'out1',
          pinned: {
            node: 'entry',
            socket: 'arg_pin2'
          }
        },
        {
          uuid: 'result_pin2',
          side: 0,
          type: 'Var',
          outputUuid: 'out2',
          pinned: {
            node: 'entry',
            socket: 'arg_pin'
          }
        }]
      }
    },
  }

  const func = BuildFunction(data)

  it('should return passed arg', () => {
    expect(func({func: data}, 5, 10)).toStrictEqual([10, 5])
  })
})
