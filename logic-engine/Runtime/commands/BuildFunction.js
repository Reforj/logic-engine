import _find from 'lodash/find'
import _get from 'lodash/get'
import { NodeCode } from '../../../consts/NodesData'
import FunctionContext from './context/FunctionContext'
import NodeFactory from './Nodes/NodeFactory'
import { reduce, reduceUuid } from '../../../utils/reduce'

export const NodesToResolveArgs = (node, nodes) => {
  if (!node.inputs || !node.inputs.length) { return [] }
  const result = []
  node.inputs.forEach((pin) => {
    if (pin.pinned && !result.includes(nodes[pin.pinned.node])) {
      result.push(nodes[pin.pinned.node])
    }
  })
  return result
}

export const resolveNodeArgs = (node, context, nodes) => {
  if (!node.inputs || !node.inputs.length) { return {} }

  context.pushCall(node)
  const nodesToResolve = NodesToResolveArgs(node, nodes) // [{node: Node, socket: uuid}]
  const caller = node

  const results = reduce(nodesToResolve, (obj, node) => {
    if (!node) { return obj }
    if (node.executable) {
      return { ...obj, [node.uuid]: context.getResult(node.uuid) }
    }

    const args = resolveNodeArgs(node, context, nodes) // {[socketUuid]: val}

    if (context.getCaller(node) === caller.uuid) {
      return { ...obj, [node.uuid]: context.getResult(node.uuid) }
    }
    context.setCaller(node, caller)
    const result = node.exec(context, args, caller)
    const combinedOutput = context.setResult(node, result.outputs)
    return { ...obj, [node.uuid]: combinedOutput }
  }) // { [nodeUuid]: {[socketUuid]: value} }

  return node.inputs.map((pin) => {
    if (!pin.pinned) { return }
    return _get(results, [pin.pinned.node, pin.pinned.socket])
  })
}

const BuildFunction = (func, runtime) => {
  const nodes = reduceUuid(func.nodes, (node) => NodeFactory(node, runtime))

  const entry = _find(nodes, { code: NodeCode.ENTRY })

  return (contextData, ...args) => {
    const context = new FunctionContext(contextData)
    let node = entry
    let result = node.exec(context, args)
    context.setResult(entry, result.outputs)

    while (result.next) {
      node = nodes[result.next.uuid]
      const args = resolveNodeArgs(node, context, nodes)
      result = node.exec(context, args)
      if (result.return) { return result.outputs }
      if (!result.next) { return [] }
      context.setResult(node, result.outputs)
    }

    return []
  }
}

export default BuildFunction
