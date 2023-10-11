import { PinSide } from '../../../../../registers/NodeTypes'

export default class Node {
  constructor (node, runtime) {
    this.uuid = node.uuid
    this.type = node.type
    this.pins = node.pins
    this.executable = node.executable
    this.node = node
    this.runtime = runtime

    this.inputs = this.getInputs()
    this.outputs = this.getOutputs()

    if (node.executable || !node.pure) {
      this.next = this.getNext()
    }
  }

  getNext () {
    return this.pins.find((p) => p.exec && p.side === PinSide.Out)
  }

  getInputs () {
    return this.pins.filter((p) => !p.exec && p.side === PinSide.In)
  }

  getOutputs () {
    return this.pins.filter((p) => !p.exec && p.side === PinSide.Out)
  }

  exec () {
    throw new Error('Exec method must be implemented')
  }
}
