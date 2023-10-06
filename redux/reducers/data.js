import _ from 'lodash'
import { INIT, RESET } from '../actions'

export const defaultState = {}

const HANDLERS = {
  [INIT]: (state, {userData}) => ({...state, ...userData}),
  [RESET]: () => defaultState
}

export default function reducer(state = defaultState, action) {
  const handler = HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
