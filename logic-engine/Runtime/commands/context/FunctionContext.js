export default class FunctionContext {
  constructor () {
    this.execResults = {}
  }

  getResult (uuid) {
    return this.execResults[uuid]
  }

  setResult (uuid, data) {
    this.execResults[uuid] = data
  }

}
