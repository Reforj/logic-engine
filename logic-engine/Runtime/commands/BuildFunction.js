import _ from 'lodash'
import FunctionContext from "./context/FunctionContext"
import NodeFactory from './Nodes/NodeFactory'
import {reduce, reduceUuid} from '../../../utils/reduce'

export const NodesToResolveArgs = (node, nodes,) => {
  if (!node.inputs || !node.inputs.length) { return {} }

  return _.map(node.inputs, (pin) => {
    return pin.pinned && nodes[pin.pinned.node]
  })
}

export const resolveNodeArgs = (node, context, nodes) => {
  if (!node.inputs || !node.inputs.length) { return {} }

  const nodesToResolve = NodesToResolveArgs(node, nodes)  // [{node: Node, socket: uuid}]

  const results = reduce(nodesToResolve, (obj, node) => {
    if (!node) { return obj }
    if (node.executable) {
      return {...obj, [node.uuid]: context.getResult(node.uuid)}
    }

    const args = resolveNodeArgs(node, context, nodes) // {[socketUuid]: val}
    return {...obj, [node.uuid]: node.exec(context, args).outputs}
  })  // { [nodeUuid]: {[socketUuid]: value} }

  return reduce(node.inputs, (obj, pin) => {
    if (!pin.pinned) { return obj }
    return { ...obj, [pin.uuid]: _.get(results, [pin.pinned.node, pin.pinned.socket]) }
  })
}

const BuildFunction = (func, runtime) => {
  const nodes = reduceUuid(func.nodes, (node) => {
    return NodeFactory(node, runtime)
  })

  const entry = _.find(nodes, {type: 'Entry'})

  let callCount = 0

  const resolveNodeArgs = (node, context) => {
    if (!node.inputs || !node.inputs.length) { return {} }

    callCount += 1
    if (callCount > 2500) { throw 'Infinity loop detected' }
    const nodesToResolve = NodesToResolveArgs(node, nodes)  // [{node: Node, socket: uuid}]
    const caller = node
    const results = reduce(nodesToResolve, (obj, node) => {
      if (!node) { return obj }
      if (node.executable) {
        return {...obj, [node.uuid]: context.getResult(node.uuid)}
      }

      const args = resolveNodeArgs(node, context) // {[socketUuid]: val}
      if (context.getCaller(node) === caller.uuid) {
        return {...obj, [node.uuid]: context.getResult(node.uuid)}
      } else {
        context.setCaller(node, caller)
        const result = node.exec(context, args, caller)
        context.setResult(node.uuid, result.outputs)
        return {...obj, [node.uuid]: result.outputs}
      }
    })  // { [nodeUuid]: {[socketUuid]: value} }

    return reduce(node.inputs, (obj, pin) => {
      if (!pin.pinned) { return obj }
      return { ...obj, [pin.uuid]: _.get(results, [pin.pinned.node, pin.pinned.socket]) }
    })
  }

  return (contextData, ...args) => {
    const context = new FunctionContext(contextData)
    let node = entry
    let result = node.exec(context, args)
    context.setResult(entry.uuid, result.outputs)

    while (result.next) {
      node = nodes[result.next.uuid]
      const args = resolveNodeArgs(node, context)
      result = node.exec(context, args)
      if (result.return) { return result.outputs }
      if (!result.next) { return [] }
      context.setResult(node.uuid, result.outputs)
    }

    return []
  }
}

export default BuildFunction
