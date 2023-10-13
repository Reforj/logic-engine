import { useRef, useEffect } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import cs from 'classnames'
import { getEmptyImage } from 'react-dnd-html5-backend'
import { DataType } from '../../../../interfaces/Pin'
import css from './Sockets.less'

function SocketInput ({
  node, socket, createLine, connect, title, changeNode,
}) {
  const ref = useRef(null)
  const circle = useRef(null)

  const [{ isOver }, drop] = useDrop({
    accept: 'OUTPUT_SOCKET',
    drop ({ node: target, socket: pin }) {
      if (socket.pinned && socket.pinned.socket === pin.uuid) { return } // prevent recconnect
      connect({ node, pin: socket }, { node: target, pin })
    },
    collect: (monitor) => ({
      isOver: monitor.canDrop() && monitor.isOver(),
    }),
  })

  const [, drag, preview] = useDrag({
    item: { type: 'INPUT_SOCKET', node, socket },
    begin () {
      const rect = circle.current.getBoundingClientRect()
      createLine(rect, false, 'call', socket.dataType)

      return {
        type: 'INPUT_SOCKET', node, socket, stype: 'destinationSocket',
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
    socket.defaultValue = value
    changeNode(node)
  }

  const onClick = (e) => {
    e.stopPropagation()
    if (e.altKey) {
      if (!socket.extra) { return }

      const pins = node.pins.filter((p) => p.uuid !== socket.uuid)
      changeNode({ ...node, pins })
    }
  }

  const defaultValue = () => {
    if (socket.dataType === undefined) { return }

    if (socket.dataType === DataType.Boolean) {
      return (
        <div className={css.defaultValue}>
          <input
            checked={socket.defaultValue}
            type="checkbox"
            onChange={(e) => changeDefaultValue(e.currentTarget.checked)}
          />
        </div>
      )
    }

    if (socket.dataType === DataType.Number) {
      return (
        <div className={css.defaultValue}>
          <input
            value={socket.defaultValue}
            type="number"
            className={css.numberInput}
            onChange={(e) => changeDefaultValue(parseInt(e.currentTarget.value, 10))}
          />
        </div>
      )
    }

    if (socket.dataType === DataType.String) {
      return (
        <div className={css.defaultValue}>
          <input
            value={socket.defaultValue}
            type="text"
            className={css.textInput}
            onChange={(e) => changeDefaultValue(e.currentTarget.value)}
          />
        </div>
      )
    }

    return null
  }

  const type = socket.type || 'Single'
  const pinned = socket.multiple ? socket.pinned && socket.pinned.length : socket.pinned

  return (
    <div className={cs(css.socket, css[DataType[socket.dataType]])}>
      <div
        ref={ref}
        onClick={onClick}
        className={cs(css.handler, { [css.over]: isOver })}
        data-uuid={socket.uuid}
        data-shift="9, 8"
      >
        {type === 'Single' && (
          <div ref={circle} className={cs(css.circle, { [css.active]: pinned })}>
            <i className={css.arrow} />
          </div>
        )}
        {type === 'Array' && (
          <div ref={circle} className={cs(css.circle, css.array, { [css.active]: pinned })}>
            <i className={css.arrow} />
          </div>
        )}
      </div>
      {!pinned && defaultValue()}
      <div>{title || socket.name}</div>
    </div>
  )
}

export default SocketInput
