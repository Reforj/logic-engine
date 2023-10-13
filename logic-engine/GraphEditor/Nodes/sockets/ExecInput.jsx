import { useRef, useEffect } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import _find from 'lodash/find'
import { getEmptyImage } from 'react-dnd-html5-backend'
import css from './Sockets.less'
import arrow from '../../../../assets/arrow.png'
import arrowf from '../../../../assets/arrow_filled.png'

function ExecInput ({
  node, socket, createLine, connect,
}) {
  const ref = useRef(null)
  const icon = useRef(null)

  const [{ isOver }, drop] = useDrop({
    accept: 'EXEC_OUTPUT',
    drop ({ node: target, socket: pin }) {
      if (_find(socket.pinned, { socket: pin.uuid })) { return } // prevent recconnect same pin
      connect({ node, pin: socket }, { node: target, pin })
    },
    collect: (monitor) => ({
      isOver: monitor.canDrop() && monitor.isOver(),
    }),
  })

  const [, drag, preview] = useDrag({
    item: { type: 'EXEC_INPUT', node, socket },
    begin () {
      const rect = icon.current.getBoundingClientRect()
      createLine({ x: rect.x + 10, y: rect.y }, false, 'exec')
      return {
        type: 'EXEC_INPUT', node, socket, stype: 'execIn',
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
  const pinned = socket.multiple ? socket.pinned && socket.pinned.length : socket.pinned
  return (
    <div className={`${css.socket} ${css.input}`}>
      <div
        ref={ref}
        className={`${css.handler} ${css.exec} ${isOver ? css.over : ''}`}
        data-uuid={socket.uuid}
        data-shift="10, 10"
      >
        <img ref={icon} className={css.arrow} src={pinned ? arrowf : arrow} />
      </div>
      <div>{socket.name}</div>
    </div>

  )
}
export default ExecInput
