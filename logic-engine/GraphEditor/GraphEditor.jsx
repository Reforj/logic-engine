import { useState, useRef, useEffect } from 'react'
import { useDrop } from 'react-dnd'
import _map from 'lodash/map'
import _find from 'lodash/find'
import _throttle from 'lodash/throttle'
import css from './EditorDock.less'
import './Nodes'
import ContextMenu from './ContextMenu'
import Connections from './Connections'
import { ConnectPins } from './commands/ConnectPins'
import { DisconnectAllPins } from './commands/DisconnectAllPins'
import { RemoveConnection } from './commands/RemoveConnection'
import NodeRegister from '../../registers/NodeRegister'
import { SIZE } from '../../consts/Editor'
import { ConnectRelatedPin } from './commands/ConnectRelatedPin'
import { DisconnectPin } from './commands/DisconnectPin'
import { DisconnectConnectedPins } from './commands/DisconnectConnectedPins'
import { NodesData } from '../../consts/NodesData'

const SOCKET_TYPES = ['OUTPUT_SOCKET', 'INPUT_SOCKET', 'EXEC_OUTPUT', 'EXEC_INPUT']
const isSocket = (type) => SOCKET_TYPES.includes(type)

export default function GraphEditor ({
  funcNodes, engine, addConnection, addNode, removeNode,
  nodeList, changeNode, changeNodes, onClick, userNodesRegister,
}) {
  const [context, setContext] = useState(false)
  const [temp, setTemp] = useState(false)
  const [svgUpdate, setSvgUpdate] = useState(null)
  const [zoom, setZoom] = useState(1)
  const camera = useRef()
  const ref = useRef()

  const update = _throttle(() => {
    setSvgUpdate(new Date())
  }, 16, { leading: false })

  let svgOffset = { x: 244, y: 66 }
  if (ref.current) {
    svgOffset = ref.current.getBoundingClientRect()
  }

  useEffect(() => {
    ref.current.scrollLeft = ((camera.current.clientWidth * zoom) / 2 - (ref.current.clientWidth / 2))
    ref.current.scrollTop = ((camera.current.clientHeight * zoom) / 2 - (ref.current.clientHeight / 2))
    setTimeout(() => {
      setSvgUpdate(new Date())
      focusNodes()
    }, 0)
    setTimeout(() => {
      svgOffset = ref.current.getBoundingClientRect()
      setSvgUpdate(new Date())
    }, 500)

    return () => {}
  }, [])

  useEffect(() => {
    window.addEventListener('blur', stopMoving)
    window.addEventListener('contextmenu', stopMoving)
    window.addEventListener('keypress', onKeyPress)
    document.body.addEventListener('wheel', preventZoom, { passive: false })
    ref.current.addEventListener('wheel', wheel, { passive: false })
    return () => {
      window.removeEventListener('blur', stopMoving)
      window.removeEventListener('contextmenu', stopMoving)
      window.removeEventListener('keypress', onKeyPress)
      document.body.removeEventListener('wheel', preventZoom)
      ref.current && ref.current.removeEventListener('wheel', wheel)
    }
  })

  const preventZoom = (e) => {
    if (e.ctrlKey) {
      e.preventDefault()
    }
  }

  const updateZoom = (val) => {
    // eslint-disable-next-line no-nested-ternary
    const v = val < 0.3 ? 0.3 : (val > 2 ? 2 : val)
    ref.current.scrollLeft += (ref.current.scrollLeft * ((v - zoom) / zoom))
    ref.current.scrollTop += (ref.current.scrollTop * ((v - zoom) / zoom))
    setZoom(v)
    setTimeout(() => setSvgUpdate(new Date()), 0) // no clue why it does not rerender
  }

  const onShowContext = (e) => {
    e.preventDefault()
    showContext(e.clientX, e.clientY)
  }

  const showContext = (x, y, opts) => {
    const left = x + ref.current.scrollLeft - svgOffset.x
    const top = y + ref.current.scrollTop - svgOffset.y
    const nodePos = {
      x: ((x + ref.current.scrollLeft - svgOffset.x) / zoom),
      y: ((y + ref.current.scrollTop - svgOffset.y) / zoom),
    }
    setContext({
      left, top, nodePos, ...opts,
    })
  }

  let offset = null
  const [, drop] = useDrop({
    accept: ['NODE', 'OUTPUT_SOCKET', 'INPUT_SOCKET', 'EXEC_INPUT', 'EXEC_OUTPUT'],
    hover ({ node, type, position }, monitor) {
      const delta = monitor.getDifferenceFromInitialOffset()
      if (type === 'NODE' && offset) {
        moveBox(node, position.x + (delta.x / zoom), position.y + (delta.y / zoom))
        update()
      }

      if (temp && offset) {
        setTemp({ ...temp, offset: { x: delta.x / zoom, y: delta.y / zoom } })
      }
      offset = delta
    },
    drop ({
      node: n, type, position, pin,
    }, monitor) {
      if (isSocket(type)) {
        if (monitor.getClientOffset()) {
          const { x, y } = monitor.getClientOffset()
          showContext(x, y, { temp, node: n, pin })
        }
        setTemp(null)
        offset = null
        return
      }
      if (type !== 'NODE') {
        const { x, y } = monitor.getClientOffset()
        setContext({ left: x - svgOffset.x, top: y - svgOffset.y })
        offset = null
        return
      }
      const delta = monitor.getDifferenceFromInitialOffset()
      if (delta) {
        moveBox(n, position.x + (delta.x / zoom), position.y + (delta.y / zoom), true)
      }
      offset = null
    },
  })

  const connect = (left, right) => {
    const nodes = ConnectPins(funcNodes, left, right)
    if (nodes) {
      changeNodes(nodes)
    }
  }

  const disconnectPin = (node, pin) => {
    const nodes = DisconnectPin(node, pin, funcNodes)
    if (nodes) { changeNodes(nodes) }
  }

  const disconnectAllPins = (node) => {
    const nodes = DisconnectAllPins(node, funcNodes)
    if (nodes) { changeNodes(nodes) }
  }

  const onRemoveConnection = (node, pin, index, dest) => {
    const destNode = funcNodes[dest.node]
    const destPin = _find(
      destNode.pins,
      { uuid: Array.isArray(pin.pinned) ? pin.pinned[index].pin : pin.pinned.pin },
    )
    const nodes = RemoveConnection({ node, pin }, { node: destNode, pin: destPin })

    changeNodes(nodes)
  }

  const changePin = (node, pin) => {
    const pins = node.pins.map((p) => (p.uuid === pin.uuid ? pin : p))
    changeNode({ ...node, pins })
  }

  const change = (node, { data, pins }) => {
    const nodes = changePins(node, pins || node.pins)

    changeNodes([...nodes, { ...node, pins: pins || node.pins, data: data || node.data }])
  }

  const changePins = (node, pins) => {
    const pinsToDisconnect = node.pins.filter((p) => p.pinned && !_find(pins, { uuid: p.uuid }))
    return DisconnectConnectedPins(funcNodes, pinsToDisconnect)
  }

  const onAddNode = (newNode, source, pin) => {
    addNode(newNode)

    if (!pin) { return }
    const nodes = ConnectRelatedPin(funcNodes, newNode, source, pin)

    if (nodes) {
      changeNodes(nodes)
      setTimeout(() => setSvgUpdate(new Date()), 0) // no clue why it does not rerender
    }
  }

  const moveBox = (node, left, top, save) => {
    node.p = [Math.round(left), Math.round(top)]

    if (save) {
      changeNode({ ...node })
    }
  }

  const createLine = (position, right, type, dataType) => {
    const x = (position.x - svgOffset.x + (ref.current.scrollLeft)) / zoom
    const y = (position.y - svgOffset.y + 4 + (ref.current.scrollTop)) / zoom
    setTemp({
      begin: { x, y }, end: { x, y }, right, offset: { x: 0, y: 0 }, type, dataType,
    })
    offset = null
  }

  const renderNode = (node) => {
    const Node = NodeRegister.getView(node.type || NodesData[node.code].type)

    if (!Node) { throw new Error(`Missing node component in '/Nodes/types/${node.code}`) }

    return (
      <Node
        id={node.uuid}
        key={node.uuid}
        node={node}
        engine={engine}
        userNodesRegister={userNodesRegister}
        createLine={createLine}
        connect={connect}
        removeNode={removeNode}
        changeNode={changeNode}
        disconnectPin={disconnectPin}
        disconnectAllPins={disconnectAllPins}
        changePin={changePin}
        change={change}
      />
    )
  }

  const handleClick = () => {
    setContext(false)
    onClick && onClick()
  }

  const stopMoving = () => {

  }

  const wheel = (e) => {
    e.preventDefault()
    e.stopPropagation()

    if (e.deltaY !== 0 && e.deltaY % 1 !== 0) {
      updateZoom(zoom + (e.deltaY / -100))
      return
    }
    if (e.ctrlKey) {
      updateZoom(zoom + (e.deltaY / -1000))
    } else if (e.deltaX) {
      const dx = e.deltaX / 2
      ref.current.scrollLeft += dx

      const dy = e.deltaY / 2
      ref.current.scrollTop += dy
    } else if (e.shiftKey) {
      const dx = e.deltaY / 2
      ref.current.scrollLeft += dx
    } else {
      const dy = e.deltaY / 2
      ref.current.scrollTop += dy
    }
  }

  const focusNodes = () => {
    const positions = _map(funcNodes, (n) => n.p)
    if (!positions.length) { return }
    const pos = { x: Math.min(...positions.map((p) => p[0])), y: Math.min(...positions.map((p) => p[1])) }
    ref.current.scrollLeft = pos.x * zoom - 100
    ref.current.scrollTop = pos.y * zoom - 100
  }

  const onKeyPress = (e) => {
    if (e.target !== document.body) { return }

    if (e.code === 'Space') {
      e.preventDefault()
    }
    if (e.code === 'KeyF') {
      focusNodes()
    }
  }

  return (
    <div className={css.editorWrapper}>
      <div
        ref={drop(ref)}
        onMouseDown={(e) => handleClick(e)}
        className={css.editor}
        onContextMenu={(e) => onShowContext(e)}
      >
        <div
          ref={camera}
          className={css.camera}
          style={{ width: SIZE.width, height: SIZE.height, transform: `scale(${zoom})` }}
        >
          <Connections
            zoom={zoom}
            offset={svgOffset}
            nodes={funcNodes}
            temp={temp}
            addConnection={addConnection}
            scrollTop={ref.current && ref.current.scrollTop}
            scrollLeft={ref.current && ref.current.scrollLeft}
            removeConnection={onRemoveConnection}
            update={svgUpdate}
          />
          <div>
            {_map(funcNodes, renderNode)}
          </div>
        </div>

        {context && (
        <ContextMenu
          left={context.left}
          top={context.top}
          nodeList={nodeList}
          node={context.node}
          nodePos={context.nodePos}
          pin={context.pin}
          connection={context.temp}
          close={() => setContext(false)}
          addNode={onAddNode}
          connect={connect}
        />
        )}
        <div id="overlayContainer" />
      </div>
      <div className={css.zoomControls}>
        <div onClick={() => focusNodes()} className={css.label}>[ ]</div>
        <div onClick={() => updateZoom(zoom - 0.1)} className={css.btn}>-</div>
        <div onClick={() => updateZoom(1)} className={css.label}>
          Zoom:
          {Math.round(zoom * 10 - 10)}
        </div>
        <div onClick={() => updateZoom(zoom + 0.1)} className={css.btn}>+</div>
      </div>
    </div>
  )
}
