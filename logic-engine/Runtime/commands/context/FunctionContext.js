export default class FunctionContext {
  constructor (contextData) {
    this.nodeResults = {}
    this.userData = contextData
  }

  getResult (uuid) {
    return this.nodeResults[uuid]
  }

  setResult (uuid, data) {
    this.nodeResults[uuid] = data
  }
}
