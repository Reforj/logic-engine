import _ from 'lodash'
import Node from './Node'

export default class Return extends Node {
  constructor (node) {
    super(node)
    this.executable = true
    this.inputs = _.filter(node.pins, p => !p.exec && p.side === 'In')
  }

  exec (context, args = []) {
    const outputs = _.map(this.inputs, (pin, i) => pin.pinned ? args[i] : pin.defaultValue)
    return  {
      return: true,
      outputs,
    }
  }
}
