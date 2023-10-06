import React, {useRef} from 'react'
import css from './Sockets.less'
import { DragPreviewImage, useDrag, useDrop } from 'react-dnd'
import img from '../pixel'
import arrow from '../../../../assets/arrow.png'
import arrowf from '../../../../assets/arrow_filled.png'

const ExecOutput = ({ node, socket, createLine, connect, disconnect }) => {
  const ref = useRef(null)
  const icon = useRef(null)

  const [{isOver}, drop] = useDrop({
    accept: 'EXEC_INPUT',
    hover(item, monitor) {
      return
    },
    drop ({node: target, socket: pin}) {
      if (socket.pinned && socket.pinned.socket === pin.uuid) { return } // prevent recconnect
      connect({node, pin: socket}, {node: target, pin})
    },
    collect: (monitor) => ({
      isOver: monitor.canDrop() && monitor.isOver(),
    }),
  })

  const [{ isDragging }, drag, preview] = useDrag({
    item: { type: 'EXEC_OUTPUT', node, socket },
    begin (monitor) {
      const rect = icon.current.getBoundingClientRect()
      createLine({x: rect.x + 10, y: rect.y}, 1, 'exec')
      return { type: 'EXEC_OUTPUT', node, socket, stype: 'execOut' }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  drag(drop(ref))
  const pinned = socket.multiple ? socket.pinned && socket.pinned.length : socket.pinned
  return (
    <>
      <DragPreviewImage connect={preview} src={img} />
      <div className={`${css.socket} ${css.output}`}>
        <div>{socket.name}</div>
        <div ref={ref} className={`${css.handler} ${css.exec} ${css.right} ${isOver ? css.over : ''}`} data-uuid={socket.uuid} data-shift="10, 10">
          <img ref={icon} className={css.arrow} src={pinned ? arrowf : arrow}/>
        </div>
      </div>
    </>

  )
}
export default ExecOutput
