import _ from 'lodash'
import {
  INIT, RESET, ADD_NODE, CHANGE_NODE, CHANGE_NODES, REMOVE_NODE,
} from '../actions'
import { setIn } from '../../utils/immutable'
import { RemoveNode } from '../../logic-engine/GraphEditor/commands/RemoveNode'

export const defaultState = {}

const HANDLERS = {
  [INIT]: (state, { nodes }) => ({ ...state, ...nodes }),
  [RESET]: () => defaultState,
  [ADD_NODE]: (state, { node }) => ({ ...state, [node.uuid]: node }),
  [CHANGE_NODE]: (state, { node }) => setIn(state, [node.uuid], node),
  [CHANGE_NODES]: (state, { nodes }) => _.reduce(nodes, (nodes, n) => ({ ...nodes, [n.uuid]: n }), state),
  [REMOVE_NODE]: (state, { node }) => {
    const nodes = RemoveNode(state, node)

    return _.reduce(nodes, (nodes, n) => ({ ...nodes, [n.uuid]: n }), _.omit(state, node))
  },
}

export default function reducer (state = defaultState, action = {}) {
  const handler = HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
