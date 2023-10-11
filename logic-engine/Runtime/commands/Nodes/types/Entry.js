import Node from './Node'

export default class Entry extends Node {
  constructor (node) {
    super(node)
    this.next = this.getNext()
    this.executable = true
  }

  exec (context, args = []) {
    return {
      next: this.next.pinned ? { uuid: this.next.pinned.node } : null,
      outputs: this.getOutputs().map((pin, i) => args[i]),
    }
  }
}
