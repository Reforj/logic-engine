import _find from 'lodash/find'
import { PinType } from '../../../interfaces/Pin'
import { ConnectPins } from './ConnectPins'

const isFlow = (pin) => pin.type === PinType.FlowOutput || pin.type === PinType.FlowInput
const isOutput = (pin) => pin.type === PinType.FlowOutput || pin.type === PinType.DataOutput

export const ConnectRelatedPin = (funcNodes, newNode, source, socket) => {
  const nodesToUpdate = { [source.uuid]: source, [newNode.uuid]: newNode }
  const exec = {
    In: _find(newNode.pins, { type: PinType.FlowInput }),
    Out: _find(newNode.pins, { type: PinType.FlowOutput }),
  }
  const inputs = {
    In: _find(newNode.pins, { type: PinType.DataInput }),
    Out: _find(newNode.pins, { type: PinType.DataOutput }),
  }
  let nodes = null

  // connect related pins
  if (isOutput(socket)) {
    if (socket.type !== PinType.FlowOutput && inputs.In) {
      nodes = ConnectPins(
        { ...funcNodes, ...nodesToUpdate },
        { node: source, pin: socket },
        { node: newNode, pin: inputs.In },
      )
      nodes && nodes.map((n) => nodesToUpdate[n.uuid] = n)
    }
    if (isFlow(socket) && exec.In) {
      source = nodesToUpdate[source.uuid] || source
      newNode = nodesToUpdate[newNode.uuid] || newNode
      const pin = _find(source.pins, { type: PinType.FlowOutput })
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
    if (!isFlow(socket) && inputs.Out) {
      nodes = ConnectPins(
        { ...funcNodes, ...nodesToUpdate },
        { node: source, pin: socket },
        { node: newNode, pin: inputs.Out },
      )
      nodes && nodes.map((n) => nodesToUpdate[n.uuid] = n)
    }
    if (isFlow(socket) && exec.Out) {
      source = nodesToUpdate[source.uuid] || source
      newNode = nodesToUpdate[newNode.uuid] || newNode
      const pin = _find(source.pins, { type: PinType.FlowInput })
      if (pin) {
        nodes = ConnectPins(
          { ...funcNodes, ...nodesToUpdate },
          { node: source, pin: socket },
          { node: newNode, pin: exec.Out },
        )
        nodes && nodes.map((n) => nodesToUpdate[n.uuid] = n)
      }
    }
  }

  return nodes
}
