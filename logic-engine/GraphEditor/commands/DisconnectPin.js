import _toArray from 'lodash/toArray'
import { RemovePinnedOfPin } from './RemovePinnedOfPin'

export const DisconnectPin = (node, pin, nodes) => {
  const nodesToUpdate = { [node.uuid]: node }
  const pinnedPins = Array.isArray(pin.pinned) ? pin.pinned : [pin.pinned]
  pinnedPins.map((pinned) => {
    if (!pinned) { return }
    const node = nodesToUpdate[pinned.node] || nodes[pinned.node]
    nodesToUpdate[pinned.node] = RemovePinnedOfPin(node, { ...pin, pinned })
  })
  pin.pinned = null

  return _toArray(nodesToUpdate)
}
