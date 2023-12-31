import BuildFunction from '../../../logic-engine/Runtime/commands/BuildFunction'
import {Entry as EntryNode, Return} from '../../../registers/NodeTypes'

describe('Func with connection to return', function () {
  const entry = EntryNode({inputs: [{name: 'arg1'}, {name: 'arg2'}]})
  const ret = Return()

  const data = {
    nodes: {
      'entry': entry,
      'return': ret,
    }
  }


  const func = BuildFunction(data)

  it('should return empty', () => {
    expect(func({func: data})).toStrictEqual([])
  })
})
