// remove node pinned by external pin [node-pins-pinned] -> [external_node: pin]
// _______________      _______________
// | >  node  [|>|      | >          >|
// |           o>| /----| o pin       |
// |            o|/-----| o pin       |
// |_____________|      |_____________|
//

export const RemovePinnedOfPin = (node, pin) => {
  if (!pin) { return node }
  const pins = node.pins.map((p) => {
    if (p.uuid !== pin.pinned.pin) { return p }
    const pinned = Array.isArray(p.pinned) ? p.pinned.filter((p) => p.pin !== pin.uuid) : null
    return { ...p, pinned: pinned && pinned.length ? pinned : null }
  })
  return { ...node, pins }
}
