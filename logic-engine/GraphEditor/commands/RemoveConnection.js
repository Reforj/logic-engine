import _find from 'lodash/find'
import { RemovePinnedOfPin } from './RemovePinnedOfPin'
import { isMultiple } from './AddPinned'

export const RemoveConnection = (left, right) => {
  const pinnedRight = isMultiple(right.pin) ? _find(right.pin.pinned, { pin: left.pin.uuid }) : right.pin.pinned
  const leftNode = RemovePinnedOfPin(left.node, { uuid: right.pin.uuid, pinned: pinnedRight })
  const pinnedLeft = isMultiple(left.pin) ? _find(left.pin.pinned, { pin: right.pin.uuid }) : left.pin.pinned
  const rightNode = RemovePinnedOfPin(right.node, { uuid: left.pin.uuid, pinned: pinnedLeft })

  return [leftNode, rightNode]
}
