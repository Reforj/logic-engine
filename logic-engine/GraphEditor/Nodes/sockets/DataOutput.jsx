import { useRef, useEffect } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { getEmptyImage } from 'react-dnd-html5-backend'
import cs from 'classnames'
import _find from 'lodash/find'
import css from './Pin.less'
import { DataType } from '../../../../interfaces/Pin'

function DataOutput ({
  node, pin, createLine, connect,
}) {
  const ref = useRef(null)
  const circle = useRef(null)

  const [{ isOver }, drop] = useDrop({
    accept: 'INPUT_SOCKET',
    drop ({ node: targetNode, pin: targetPin }) {
      if (_find(pin.pinned, { pin: targetPin.uuid })) { return } // prevent recconnect same pin
      connect({ node, pin }, { node: targetNode, pin: targetPin })
    },
    collect: (monitor) => ({
      isOver: monitor.canDrop() && monitor.isOver(),
    }),
  })

  const [, drag, preview] = useDrag({
    item: { type: 'OUTPUT_SOCKET', node, pin },
    begin () {
      const rect = circle.current.getBoundingClientRect()
      createLine(rect, true, 'call', pin.dataType)
      return {
        type: 'OUTPUT_SOCKET', node, pin, stype: 'sourceSocket',
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

  const pinned = pin.pinned && pin.pinned.length
  return (
    <div className={cs(css.socket, css.output, { [css.deleted]: pin.deleted }, css[DataType[pin.dataType]])}>
      <div className={css.socketName}>{pin.deleted ? 'Deleted' : pin.name}</div>
      <div ref={ref} className={`${css.handler} ${isOver ? css.over : ''}`} data-uuid={pin.uuid} data-shift="9, 8">
        <div ref={circle} className={cs(css.circle, { [css.active]: pinned })}>
          <i className={css.arrow} />
        </div>
      </div>
    </div>

  )
}
export default DataOutput
