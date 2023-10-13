import Entry from '../../../logic-engine/Runtime/commands/Nodes/types/Entry'
import { NodeCode } from '../../../consts/NodesData'
import {Entry as EntryNode, Return} from '../../../registers/NodeTypes'

describe('Func with arguments', function () {

  const entry = EntryNode({inputs: [{name: 'arg1'}]})
  const ret = Return()

  entry.pins[0].pinned = { node: ret.uuid, pin: ret.pins[0].uuid }

  const func = {
    nodes: {
      'entry': entry,
      'return': ret
    }
  }

  const node = new Entry(entry)

  it('should exec should return next node and socekt outputs', () => {
    expect(node.exec(func, ['hello'])).toStrictEqual({next: {uuid: ret.uuid}, outputs: ['hello']})
  })

  it('should ignore extra params', () => {
    expect(node.exec(func, ['hello', 'world'])).toStrictEqual({next: {uuid: ret.uuid}, outputs: ['hello']})
  })

  it('should return next null', () => {
    expect(new Entry({executable: true, pins: [{uuid: 'entry_out', exec: true, side: 1}]}, {inputs: []}).exec({}, [])).toStrictEqual({next: null, outputs: []})
  })
})
