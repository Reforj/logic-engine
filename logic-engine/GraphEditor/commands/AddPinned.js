import _ from 'lodash'

export const containsPin = (pinned, pin) => {
  if (!pinned || !pin) { return false }
  if (!_.isArray(pinned)) { return pinned.node === pin.node && pinned.socket === pin.socket }

  for (let i = 0; i < pinned.length; i++) {
    const p = pinned[i]
    if (p.node === pin.node && p.socket === pin.socket) { return true }
  }
  return false
}

export const buildPinnedPin = (nodePin, pin) => {
  if (containsPin(nodePin.pinned, pin)) { return nodePin }

  return { ...nodePin, pinned: nodePin.multiple ? [...(nodePin.pinned || []), pin] : pin }
}

export const addPinned = (pins, pinUuid, pinned) => pins.map((p) => (
  p.uuid === pinUuid ? buildPinnedPin(p, pinned) : p
))
