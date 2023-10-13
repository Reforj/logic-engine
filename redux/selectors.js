import _map from 'lodash/map'
import { NodeType } from '../consts/NodesData'
import NodeList from '../registers/NodeList'

export const getState = (state) => state

export const getNodeList = (state, nodeRegister) => {
  let list = NodeList
  if (nodeRegister) {
    _map(nodeRegister.all(), (nodes, category) => {
      list = [...list, {
        title: category,
        key: category,
        category: true,
        selectable: false,
        children: _map(nodes, (node) => ({
          type: NodeType.UserNode,
          ...node,
        })),
      }]
    })
  }

  return list
}
