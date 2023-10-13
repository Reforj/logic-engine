/* eslint-disable react/destructuring-assignment */
import { useEffect } from 'react'
import { useDrag } from 'react-dnd'
import { getEmptyImage } from 'react-dnd-html5-backend'
import css from '../EditorDock.less'
import SocketInput from './sockets/SocketInput'
import SocketOutput from './sockets/SocketOutput'
import ExecInput from './sockets/ExecInput'
import ExecOutput from './sockets/ExecOutput'
import { newPin, PinSide } from '../../../registers/NodeTypes'
import { NodeType, NodesData } from '../../../consts/NodesData'

const NodeHOC = (Component) => function (props) {
  const { id, node, userNodesRegister } = props
  const nodeInfo = node.type === NodeType.UserNode ? userNodesRegister.nodeInfo[node.name] : NodesData[node.code]

  const [, drag, preview] = useDrag({
    item: {
      id, node, type: 'NODE', position: { x: node.p[0], y: node.p[1] },
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true })
  }, [])

  const click = (e) => {
    if (nodeInfo.canNotDelete) { return }
    if (e.altKey) {
      props.removeNode(node.uuid)
    }
  }

  const changeNode = (node) => {
    props.changeNode(node)
  }

  const addPin = (pin) => {
    const p = newPin({ side: PinSide.In, ...pin, extra: true })
    props.changeNode({ ...node, pins: [...node.pins, p] })
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

  const changePin = (pin) => {
    props.changePin(node, pin)
  }

  const change = ({ data, pins }) => {
    props.change(node, { data, pins })
  }

  const createPin = (args) => {
    const pin = newPin(args)
    props.changeNode({ ...node, pins: [...node.pins, pin] })
    return pin
  }

  const removePin = (pin) => {
    const pins = node.filter((p) => p.uuid !== pin.uuid)
    props.change(node, { pins })
  }

  const style = {
    left: node.p[0],
    top: node.p[1],
  }

  return (
    <div
      ref={drag}
      style={style}
      onDoubleClick={click}
      className={`${css.nodeWrapper}`}
      onContextMenu={(e) => e.stopPropagation()}
    >
      <Component
        {...props}
        nodeInfo={nodeInfo}
        inputPin={inputPin}
        outputPin={outputPin}
        addPin={addPin}
        changeNode={changeNode}
        disconnectPin={disconnectPin}
        disconnectAllPins={disconnectAllPins}
        changePin={changePin}
        createPin={createPin}
        change={change}
        removePin={removePin}
      />
    </div>
  )
}

export default NodeHOC
