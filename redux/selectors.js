import _each from 'lodash/each'
import NodeList from '../registers/NodeList'

export const getState = (state) => state

export const getNodeList = (state, nodeRegister) => {
  let list = NodeList
  if (nodeRegister) {
    _each(nodeRegister.all(), (nodes, category) => {
      list = [...list, {
        title: category,
        key: category,
        category: true,
        selectable: false,
        children: nodes.map((node, name) => ({
          key: name,
          title: node.title,
          ...node,
          type: 'UserNode',
        })),
      }]
    })
  }

  return list
}
