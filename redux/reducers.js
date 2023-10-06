import { combineReducers } from 'redux'
import nodes from './reducers/node'
import data from './reducers/data'

export default () => combineReducers({
  engine: combineReducers({
    nodes,
  }),
  data,
})
