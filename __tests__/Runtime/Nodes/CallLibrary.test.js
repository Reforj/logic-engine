import CallLibrary from '../../../logic-engine/Runtime/commands/Nodes/types/CallLibrary'

describe('CallLibrary with arguments', function () {
  const data = {
    uuid: 'plus',
    type: 'Operator',
    path: 'Operator.Plus',
    pins: [{
      uuid: 'input1',
      side: 'In',
      type: 'Var',
      pinned: {},
    },
    {
      uuid: 'input2',
      side: 'In',
      type: 'Var',
      pinned: {},
    },{
      uuid: 'out1',
      side: 'Out',
      type: 'Var',
    }],
  }

  const node = new CallLibrary(data)

  it('should call lib method and return result', () => {
    expect(node.exec({}, {input1: 5, input2: 10})).toStrictEqual({next: null, outputs: {'out1': 15}})
  })
});
