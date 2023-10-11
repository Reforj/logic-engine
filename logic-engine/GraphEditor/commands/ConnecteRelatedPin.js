import _ from 'lodash'
import { ConnectPins } from './ConnectPins'

export const ConnectRelatedPin = (funcNodes, newNode, source, socket) => {
  const nodesToUpdate = { [source.uuid]: source, [newNode.uuid]: newNode }
  const exec = {
    In: _.find(newNode.pins, { side: 'In', exec: true }),
    Out: _.find(newNode.pins, { side: 'Out', exec: true }),
  }
  const inputs = {
    In: _.find(newNode.pins, (p) => p.side === 'In' && !p.exec),
    Out: _.find(newNode.pins, (p) => p.side === 'Out' && !p.exec),
  }
  let nodes = null

  // connect related pins
  if (socket.side === 'Out') {
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
      const pin = _.find(source.pins, { exec: true, side: 'Out' })
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
      const pin = _.find(source.pins, { exec: true, side: 'In' })
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
