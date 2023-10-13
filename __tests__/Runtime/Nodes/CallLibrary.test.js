import CallLibrary from '../../../logic-engine/Runtime/commands/Nodes/types/CallLibrary'
import { NodeCode } from '../../../consts/NodesData'

describe('CallLibrary with arguments', function () {
  const data = {
    uuid: 'plus',
    code: NodeCode.OPERATOR_PLUS_NUMBER,
    pins: [{
      uuid: 'input1',
      side: 0,
      pinned: {},
    },
    {
      uuid: 'input2',
      side: 0,
      pinned: {},
    },{
      uuid: 'out1',
      side: 1,
    }],
  }

  const node = new CallLibrary(data)

  it('should call lib method and return result', () => {
    expect(node.exec({}, [5, 10])).toStrictEqual({next: null, outputs: [15]})
  })
})
