import Node from './Node'

export default class Entry extends Node {
  exec (context, args = []) {
    return {
      next: this.next.pinned ? { uuid: this.next.pinned.node } : null,
      outputs: this.outputs.map((pin, i) => args[i]),
    }
  }
}
