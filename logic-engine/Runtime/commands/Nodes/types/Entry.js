import _ from 'lodash'
import Node from './Node'
import {reduceUuid} from '../../../../../utils/reduce'

export default class Entry extends Node {
  constructor (node, {inputs}) {
    super(node)
    this.next = _.find(this.pins, (p) => p.exec && p.side === 'Out' && p.pinned)
    this.executable = true
  }

  exec (context, args = []) {
    const outputs = reduceUuid(this.inputs, (pin, i) => (args[i]))

    return  {
      next: this.next ? { uuid: this.next.pinned.node } : null,
      outputs,
    }
  }
}
