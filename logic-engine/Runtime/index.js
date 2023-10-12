import BuildFunction from './commands/BuildFunction'
import { VERSION } from '../../consts/Version'

export default class Runtime {
  constructor () {
    this.userHandlers = {}
    this.version = VERSION
  }

  defineNodeHandler (name, func) {
    this.userHandlers[name] = func
  }

  getNodeHandler (name) {
    return this.userHandlers[name]
  }

  build ({ nodes }) {
    const func = BuildFunction({ nodes }, this)
    return func
  }
}
