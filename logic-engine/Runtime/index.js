import BuildFunction from './commands/BuildFunction'

export default class Runtime {
  constructor () {
    this.userHandlers = {}
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
