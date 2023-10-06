import _ from 'lodash'
import NodeList from '../registers/NodeList'

export const getState = state => state

export const getNodeList = (state, nodeRegister) => {

  let list = NodeList

  _.each(nodeRegister.all(), (nodes, category) => {
    list = [...list, {
      title: category,
      key: category,
      category: true,
      selectable: false,
      children: _.map(nodes, (node, name)=> {
        return {
          key: name,
          title: node.title,
          ...node,
          customType: node.type,
          type: 'UserNode',
        }
      })
    }]
  })

  return list
}
