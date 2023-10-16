import { useRef, useEffect } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import cs from 'classnames'
import { getEmptyImage } from 'react-dnd-html5-backend'
import { DataType } from '../../../../interfaces/Pin'
import css from './Pin.less'

function DataInput ({
  node, pin, createLine, connect, title, changeNode,
}) {
  const ref = useRef(null)
  const circle = useRef(null)

  const [{ isOver }, drop] = useDrop({
    accept: 'OUTPUT_SOCKET',
    drop ({ node: target, pin: targetPin }) {
      if (pin.pinned && pin.pinned.pin === targetPin.uuid) { return } // prevent recconnect
      connect({ node, pin }, { node: target, pin: targetPin })
    },
    collect: (monitor) => ({
      isOver: monitor.canDrop() && monitor.isOver(),
    }),
  })

  const [, drag, preview] = useDrag({
    item: { type: 'INPUT_SOCKET', node, pin },
    begin () {
      const rect = circle.current.getBoundingClientRect()
      createLine(rect, false, 'call', pin.dataType)

      return {
        type: 'INPUT_SOCKET', node, pin, stype: 'destinationSocket',
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true })
  }, [])

  drag(drop(ref))

  const changeDefaultValue = (value) => {
    pin.defaultValue = value
    changeNode(node)
  }

  const onClick = (e) => {
    e.stopPropagation()
    if (e.altKey) {
      if (!pin.extra) { return }

      const pins = node.pins.filter((p) => p.uuid !== pin.uuid)
      changeNode({ ...node, pins })
    }
  }

  const defaultValue = () => {
    if (pin.dataType === undefined) { return }

    if (pin.dataType === DataType.Boolean) {
      return (
        <div className={css.defaultValue}>
          <input
            checked={pin.defaultValue}
            type="checkbox"
            onChange={(e) => changeDefaultValue(e.currentTarget.checked)}
          />
        </div>
      )
    }

    if (pin.dataType === DataType.Number) {
      return (
        <div className={css.defaultValue}>
          <input
            value={pin.defaultValue}
            type="number"
            className={css.numberInput}
            onChange={(e) => changeDefaultValue(parseInt(e.currentTarget.value, 10))}
          />
        </div>
      )
    }

    if (pin.dataType === DataType.String) {
      return (
        <div className={css.defaultValue}>
          <input
            value={pin.defaultValue}
            type="text"
            className={css.textInput}
            onChange={(e) => changeDefaultValue(e.currentTarget.value)}
          />
        </div>
      )
    }

    return null
  }

  const { pinned } = pin

  return (
    <div className={cs(css.socket, css[DataType[pin.dataType]])}>
      <div
        ref={ref}
        onClick={onClick}
        className={cs(css.handler, { [css.over]: isOver })}
        data-uuid={pin.uuid}
        data-shift="9, 8"
      >
        <div ref={circle} className={cs(css.circle, { [css.active]: pinned })}>
          <i className={css.arrow} />
        </div>
      </div>
      {!pinned && defaultValue()}
      <div>{title || pin.name}</div>
    </div>
  )
}

export default DataInput
