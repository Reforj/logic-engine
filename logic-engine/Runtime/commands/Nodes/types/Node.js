export default class Node {
  constructor (node, runtime) {
    this.uuid = node.uuid
    this.type = node.type
    this.pins = node.pins
    this.executable = node.executable
    this.node = node
    this.runtime = runtime
  }

  getNext() {
    return this.pins.find(p => p.exec && p.side === 'Out')
  }

  getInputs () {
    return this.pins.filter(p => !p.exec && p.side === 'In')
  }

  getOutputs () {
    return this.pins.filter(p => !p.exec && p.side === 'Out')
  }

  exec () {
    throw 'Exec method must be implemented'
  }
}
