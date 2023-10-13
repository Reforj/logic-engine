import { useEffect } from 'react'
import LogicEditor from './LogicEditor'
import connect from './connect'
import { Entry, Return } from '../registers/NodeTypes'
import { ConnectPins } from './GraphEditor/commands/ConnectPins'
import { reduceUuid } from '../utils/reduce'

const initialFunc = (entryArgs = []) => {
  const entry = Entry({ inputs: entryArgs })
  const end = Return()
  let nodes = ConnectPins({}, { node: entry, pin: entry.pins[0] }, { node: end, pin: end.pins[0] })
  nodes = reduceUuid(nodes, (n) => n)
  return nodes
}

const LogicEngine = connect(({
  init, data = {}, userNodesRegister, entryArgs,
}) => {
  useEffect(() => {
    let { nodes } = data
    if (!data.nodes) {
      nodes = initialFunc(entryArgs)
    }
    init({ nodes })
  }, [])

  return <LogicEditor userNodesRegister={userNodesRegister} />
})

export { LogicEngine }
