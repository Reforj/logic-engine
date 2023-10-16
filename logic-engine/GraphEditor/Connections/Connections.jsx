/* eslint-disable max-len */
import cs from 'classnames'
import _map from 'lodash/map'
import css from './Connections.less'
import { PinType, DataType } from '../../../interfaces/Pin'

const Connection = ({
  node, pin, offset, onRemove, scrollTop, scrollLeft, zoom,
}) => {
  const path = (srcPin, destPin, index) => {
    const src = document.querySelector(`[data-uuid="${srcPin.uuid}"]`)
    const dest = document.querySelector(`[data-uuid="${destPin.pin}"]`)
    if (!src || !dest) { return null }

    const srcRect = src.getBoundingClientRect()
    const destRect = dest.getBoundingClientRect()

    const [x, y] = (src.dataset.shift || '9,9').split(',')
    const shift = { x: +x, y: +y }
    const srcZoomedX = (srcRect.x - offset.x + scrollLeft) / zoom + shift.x
    const srcZoomedY = (srcRect.y - offset.y + scrollTop) / zoom + shift.y
    const destZoomedX = (destRect.x - offset.x + scrollLeft) / zoom + shift.x
    const destZoomedY = (destRect.y - offset.y + scrollTop) / zoom + shift.y
    const b = { x: srcZoomedX, y: srcZoomedY }
    const e = { x: destZoomedX, y: destZoomedY }

    const dx = e.x - b.x
    const d = `M${b.x} ${b.y} C ${b.x + Math.abs(dx / 2)} ${b.y}, ${e.x - (dx > 0 ? Math.abs(dx / 2) : -dx / 2)} ${e.y}, ${e.x} ${e.y}`

    const click = (e) => {
      if (e.altKey) {
        onRemove(node, pin, index, destPin)
      }
    }

    return (
      <path
        key={destPin.pin}
        onClick={click}
        id="path"
        className={cs(css.line, css[pin.exec ? 'exec' : 'call'], css[DataType[pin.dataType]])}
        d={d}
        fill="none"
      />
    )
  }

  if (Array.isArray(pin.pinned)) {
    return pin.pinned.map((dest, index) => path(pin, dest, index))
  }
  return path(pin, pin.pinned)
}

function TempConnection ({
  temp: {
    begin: b, end: e, offset, right, type, dataType,
  },
}) {
  const ex = e.x + offset.x
  const ey = e.y + offset.y
  const dx = ex - b.x
  let d = `M${b.x} ${b.y} C ${b.x - Math.abs(dx / 2)} ${b.y}, ${ex + (dx < 0 ? Math.abs(dx / 2) : -dx / 2)} ${ey}, ${ex} ${ey}`
  if (right) {
    d = `M${b.x} ${b.y} C ${b.x + Math.abs(dx / 2)} ${b.y}, ${ex - (dx > 0 ? Math.abs(dx / 2) : -dx / 2)} ${ey}, ${ex} ${ey}`
  }
  return <path id="path" className={cs(css.tempLine, css[type], css[DataType[dataType]])} d={d} fill="none" />
}

export default function Connections ({
  nodes, offset, temp, removeConnection, scrollTop = 0, scrollLeft = 0, zoom,
}) {
  const connections = _map(nodes, (node) => ({
    node,
    pins: node.pins.filter((p) => (p.type === PinType.DataOutput || p.type === PinType.FlowOutput) && p.pinned),
  }))

  return (
    <svg style={{ width: '100%', height: '100%' }} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="smallGrid" width="16" height="16" patternUnits="userSpaceOnUse">
          <path d="M 16 0 L 0 0 0 16" fill="none" stroke="#343434" strokeWidth="1" />
        </pattern>
        <pattern id="grid" width="128" height="128" patternUnits="userSpaceOnUse">
          <rect width="128" height="128" fill="url(#smallGrid)" />
          <path d="M 128 0 L 0 0 0 128" fill="none" stroke="#000000" strokeWidth="1" />
        </pattern>
        <filter id="dropshadow" x="0" y="0" width="200" height="200">
          <feGaussianBlur stdDeviation="1" />
        </filter>
      </defs>

      <rect width="100%" height="100%" fill="#262626" />
      <rect width="100%" height="100%" fill="url(#grid)" />
      {offset && _map(connections, (c) => _map(c.pins, (p) => (
        <Connection
          node={c.node}
          key={p.uuid}
          pin={p}
          offset={offset}
          onRemove={removeConnection}
          scrollLeft={scrollLeft}
          scrollTop={scrollTop}
          zoom={zoom}
        />
      )))}
      {temp && <TempConnection temp={temp} />}
    </svg>
  )
}
