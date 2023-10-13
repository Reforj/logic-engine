import BuildFunction from '../../../logic-engine/Runtime/commands/BuildFunction'
import {Entry as EntryNode, Return} from '../../../registers/NodeTypes'

describe('Empty Function', function () {
  const entry = EntryNode({inputs: [{name: 'arg1'}, {name: 'arg2'}]})

  const data = {
    nodes: {
      entry,
    }
  }

  const func = BuildFunction(data)

  it('should return empty array', () => {
    expect(func(data)).toStrictEqual([])
  })
})
