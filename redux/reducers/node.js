import {
  INIT, RESET, ADD_NODE, CHANGE_NODE, CHANGE_NODES, REMOVE_NODE,
} from '../actions'
import { setIn } from '../../utils/immutable'
import { RemoveNode } from '../../logic-engine/GraphEditor/commands/RemoveNode'
import _ from 'lodash'

export const defaultState = {}

const HANDLERS = {
  [INIT]: (state, {nodes}) => ({...state, ...nodes}),
  [RESET]: () => defaultState,
  [ADD_NODE]: (state, {uuid, node}) => ({...state, [node.uuid]: node}),
  [CHANGE_NODE]: (state, {uuid, node}) => setIn(state, [node.uuid], node),
  [CHANGE_NODES]: (state, {uuid, nodes}) => {
    return _.reduce(nodes, (nodes, n) => {
      return {...nodes, [n.uuid]: n}
    }, state)
  },
  [REMOVE_NODE]: (state, {uuid, node}) => {
    const nodes = RemoveNode(state, node)

    return _.reduce(nodes, (nodes, n) => {
      return {...nodes, [n.uuid]: n}
    }, _.omit(state, node))
  },
}


export default function reducer(state = defaultState, action) {
  const handler = HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
