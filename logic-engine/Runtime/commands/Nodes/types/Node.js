import { NodesData } from '../../../../../consts/NodesData'
import { PinType } from '../../../../../interfaces/Pin'

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
    return this.pins.find((p) => p.type === PinType.FlowOutput)
  }

  getInputs () {
    return this.pins.filter((p) => p.type === PinType.DataInput)
  }

  getOutputs () {
    return this.pins.filter((p) => p.type === PinType.DataOutput)
  }

  exec () {
    throw new Error('Exec method must be implemented')
  }
}
