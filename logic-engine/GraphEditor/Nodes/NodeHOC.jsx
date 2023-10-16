/* eslint-disable react/destructuring-assignment */
import { useEffect } from 'react'
import { useDrag } from 'react-dnd'
import { getEmptyImage } from 'react-dnd-html5-backend'
import css from '../EditorDock.less'
import DataInput from './sockets/DataInput'
import DataOutput from './sockets/DataOutput'
import FlowInput from './sockets/FlowInput'
import FlowOutput from './sockets/FlowOutput'
import { Pin } from '../../../registers/NodeTypes'
import { NodeType, NodesData } from '../../../consts/NodesData'
import { PinType } from '../../../interfaces/Pin'

const PIN_COMPONENTS = {
  [PinType.FlowInput]: FlowInput,
  [PinType.FlowOutput]: FlowOutput,
  [PinType.DataInput]: DataInput,
  [PinType.DataOutput]: DataOutput,
}

export const inputs = (pins) => (pins.filter((p) => p.type === PinType.DataInput || p.type === PinType.FlowInput))
export const outputs = (pins) => (pins.filter((p) => p.type === PinType.DataOutput || p.type === PinType.FlowOutput))

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
    const p = Pin({ type: PinType.DataInput, ...pin, extra: true })
    props.changeNode({ ...node, pins: [...node.pins, p] })
  }

  const renderPin = (pin) => {
    const Pin = PIN_COMPONENTS[pin.type]

    return <Pin key={pin.uuid} pin={pin} title={pin.title} {...props} changeNode={changeNode} />
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
    const pin = Pin(args)
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
        renderPin={renderPin}
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
