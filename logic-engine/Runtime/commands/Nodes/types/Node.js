export default class Node {
  constructor (node, runtime) {
    this.uuid = node.uuid
    this.type = node.type
    this.pins = node.pins
    this.executable = node.executable
    this.node = node
    this.runtime = runtime
  }

  exec () {
    throw 'Exec method must be implemented'
  }
}
