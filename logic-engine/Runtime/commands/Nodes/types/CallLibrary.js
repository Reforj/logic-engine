import _ from 'lodash'
import Node from './Node'
import Library from '../../../registers/LibraryRegister'

export default class CallLibrary extends Node {
  constructor (node) {
    super(node)
    this.name = node.path
  }

  exec (context, socketArgs = []) {
    const args = _.map(this.inputs, (input, i) => (input.pinned ? socketArgs[i] : input.defaultValue))
    const result = Library.call(this.name, args)

    return {
      next: this.next?.pinned ? { uuid: this.next.pinned.node } : null,
      outputs: [result],
    }
  }
}
