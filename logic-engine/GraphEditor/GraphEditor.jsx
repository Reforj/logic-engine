import React, { useState, useRef, useEffect } from 'react'
import cs from 'classnames'
import css from './EditorDock.less'
import { useDrop } from 'react-dnd'
import './Nodes'
import ContextMenu from './ContextMenu'
import Connections from './Connections'
import { ConnectPins } from './commands/ConnectPins'
import { DisconnectConnectedPins } from './commands/DisconnectConnectedPins'
import { RemoveConnection } from './commands/RemoveConnection'
import _ from 'lodash'
import NodeRegister from '../../registers/NodeRegister'
import { SIZE } from '../../consts/Editor'
const SOCKET_TYPES = ['OUTPUT_SOCKET', 'INPUT_SOCKET', 'EXEC_OUTPUT', 'EXEC_INPUT']
const isSocket = (type) => SOCKET_TYPES.includes(type)

export default function GraphEditor({
  funcNodes, engine, addConnection, addNode, removeNode, ui,
  nodeList, changeNode, changeNodes, onClick, userNodesRegister
}) {
  const [context, setContext] = useState(false)
  const [temp, setTemp] = useState(false)
  const [svgUpdate, setSvgUpdate] = useState(null)
  const [zoom, setZoom] = useState(1)
  const camera = useRef()
  const ref = useRef()

  let svgOffset = {x: 244, y: 66}
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
    ref.current.addEventListener('wheel', wheel,  { passive: false })
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
    const v = val < 0.3 ? 0.3 : (val > 2 ? 2 : val)
    ref.current.scrollLeft += (ref.current.scrollLeft * ((v - zoom) / zoom))
    ref.current.scrollTop += (ref.current.scrollTop * ((v - zoom) / zoom))
    setZoom(v)
    setTimeout(() => setSvgUpdate(new Date()), 0) // no clue why it does not rerender
  }

  const onShowContext = (e) => {
    e.preventDefault()
    showContext( e.clientX , e.clientY)
  }

  const showContext = (x, y, opts) => {
    const left = x + ref.current.scrollLeft - svgOffset.x
    const top = y + ref.current.scrollTop - svgOffset.y
    const nodePos = {
      x: ((x + ref.current.scrollLeft - svgOffset.x) / zoom),
      y: ((y + ref.current.scrollTop - svgOffset.y) / zoom),
    }
    setContext({left, top, nodePos, ...opts})
  }

  let offset = null
  const [, drop] = useDrop({
    accept: ["NODE", 'OUTPUT_SOCKET', 'INPUT_SOCKET', 'EXEC_INPUT', 'EXEC_OUTPUT'],

    hover({node, type, position}, monitor) {
      const delta = monitor.getDifferenceFromInitialOffset()
      if (type === "NODE" && offset) {
        moveBox(node, position.x + (delta.x / zoom), position.y + (delta.y / zoom))
        setSvgUpdate(new Date())
      }

      if (temp && offset) {
        setTemp({...temp, offset: {x: delta.x / zoom, y: delta.y / zoom}})
      }
      offset = delta
    },
    drop({node: n, type, position, socket}, monitor) {
      if (isSocket(type)) {
        if (monitor.getClientOffset()) {
          const {x, y} = monitor.getClientOffset()
          showContext(x, y, {temp, node: n, socket})
        }
        setTemp(null)
        offset = null
        return
      }
      if (type !== 'NODE') {
        const {x, y} = monitor.getClientOffset()
        setContext({left: x - svgOffset.x, top: y - svgOffset.y})
        offset = null
        return
      }
      const delta = monitor.getDifferenceFromInitialOffset()
      if (delta) {
        moveBox(n, position.x + (delta.x / zoom), position.y + (delta.y / zoom))
      }
      offset = null
      return
    },
  })

  const connect = (left, right) => {
    const nodes = ConnectPins(funcNodes, left, right)
    if (nodes) {
      changeNodes(nodes, ui)
    }
  }

  // disconnect all related pins to node or pin
  const disconnectPins = (pins) => {
    const nodes = DisconnectConnectedPins(funcNodes, pins)
    if (nodes) { changeNodes(nodes, ui) }
  }

  const onRemoveConnection = (node, pin, index, dest) => {
    const destNode = funcNodes[dest.node]
    const destPin = _.find(destNode.pins, {uuid: _.isArray(pin.pinned) ? pin.pinned[index].socket : pin.pinned.socket})
    const nodes = RemoveConnection({node, pin}, {node: destNode, pin: destPin})

    changeNodes(nodes, ui)
  }

  const onAddNode = (newNode, source, socket) => {
    addNode(newNode ,ui)

    if (!socket) { return }
    const nodesToUpdate = {[source.uuid]: source, [newNode.uuid]: newNode}
    const exec = {
      In: _.find(newNode.pins, {side: 'In', exec: true}),
      Out: _.find(newNode.pins, {side: 'Out', exec: true})
    }
    const inputs = {
      In: _.find(newNode.pins, p => p.side === 'In' && !p.exec),
      Out: _.find(newNode.pins, p => p.side === 'Out' && !p.exec)
    }
    let nodes = null
    //connect exec pins
    if (socket.side === 'Out') {
      if (!socket.exec && inputs.In && !inputs.In.pinned) {
        nodes = ConnectPins({...funcNodes, ...nodesToUpdate}, {node: source, pin: socket}, {node: newNode, pin: inputs.In})
        nodes && nodes.map(n => nodesToUpdate[n.uuid] = n)
        console.log(3333)
      }
      if (exec.In) {
        source = nodesToUpdate[source.uuid] || source
        newNode = nodesToUpdate[newNode.uuid] || newNode
        const pin = _.find(source.pins, {exec: true, side: 'Out'})
        if (pin) {
          nodes = ConnectPins({...funcNodes, ...nodesToUpdate}, {node: source, pin: socket.exec ? socket : pin}, {node: newNode, pin: exec.In})
          nodes && nodes.map(n => nodesToUpdate[n.uuid] = n)
        }
      }
    } else {
      if (!socket.exec && inputs.Out && !inputs.Out.pinned) {
        nodes = ConnectPins({...funcNodes, ...nodesToUpdate}, {node: source, pin: socket}, {node: newNode, pin: inputs.Out})
        nodes && nodes.map(n => nodesToUpdate[n.uuid] = n)
      }
      if (exec.Out) {
        source = nodesToUpdate[source.uuid] || source
        newNode = nodesToUpdate[newNode.uuid] || newNode
        const pin = _.find(source.pins, {exec: true, side: 'In'})
        if (pin) {
          nodes = ConnectPins({...funcNodes, ...nodesToUpdate}, {node: source, pin: socket.exec ? socket : pin}, {node: newNode, pin: exec.Out})
          nodes && nodes.map(n => nodesToUpdate[n.uuid] = n)
        }
      }
    }

    if (nodes) {
      changeNodes(nodes, ui)
      setTimeout(() => setSvgUpdate(new Date()), 0) // no clue why it does not rerender
    }
  }

  const moveBox = (node, left, top) => {
    node.position = {x: left, y: top}
  }

  let conn = null
  const createLine = (position, right, type, dataType) => {
    let x = (position.x - svgOffset.x + (ref.current.scrollLeft)) / zoom
    let y = (position.y - svgOffset.y + 4 + (ref.current.scrollTop)) / zoom
    setTemp({begin: {x, y}, end: {x, y}, right, offset: {x:0, y:0}, type, dataType})
    offset = null
    return conn
  }

  const renderNode = (node) => {
    const Node = NodeRegister.getView(node.type)

    if (!Node) { throw("Missing node component in '/Nodes/types/" + node.type)}

    return <Node
      id={node.uuid}
      key={node.uuid}
      node={node}
      engine={engine}
      ui={ui}
      userNodesRegister={userNodesRegister}
      createLine={createLine}
      connect={connect}
      removeNode={removeNode}
      changeNode={changeNode}
      disconnectPins={disconnectPins}
    />
  }

  const handleClick = (e) => {
    setContext(false)
    onClick && onClick()
  }

  let mouse
  let mouseDown = false

  const stopMoving = () => {
    mouseDown = false
    mouse = null
  }

  const cameraDown = (e) => {
    if (e.button === 2) {
      e.preventDefault()
      e.stopPropagation()
      _.delay(() => {
        mouseDown = true
        ref.current.style.cursor = 'grabbing'
      }, 200)
    }
  }

  const cameraMove = (e) => {
    if (mouseDown) {
      if (!mouse) {
        mouse = {x: e.clientX, y: e.clientY}
        return
      }
      const dx = mouse.x - e.clientX
      const dy = mouse.y - e.clientY
      ref.current.scrollTop += dy
      ref.current.scrollLeft += dx
      mouse = {x: e.clientX, y: e.clientY}
    }
  }

  const cameraUp = (e) => {
    if (mouseDown) {
      ref.current.style.cursor = ''
      e.preventDefault()
      e.stopPropagation()
    }
    stopMoving()
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
    } else {
      if (e.deltaX) {
        const dx = e.deltaX / 2
        ref.current.scrollLeft += dx

        const dy = e.deltaY / 2
        ref.current.scrollTop += dy
      } else {
        if (e.shiftKey) {
          const dx = e.deltaY / 2
          ref.current.scrollLeft += dx
        } else {
          const dy = e.deltaY / 2
          ref.current.scrollTop += dy
        }
      }
    }
  }

  const focusNodes = () => {
    const positions = _.map(funcNodes, 'position')
    if (!positions.length) { return }

    const pos = {x: _.minBy(positions, 'x').x, y: _.minBy(positions, 'y').y}
    ref.current.scrollLeft = pos.x * zoom - 100
    ref.current.scrollTop = pos.y * zoom - 100
  }

  const onKeyPress = (e) => {
    if (e.target !== document.body) { return }

    if (e.code === 'Space') {
      e.preventDefault()
    }
    if(e.code === 'KeyF') {
      focusNodes()
    }
  }

  return (
    <div className={cs(css.editorWrapper)}>
      <div ref={drop(ref)}
        onMouseDown={(e) => handleClick(e)}
        className={cs(css.editor)}
        onContextMenu={(e) => onShowContext(e)}
      >
        <div ref={camera}
          className={css.camera} style={{width: SIZE.width, height: SIZE.height, transform: `scale(${zoom})`}}
          // onMouseDown={cameraDown}
          // onMouseMove={cameraMove}
          // onContextMenu={cameraUp}
        >
          <Connections
            zoom={zoom}
            offset={svgOffset}
            nodes={funcNodes}
            temp={temp}
            addConnection={addConnection}
            ui={ui}
            scrollTop={ref.current && ref.current.scrollTop}
            scrollLeft={ref.current && ref.current.scrollLeft}
            removeConnection={onRemoveConnection}
            update={svgUpdate} />
          <div>
            {_.map(funcNodes, renderNode)}
          </div>
        </div>

        {context && <ContextMenu
            left={context.left}
            top={context.top}
            ui={ui}
            nodeList={nodeList}
            node={context.node}
            nodePos={context.nodePos}
            socket={context.socket}
            connection={context.temp}
            close={() => setContext(false)}
            addNode={onAddNode}
            connect={connect}
          />}
        <div id="overlayContainer" />
      </div>
      <div className={css.zoomControls}>
        <div onClick={() => focusNodes()} className={css.label}>[ ]</div>
        <div onClick={() => updateZoom(zoom - 0.1)} className={css.btn}>-</div>
        <div onClick={() => updateZoom(1)} className={css.label}>Zoom: {Math.round(zoom * 10 - 10)}</div>
        <div onClick={() => updateZoom(zoom + 0.1)} className={css.btn}>+</div>
      </div>
    </div>
  )
}
