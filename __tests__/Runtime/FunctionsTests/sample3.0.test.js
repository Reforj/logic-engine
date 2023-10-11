import BuildFunction from '../../../logic-engine/Runtime/commands/BuildFunction'

describe('Func with arguments and binidings', function () {
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
          name: 'input',
          pinned: {
            node: 'return',
            socket: 'res1'
          }
        },
        {
          uuid: 'arg_pin2',
          side: 1,
          type: 'Var',
          name: 'input2',
          pinned: {
            node: 'return',
            socket: 'res2'
          }
        }]
      },
      'return': {
        uuid: 'return',
        type: 'Return',
        pins: [{
          uuid: 'return_in',
          side: 0,
          exec: true,
          pinned: {
            node: 'entry',
            socket: 'entry_out'
          }
        },
        {
          uuid: 'res1',
          side: 0,
          outputUuid: 'out1',
          pinned: {
            node: 'entry',
            socket: 'arg_pin'
          }
        },
        {
          uuid: 'res2',
          side: 0,
          outputUuid: 'out2',
          pinned: {
            node: 'entry',
            socket: 'arg_pin2'
          }
        }]
      }
    },
  }

  const func = BuildFunction(data)

  it('should return passed arg', () => {
    expect(func({}, 5, 10)).toStrictEqual([5, 10])
  })
})
