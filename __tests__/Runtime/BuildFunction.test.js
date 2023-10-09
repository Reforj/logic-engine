import BuildFunction from '../../logic-engine/Runtime/commands/BuildFunction'

describe('Func with arguments', function () {
  const data = {
    nodes: {
      'entry': {
        uuid: 'entry',
        type: 'Entry',
        execOutputs: [{uuid: 'entry_out'}],
        pins: [{
          side: "Out",
          exec: true,
          pinned: {
            node: 'return',
            socket: 'return_in'
          },
        },
        {
          uuid: 'arg1',
          side: 'Out',
          type: 'Var',
          name: 'input',
          pinned: {
            node: 'return',
            socket: 'res1'
          }
        },
        {
          uuid: 'arg2',
          side: 'Out',
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
        execInputs: [{uuid: 'return_in'}],
        pins: [{
          side: "In",
          exec: true,
          pinned: {
            node: 'entry',
            socket: 'entry_out'
          }
        },
        {
          uuid: 'res1',
          side: 'In',
          type: 'Var',
          name: 'result',
          pinned: {
            node: 'entry',
            socket: 'arg1'
          }
        },
        {
          uuid: 'res2',
          side: 'In',
          type: 'Var',
          name: 'result2',
          pinned: {
            node: 'entry',
            socket: 'arg2'
          }
        }]
      }
    },
  }

  const func = BuildFunction(data)

  it('should return passed arg', () => {
    expect(func({}, 5, 10)).toStrictEqual([5, 10])
  })
});
