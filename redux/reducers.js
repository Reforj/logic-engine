import { combineReducers } from 'redux'
import nodes from './reducers/node'
import { VERSION } from '../consts/Version'

export default () => combineReducers({
  engine: combineReducers({
    nodes,
    version: () => VERSION,
  }),
})
