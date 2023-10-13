import NodeTypes from './types'
import { NodesData } from '../../../../consts/NodesData'

export default (node, runtime) => {
  const nodeInfo = NodesData[node.code]
  const Node = NodeTypes[node.type || nodeInfo.type]
  if (!Node) { throw new Error(`Undefined node type: ${node.type}`) }
  return new Node(node, runtime)
}
