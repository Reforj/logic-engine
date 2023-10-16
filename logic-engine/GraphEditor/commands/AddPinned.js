import { PinType } from '../../../interfaces/Pin'

export const isMultiple = ({ type }) => type === PinType.FlowInput || type === PinType.DataOutput

export const containsPin = (pinned, pin) => {
  if (!pinned || !pin) { return false }
  if (!Array.isArray(pinned)) { return pinned.node === pin.node && pinned.pin === pin.pin }

  for (let i = 0; i < pinned.length; i++) {
    const p = pinned[i]
    if (p.node === pin.node && p.pin === pin.pin) { return true }
  }
  return false
}

export const buildPinnedPin = (nodePin, pin) => {
  if (containsPin(nodePin.pinned, pin)) { return nodePin }

  return { ...nodePin, pinned: isMultiple(nodePin) ? [...(nodePin.pinned || []), pin] : pin }
}

export const addPinned = (pins, pinUuid, pinned) => pins.map((p) => (
  p.uuid === pinUuid ? buildPinnedPin(p, pinned) : p
))
