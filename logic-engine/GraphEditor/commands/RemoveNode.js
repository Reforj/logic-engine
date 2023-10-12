import _ from 'lodash'
import { DisconnectConnectedPins } from './DisconnectConnectedPins'

export const RemoveNode = (nodes, node) => {
  const removedNode = nodes[node]
  const pins = _.filter(removedNode.pins, (p) => p.pinned)

  return DisconnectConnectedPins(nodes, pins)
}
