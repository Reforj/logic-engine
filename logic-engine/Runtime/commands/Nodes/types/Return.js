import Node from './Node'

export default class Return extends Node {
  constructor (node) {
    super(node)
    this.executable = true
  }

  exec (context, args = []) {
    const outputs = this.inputs.map((pin, i) => (pin.pinned ? args[i] : pin.defaultValue))
    return {
      return: true,
      outputs,
    }
  }
}
