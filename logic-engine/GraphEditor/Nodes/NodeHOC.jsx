/* eslint-disable react/destructuring-assignment */
import { DragPreviewImage, useDrag } from 'react-dnd'
import img from './pixel'
import css from '../EditorDock.less'
import SocketInput from './sockets/SocketInput'
import SocketOutput from './sockets/SocketOutput'
import ExecInput from './sockets/ExecInput'
import ExecOutput from './sockets/ExecOutput'
import { Pin, PinIn } from '../../../registers/NodeTypes'

const NodeHOC = (Component) => function (props) {
  const { id, node } = props

  const [, drag, preview] = useDrag({
    item: {
      id, node, type: 'NODE', position: { ...node.position },
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const click = (e) => {
    if (node.canNotDelete) { return }
    if (e.altKey) {
      props.removeNode(node.uuid)
    }
  }

  const changeNode = (node) => {
    props.changeNode(node)
  }

  const addPin = (pin) => {
    const newPin = PinIn({ ...pin, extra: true })
    props.changeNode({ ...node, pins: [...node.pins, newPin] })
  }

  const inputPin = (pin) => {
    const Pin = pin.exec ? ExecInput : SocketInput
    return <Pin key={pin.uuid} socket={pin} title={pin.title} {...props} changeNode={changeNode} />
  }

  const outputPin = (pin) => {
    const Pin = pin.exec ? ExecOutput : SocketOutput
    return <Pin key={pin.uuid} socket={pin} {...props} changeNode={changeNode} />
  }

  const disconnectPin = (pin) => {
    props.disconnectPin(node, pin)
  }

  const disconnectAllPins = () => {
    props.disconnectAllPins(node)
  }

  const changePins = (pins) => {
    props.changePins(node, pins)
  }

  const createPin = (args) => {
    const pin = Pin(args)
    props.changeNode({ ...node, pins: [...node.pins, pin] })
  }

  const changeData = (data) => {
    changeNode({ ...node, data })
  }

  const style = {
    left: node.position.x,
    top: node.position.y,
  }

  return (
    <>
      <DragPreviewImage connect={preview} src={img} />
      <div
        ref={drag}
        style={style}
        onDoubleClick={click}
        className={`${css.nodeWrapper}`}
        onContextMenu={(e) => e.stopPropagation()}
      >
        <Component
          {...props}
          inputPin={inputPin}
          outputPin={outputPin}
          addPin={addPin}
          changeNode={changeNode}
          disconnectPin={disconnectPin}
          disconnectAllPins={disconnectAllPins}
          changePins={changePins}
          createPin={createPin}
          changeData={changeData}
        />
      </div>
    </>
  )
}

export default NodeHOC
