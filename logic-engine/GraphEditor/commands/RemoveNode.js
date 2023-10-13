import { DisconnectConnectedPins } from './DisconnectConnectedPins'

export const RemoveNode = (nodes, node) => {
  const removedNode = nodes[node]
  const pins = removedNode.pins.filter((p) => p.pinned)

  return DisconnectConnectedPins(nodes, pins)
}
