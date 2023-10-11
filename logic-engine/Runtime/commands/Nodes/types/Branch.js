import _ from 'lodash'
import Node from './Node'

export default class Branch extends Node {
  constructor (node) {
    super(node)
    this.inputs = _.filter(node.pins, (p) => !p.exec && p.side === 'In')

    this.next = _.find(node.pins, {exec: true, side: 'Out'})
    this.nextTrue = _.find(node.pins, { exec: true, name: 'True' })
    this.nextFalse = _.find(node.pins, { exec: true, name: 'False' })
  }

  exec (context, socketArgs = []) {
    const condition = this.inputs[0].pinned ? socketArgs[0] : this.inputs[0].defaultValue

    let next = condition ? this.nextTrue : this.nextFalse

    return  {
      next: next.pinned ? { uuid: next.pinned.node } : null,
      outputs: {}
    }
  }
}
