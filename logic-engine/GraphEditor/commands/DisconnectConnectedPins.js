import _toArray from 'lodash/toArray'
import { RemovePinnedOfPin } from './RemovePinnedOfPin'

export const DisconnectConnectedPins = (nodes, pins) => {
  const nodesToUpdate = {}
  pins.map((pin) => {
    (Array.isArray(pin.pinned) ? pin.pinned : [pin.pinned]).map((pinned) => {
      const node = nodesToUpdate[pinned.node] || nodes[pinned.node]
      nodesToUpdate[pinned.node] = RemovePinnedOfPin(node, { ...pin, pinned })
    })
  })

  return _toArray(nodesToUpdate)
}
