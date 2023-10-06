import _ from 'lodash'
import Node from './Node'

export default class UserNode extends Node {
  constructor (node, runtime) {
    super(node, runtime)
    this.name = node.path
    this.inputs = _.filter(node.pins, (p) => !p.exec && p.side === 'In')
    this.outputs = _.filter(node.pins, (p) => !p.exec && p.side === 'Out')
  }

  exec (context, socketArgs = {}) {
    const args = _.map(this.inputs, (input) => socketArgs[input.uuid])
    const cb = this.runtime.getNodeHandler(this.node.name)
    if (!cb) { throw 'Missing handler for node: '+ this.node.name }

    const results = cb(this.node, ...args)
    const outputs = this.outputs.reduce((acc, pin, i) => ({...acc, [pin.uuid]: results[i]}), {})

    return  {
      outputs,
    }
  }
}
