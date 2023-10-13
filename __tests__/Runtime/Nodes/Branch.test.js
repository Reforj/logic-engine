import BranchNode from '../../../logic-engine/Runtime/commands/Nodes/types/Branch'
import {RegularNode} from '../../../registers/NodeTypes'
import { NodeCode, NodeType, NodesData } from '../../../consts/NodesData'

describe('Branch with arguments', function () {
  const data = RegularNode({}, {code: NodeCode.BRANCH, ...NodesData[NodeCode.BRANCH]})

  const node = new BranchNode(data)
  node.pins[3].pinned = {node: 'dummy_uuid'}

  node.pins[1].pinned = {node: 'dummy_uuid'}
  node.pins[2].pinned = {node: 'dummy_uuid'}

  it('should call lib method and return result', () => {
    expect(node.exec({}, [true])).toStrictEqual({next: {uuid: 'dummy_uuid'}, outputs: []})
    expect(node.exec({}, [false])).toStrictEqual({next: {uuid: 'dummy_uuid'}, outputs: []})
  })
})
