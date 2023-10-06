import {
  INIT, RESET, ADD_NODE, CHANGE_NODE, CHANGE_NODES, REMOVE_NODE, REMOVE_NODES
} from '../actions'
import { setIn } from '../../utils/immutable'
import { RemoveNode } from '../../logic-engine/GraphEditor/commands/RemoveNode'
import _ from 'lodash'

export const defaultState = {}

const HANDLERS = {
  [INIT]: (state, {nodes}) => ({...state, ...nodes}),
  [RESET]: () => defaultState,
  [ADD_NODE]: (state, {ui, uuid, node}) => ({...state, [node.uuid]: node}),
  [CHANGE_NODE]: (state, {ui, uuid, node}) => setIn(state, [node.uuid], node),
  [CHANGE_NODES]: (state, {ui, uuid, nodes}) => {
    return _.reduce(nodes, (nodes, n) => {
      return {...nodes, [n.uuid]: n}
    }, state)
  },
  [REMOVE_NODE]: (state, {ui, uuid, node}) => {
    const nodes = RemoveNode(state, node)

    return _.reduce(nodes, (nodes, n) => {
      return {...nodes, [n.uuid]: n}
    }, _.omit(state, node))
  },
  [REMOVE_NODES]: (state, {ui, data}) => {
    let newstate = state
    _.each(data, (nodes, uuid) => {
      _.each(nodes, (node) => {
        newstate = _.omit(newstate, `functions.${uuid}.nodes.${node.uuid}`)
        const connectionsToRemove = _.filter(newstate[currentType(ui)][uuid].connections, (c) => (c.source === node.uuid || c.destination === node.uuid))
        _.each(connectionsToRemove, (c) => {
          newstate = _.omit(newstate, `functions.${uuid}.connections.${c.uuid}`)
        })
      })
    })
    return newstate
  },
}


export default function reducer(state = defaultState, action) {
  const handler = HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
