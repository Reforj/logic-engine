import React, {useRef, useEffect} from 'react'
import css from './ContextMenu.less'
import NodeTypes from '../../../registers/NodeTypes'
import cs from 'classnames'
import _ from 'lodash'
import { TreeMenu } from './TreeMenu'

export default function ContextMenu (props) {
  const { func, nodeList, left, top, close, addNode, socket, connect, nodePos, node: source } = props
  const ref = useRef()

  const click = (e) => {
    e.stopPropagation()
  }

  const add = (node) => {
    const Node = NodeTypes[node.type]

    if (!Node) { throw `Missing registered node type: ${node.type} in registers/NodeTypes.js`}

    const newNode = Node(func, {...node, position: nodePos})

    addNode(newNode, source, socket)
    close()
  }

  useEffect(() => {
    ref.current.addEventListener('wheel', wheel,  { passive: false })
    return () => {
      ref.current && ref.current.removeEventListener('wheel', wheel)
    }
  }, [])

  const wheel = (e) => {
    e.stopPropagation()
  }

  return <div ref={ref} onMouseDown={click} onClick={click} className={cs(css.contextMenu, css.tree)} style={{left, top}}>
    {/* <div className={css.title}>All Acions</div> */}
    <TreeMenu treeData={nodeList} onSelect={add} />
  </div>
}
