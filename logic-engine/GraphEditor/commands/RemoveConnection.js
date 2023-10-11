import _ from 'lodash'
import { RemovePinnedOfPin } from './RemovePinnedOfPin'

export const RemoveConnection = (left, right) => {
  const pinnedRight = right.pin.multiple ? _.find(right.pin.pinned, { socket: left.pin.uuid }) : right.pin.pinned
  const leftNode = RemovePinnedOfPin(left.node, { uuid: right.pin.uuid, pinned: pinnedRight })
  const pinnedLeft = left.pin.multiple ? _.find(left.pin.pinned, { socket: right.pin.uuid }) : left.pin.pinned
  const rightNode = RemovePinnedOfPin(right.node, { uuid: left.pin.uuid, pinned: pinnedLeft })

  return [leftNode, rightNode]
}
