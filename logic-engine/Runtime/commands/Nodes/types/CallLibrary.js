import Node from './Node'
import Library from '../../../registers/LibraryRegister'

export default class CallLibrary extends Node {
  constructor (node) {
    super(node)
    this.name = node.path
    this.func = Library.get(this.name)

    if (!this.func) { throw new Error(`LibraryRegister: undefined function: ${this.name}`) }
  }

  exec (context, socketArgs = []) {
    const args = this.inputs.map((input, i) => (input.pinned ? socketArgs[i] : input.defaultValue))
    const result = this.func(...args)

    return {
      next: this.next?.pinned ? { uuid: this.next.pinned.node } : null,
      outputs: [result],
    }
  }
}
