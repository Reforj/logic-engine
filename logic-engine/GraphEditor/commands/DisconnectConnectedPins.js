import _ from 'lodash'
import { RemovePinnedOfPin } from './RemovePinnedOfPin'

export const DisconnectConnectedPins = (nodes, pins) => {
  const nodesToUpdate = {}
  pins.map((pin) => {
    (_.isArray(pin.pinned) ? pin.pinned : [pin.pinned]).map((pinned) => {
      const node = nodesToUpdate[pinned.node] || nodes[pinned.node]
      nodesToUpdate[pinned.node] = RemovePinnedOfPin(node, { ...pin, pinned })
    })
  })

  return _.toArray(nodesToUpdate)
}
