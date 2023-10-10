import _ from 'lodash'
import {RemovePinnedOfPin } from './RemovePinnedOfPin'

export const DisconnectAllPins = (node, nodes) => {
  const nodesToUpdate = {[node.uuid]: node}

  node.pins = node.pins.map(pin => {
    (_.isArray(pin.pinned) ? pin.pinned : [pin.pinned]).map(pinned => {
      if (!pinned) { return }
      const node = nodesToUpdate[pinned.node] || nodes[pinned.node]
      nodesToUpdate[pinned.node] = RemovePinnedOfPin(node, {...pin, pinned})
    })

    return {...pin, pinned: null}
  })

  return _.toArray(nodesToUpdate)
}
