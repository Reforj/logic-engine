import Node from './Node'
import Library from '../../../registers/LibraryRegister'

export default class CallLibrary extends Node {
  constructor (node) {
    super(node)
    this.opcode = this.nodeInfo.opcode
    this.func = Library.get(this.opcode)

    if (!this.func) { throw new Error(`LibraryRegister: undefined function: ${this.opcode}`) }
  }

  exec (context, inputArgs = []) {
    const args = this.inputs.map((input, i) => (input.pinned ? inputArgs[i] : input.defaultValue))
    const result = this.func(...args)

    return {
      next: this.next?.pinned ? { uuid: this.next.pinned.node } : null,
      outputs: [result],
    }
  }
}
