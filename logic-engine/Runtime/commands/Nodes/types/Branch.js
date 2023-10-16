import _find from 'lodash/find'
import Node from './Node'
import { PinType } from '../../../../../interfaces/Pin'

export default class Branch extends Node {
  constructor (node) {
    super(node)
    this.nextTrue = _find(node.pins, { type: PinType.FlowOutput, name: 'True' })
    this.nextFalse = _find(node.pins, { type: PinType.FlowOutput, name: 'False' })
  }

  exec (context, args = []) {
    const condition = this.inputs[0].pinned ? args[0] : this.inputs[0].defaultValue
    const next = condition ? this.nextTrue : this.nextFalse

    return {
      next: next.pinned ? { uuid: next.pinned.node } : null,
      outputs: [],
    }
  }
}
