import { useRef, useEffect } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { getEmptyImage } from 'react-dnd-html5-backend'
import css from './Sockets.less'
import arrow from '../../../../assets/arrow.png'
import arrowf from '../../../../assets/arrow_filled.png'

function ExecOutput ({
  node, socket, createLine, connect,
}) {
  const ref = useRef(null)
  const icon = useRef(null)

  const [{ isOver }, drop] = useDrop({
    accept: 'EXEC_INPUT',
    drop ({ node: target, socket: pin }) {
      if (socket.pinned && socket.pinned.socket === pin.uuid) { return } // prevent recconnect
      connect({ node, pin: socket }, { node: target, pin })
    },
    collect: (monitor) => ({
      isOver: monitor.canDrop() && monitor.isOver(),
    }),
  })

  const [, drag, preview] = useDrag({
    item: { type: 'EXEC_OUTPUT', node, socket },
    begin () {
      const rect = icon.current.getBoundingClientRect()
      createLine({ x: rect.x + 10, y: rect.y }, 1, 'exec')
      return {
        type: 'EXEC_OUTPUT', node, socket, stype: 'execOut',
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
    <div className={`${css.socket} ${css.output}`}>
      <div>{socket.name}</div>
      <div
        ref={ref}
        className={`${css.handler} ${css.exec} ${css.right} ${isOver ? css.over : ''}`}
        data-uuid={socket.uuid}
        data-shift="10, 10"
      >
        <img ref={icon} className={css.arrow} src={pinned ? arrowf : arrow} />
      </div>
    </div>

  )
}
export default ExecOutput
