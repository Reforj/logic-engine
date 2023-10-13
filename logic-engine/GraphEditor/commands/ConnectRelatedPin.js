import _find from 'lodash/find'
import { ConnectPins } from './ConnectPins'
import { PinSide } from '../../../registers/NodeTypes'

export const ConnectRelatedPin = (funcNodes, newNode, source, socket) => {
  const nodesToUpdate = { [source.uuid]: source, [newNode.uuid]: newNode }
  const exec = {
    In: _find(newNode.pins, { side: PinSide.In, exec: true }),
    Out: _find(newNode.pins, { side: PinSide.Out, exec: true }),
  }
  const inputs = {
    In: _find(newNode.pins, (p) => !p.exec && p.side === PinSide.In),
    Out: _find(newNode.pins, (p) => !p.exec && p.side === PinSide.Out),
  }
  let nodes = null

  // connect related pins
  if (socket.side === PinSide.Out) {
    if (!socket.exec && inputs.In && !inputs.In.pinned) {
      nodes = ConnectPins(
        { ...funcNodes, ...nodesToUpdate },
        { node: source, pin: socket },
        { node: newNode, pin: inputs.In },
      )
      nodes && nodes.map((n) => nodesToUpdate[n.uuid] = n)
    }
    if (socket.exec && exec.In) {
      source = nodesToUpdate[source.uuid] || source
      newNode = nodesToUpdate[newNode.uuid] || newNode
      const pin = _find(source.pins, { exec: true, side: PinSide.Out })
      if (pin) {
        nodes = ConnectPins(
          { ...funcNodes, ...nodesToUpdate },
          { node: source, pin: socket.exec ? socket : pin },
          { node: newNode, pin: exec.In },
        )
        nodes && nodes.map((n) => nodesToUpdate[n.uuid] = n)
      }
    }
  } else {
    if (!socket.exec && inputs.Out && !inputs.Out.pinned) {
      nodes = ConnectPins(
        { ...funcNodes, ...nodesToUpdate },
        { node: source, pin: socket },
        { node: newNode, pin: inputs.Out },
      )
      nodes && nodes.map((n) => nodesToUpdate[n.uuid] = n)
    }
    if (socket.exec && exec.Out) {
      source = nodesToUpdate[source.uuid] || source
      newNode = nodesToUpdate[newNode.uuid] || newNode
      const pin = _find(source.pins, { exec: true, side: PinSide.In })
      if (pin) {
        nodes = ConnectPins(
          { ...funcNodes, ...nodesToUpdate },
          { node: source, pin: socket.exec ? socket : pin },
          { node: newNode, pin: exec.Out },
        )
        nodes && nodes.map((n) => nodesToUpdate[n.uuid] = n)
      }
    }
  }

  return nodes
}
