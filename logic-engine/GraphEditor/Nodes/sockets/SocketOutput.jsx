import React, {useRef} from 'react'
import css from './Sockets.less'
import { DragPreviewImage, useDrag, useDrop } from 'react-dnd'
import img from '../pixel'
import cs from 'classnames'
import _ from 'lodash'

const Node = ({ node, socket, createLine, connect, disconnect }) => {
  const ref = useRef(null)
  const circle = useRef(null)

  const [{isOver}, drop] = useDrop({
    accept: 'INPUT_SOCKET',
    hover(item, monitor) {
      return
    },
    drop ({node: target, socket: pin}) {
      if (_.find(socket.pinned, {socket: pin.uuid})) { return } // prevent recconnect same pin
      connect({node, pin: socket}, {node: target, pin})
    },
    collect: (monitor) => ({
      isOver: monitor.canDrop() && monitor.isOver(),
    }),
  })

  const [{ isDragging }, drag, preview] = useDrag({
    item: { type: 'OUTPUT_SOCKET', node, socket },
    begin (monitor) {
      const rect = circle.current.getBoundingClientRect()
      createLine(rect, true, 'call', socket.dataType)
      return { type: 'OUTPUT_SOCKET', node, socket, stype: "sourceSocket" }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  drag(drop(ref))
  const type = socket.type || 'Single'
  const pinned = socket.multiple ? socket.pinned && socket.pinned.length : socket.pinned
  return (
    <>
      <DragPreviewImage connect={preview} src={img} />
      <div className={cs(css.socket, css.output, {[css.deleted]: socket.deleted}, css[socket.dataType])}>
        <div className={css.socketName}>{socket.deleted ? 'Deleted' : socket.name}</div>
        <div ref={ref} className={`${css.handler} ${isOver ? css.over : ''}`} data-uuid={socket.uuid} data-shift="9, 8">
          {type === 'Single' && <div ref={circle} className={cs(css.circle, {[css.active]: pinned})}>
            <i className={css.arrow} />
          </div>}
          {type === 'Array' && <div ref={circle} className={cs(css.circle, css.array, {[css.active]: pinned})}>
            <i className={css.arrow} />
          </div>}
        </div>
      </div>
    </>

  )
}
export default Node
