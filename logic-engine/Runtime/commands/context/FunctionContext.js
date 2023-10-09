export default class FunctionContext {
  constructor (contextData) {
    this.execResults = {}
    this.userData = contextData
  }

  getResult (uuid) {
    return this.execResults[uuid]
  }

  setResult (uuid, data) {
    this.execResults[uuid] = data
  }
}
