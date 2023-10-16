import BuildFunction from '../../../logic-engine/Runtime/commands/BuildFunction'
import {Entry as EntryNode, Return} from '../../../registers/NodeTypes'


describe('Func with arguments', function () {
  const entry = EntryNode({inputs: [{name: 'arg1'}, {name: 'arg2'}]})
  const ret = Return()
  entry.pins[0].pinned = {node: ret.uuid, pin: ret.pins[0].uuid}
  entry.pins[1].pinned = {node: ret.uuid, pin: ret.pins[1].uuid}
  ret.pins[1].pinned = {node: entry.uuid, pin: entry.pins[1].uuid}

  const data = {
    nodes: {
      'entry': entry,
      'return': ret,
    }
  }

  const func = BuildFunction(data)

  it('should return passed arg', () => {
    expect(func({}, 5, 10)).toStrictEqual([5])
  })
})
