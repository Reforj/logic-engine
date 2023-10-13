import _find from 'lodash/find'
import Node from './Node'

export default class Branch extends Node {
  constructor (node) {
    super(node)
    this.nextTrue = _find(node.pins, { exec: true, name: 'True' })
    this.nextFalse = _find(node.pins, { exec: true, name: 'False' })
  }

  exec (context, socketArgs = []) {
    const condition = this.inputs[0].pinned ? socketArgs[0] : this.inputs[0].defaultValue
    const next = condition ? this.nextTrue : this.nextFalse

    return {
      next: next.pinned ? { uuid: next.pinned.node } : null,
      outputs: [],
    }
  }
}
