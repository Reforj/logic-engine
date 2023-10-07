import { createStore as create, compose } from 'redux'
import rootReducers from '../redux/reducers'

let composeEnhancers = compose

// if (window.__DEV__) {
//   if (typeof window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ === 'function') {
//     composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ name: 'Logic Engine' })
//   }
// }

let store = create(
  rootReducers(),
  {},
  composeEnhancers(),
)

export default store
