import './types'
import NodeRegister from '../../registers/NodeHandlerRegister'

export default (node, runtime) => {
  const Node = NodeRegister.get(node.type)
  if (!Node) { throw 'Undefined node type: ' + node.type }
  return new Node(node, runtime)
}
