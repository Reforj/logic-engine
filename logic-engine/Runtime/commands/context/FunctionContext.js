export default class FunctionContext {
  constructor (contextData) {
    this.nodeResults = {}
    this.userData = contextData
    this.callers = {}
  }

  getResult (uuid) {
    return this.nodeResults[uuid]
  }

  setResult (uuid, data) {
    this.nodeResults[uuid] = data
  }

  setCaller (node, caller) {
    this.callers[node.uuid] = caller.uuid
  }

  getCaller(node) {
    return this.callers[node.uuid]
  }
}
