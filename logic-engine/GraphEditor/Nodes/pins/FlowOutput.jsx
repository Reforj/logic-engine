import { useRef, useEffect } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { getEmptyImage } from 'react-dnd-html5-backend'
import css from './Pin.less'
import arrow from '../../../../assets/arrow.png'
import arrowf from '../../../../assets/arrow_filled.png'

function FlowOutput ({
  node, pin, createLine, connect,
}) {
  const ref = useRef(null)
  const icon = useRef(null)

  const [{ isOver }, drop] = useDrop({
    accept: 'EXEC_INPUT',
    drop ({ node: targetNode, pin: targetPin }) {
      if (pin.pinned && pin.pinned.pin === targetPin.uuid) { return } // prevent recconnect
      connect({ node, pin }, { node: targetNode, pin: targetPin })
    },
    collect: (monitor) => ({
      isOver: monitor.canDrop() && monitor.isOver(),
    }),
  })

  const [, drag, preview] = useDrag({
    item: { type: 'EXEC_OUTPUT', node, pin },
    begin () {
      const rect = icon.current.getBoundingClientRect()
      createLine({ x: rect.x + 10, y: rect.y }, 1, 'exec')
      return {
        type: 'EXEC_OUTPUT', node, pin, stype: 'execOut',
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
  const { pinned } = pin
  return (
    <div className={`${css.pin} ${css.output}`}>
      <div>{pin.name}</div>
      <div
        ref={ref}
        className={`${css.handler} ${css.exec} ${css.right} ${isOver ? css.over : ''}`}
        data-uuid={pin.uuid}
        data-shift="10, 10"
      >
        <img ref={icon} className={css.arrow} src={pinned ? arrowf : arrow} />
      </div>
    </div>

  )
}
export default FlowOutput
