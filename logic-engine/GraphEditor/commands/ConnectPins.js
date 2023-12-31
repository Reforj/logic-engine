import _toArray from 'lodash/toArray'
import { RemovePinnedOfPin } from './RemovePinnedOfPin'
import { addPinned, isMultiple } from './AddPinned'

const addConnection = (source, target) => {
  const pins = addPinned(source.node.pins, source.pin.uuid, { node: target.node.uuid, pin: target.pin.uuid })

  return { ...source.node, pins }
}

export const ConnectPins = (nodes, left, right) => {
  if (left.node.uuid === right.node.uuid) { return } // prevent connecting to self

  const nodesToUpdate = { [left.node.uuid]: left.node, [right.node.uuid]: right.node } // left and right nodes

  const removePinned = ({ pin }) => {
    // disconnect related not multipin pin
    if (pin.pinned && !isMultiple(pin)) {
      const node = nodesToUpdate[pin.pinned.node] || nodes[pin.pinned.node] // can be third node
      nodesToUpdate[node.uuid] = RemovePinnedOfPin(node, pin)
    }
  }

  const connectPins = ({ node, pin }, target) => {
    nodesToUpdate[node.uuid] = addConnection({ node: nodesToUpdate[node.uuid], pin }, target)
  }

  removePinned(left)
  removePinned(right)

  connectPins(left, right)
  connectPins(right, left)

  return _toArray(nodesToUpdate)
}
