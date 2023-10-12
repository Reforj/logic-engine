import _ from 'lodash'
import Node from './Node'

export default class UserNode extends Node {
  constructor (node, runtime) {
    super(node, runtime)
    this.name = node.path
  }

  exec (context, socketArgs = []) {
    const args = _.map(this.inputs, (input, i) => (input.pinned ? socketArgs[i] : input.defaultValue))
    const cb = this.runtime.getNodeHandler(this.node.name)
    if (!cb) { throw new Error(`Missing handler for node: ${this.node.name}`) }

    const results = cb({ node: this.node, context: context.userData }, ...args)
    const outputs = this.outputs.map((pin, i) => results[i])

    return {
      next: this.next?.pinned ? { uuid: this.next.pinned.node } : null,
      outputs,
    }
  }
}
