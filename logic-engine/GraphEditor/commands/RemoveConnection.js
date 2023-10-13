import _find from 'lodash/find'
import { RemovePinnedOfPin } from './RemovePinnedOfPin'

export const RemoveConnection = (left, right) => {
  const pinnedRight = right.pin.multiple ? _find(right.pin.pinned, { socket: left.pin.uuid }) : right.pin.pinned
  const leftNode = RemovePinnedOfPin(left.node, { uuid: right.pin.uuid, pinned: pinnedRight })
  const pinnedLeft = left.pin.multiple ? _find(left.pin.pinned, { socket: right.pin.uuid }) : left.pin.pinned
  const rightNode = RemovePinnedOfPin(right.node, { uuid: left.pin.uuid, pinned: pinnedLeft })

  return [leftNode, rightNode]
}
