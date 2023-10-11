import _ from 'lodash'
import Node from './Node'

export default class UserNode extends Node {
  constructor (node, runtime) {
    super(node, runtime)
    this.name = node.path
    this.inputs = _.filter(node.pins, (p) => !p.exec && p.side === 'In')
    this.outputs = _.filter(node.pins, (p) => !p.exec && p.side === 'Out')

    this.next = _.find(node.pins, (p) => p.exec && p.side === 'Out')
  }

  exec (context, socketArgs = []) {
    const args = _.map(this.inputs, (input, i) => (input.pinned ? socketArgs[i] : input.defaultValue))
    const cb = this.runtime.getNodeHandler(this.node.name)
    if (!cb) { throw new Error(`Missing handler for node: ${this.node.name}`) }

    const results = cb({ node: this.node, context: context.userData }, ...args)
    const outputs = this.getOutputs().map((pin, i) => results[i])

    return {
      outputs,
      next: this.next?.pinned ? { uuid: this.next.pinned.node } : null,
    }
  }
}
