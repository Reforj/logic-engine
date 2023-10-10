const MAX_CALL_STACK = 1000

export default class FunctionContext {
  constructor (contextData) {
    this.nodeResults = {}
    this.userData = contextData
    this.callers = {}
    this.callstack = []
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

  pushCall(node) {
    this.callstack.push(node)
    if (this.callstack.length > MAX_CALL_STACK) {
      throw `Maximum call stack size exceeded (${MAX_CALL_STACK} calls)`
    }
  }
}
