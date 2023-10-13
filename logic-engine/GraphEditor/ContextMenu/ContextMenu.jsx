import { useRef, useEffect } from 'react'
import cs from 'classnames'
import css from './ContextMenu.less'
import NodeTypes from '../../../registers/NodeTypes'
import { NodeType, NodesData } from '../../../consts/NodesData'
import { TreeMenu } from './TreeMenu'

export default function ContextMenu (props) {
  const {
    func, nodeList, left, top, close, addNode, socket, nodePos, node: source,
  } = props
  const ref = useRef()

  const click = (e) => {
    e.stopPropagation()
  }

  const add = (node) => {
    let nodeInfo = NodesData[node.code]
    const Node = NodeTypes[node.type || nodeInfo.type]

    if (!Node) { throw new Error(`Missing registered node type: ${node.type} in registers/NodeTypes.js`) }
    if (socket?.side === 0) {
      nodePos.x -= 170
      nodePos.y -= 20
    }

    if (node.type === NodeType.UserNode) {
      nodeInfo = { ...nodeInfo, ...node }
    } else {
      nodeInfo = { ...nodeInfo, code: node.code }
    }

    const newNode = Node(func, { ...nodeInfo, p: [nodePos.x, nodePos.y] })

    addNode(newNode, source, socket)
    close()
  }

  useEffect(() => {
    ref.current.addEventListener('wheel', wheel, { passive: false })
    return () => {
      ref.current && ref.current.removeEventListener('wheel', wheel)
    }
  }, [])

  const wheel = (e) => {
    e.stopPropagation()
  }

  return (
    <div ref={ref} onMouseDown={click} onClick={click} className={cs(css.contextMenu, css.tree)} style={{ left, top }}>
      {/* <div className={css.title}>All Acions</div> */}
      <TreeMenu treeData={nodeList} onSelect={add} />
    </div>
  )
}
