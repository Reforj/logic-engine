import _ from 'lodash'
import Node from './Node'
import {reduceUuid} from '../../../../../utils/reduce'

export default class Entry extends Node {
  constructor (node, inputs = []) {
    super(node)
    this.next = _.find(this.pins, (p) => p.exec && p.side === 'Out' && p.pinned)
    this.inputs = _.filter(this.pins, (p) => !p.exec && p.side === 'Out')
    this.executable = true
  }

  exec (context, args = []) {
    const outputs = _.reduce(this.inputs, (res, pin, i) => ({...res, [pin.uuid]: args[i]}), {})

    return  {
      next: this.next ? { uuid: this.next.pinned.node } : null,
      outputs,
    }
  }
}
