import { NodesData } from '../../../../../consts/NodesData'
import { PinSide } from '../../../../../interfaces/Pin'

export default class Node {
  constructor (node, runtime) {
    this.uuid = node.uuid
    this.code = node.code
    this.pins = node.pins
    this.node = node

    this.nodeInfo = NodesData[node.code]

    this.executable = this.nodeInfo ? this.nodeInfo.executable : node.executable
    this.runtime = runtime

    this.inputs = this.getInputs()
    this.outputs = this.getOutputs()

    if (this.executable) {
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
