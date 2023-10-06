import _ from 'lodash'
import Node from './Node'

export default class Return extends Node {
  constructor (node, {outputs}) {
    super(node)
    this.executable = true
    this.inputs = _.filter(node.pins, p => !p.exec && p.side === 'In')
  }

  exec (context, args) {
    const outputs = _.map(this.inputs, (pin) => pin.pinned ? args[pin.uuid] : pin.defaultValue)
    return  {
      return: true,
      outputs,
    }
  }
}
