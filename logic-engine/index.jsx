import React, { useEffect } from "react"
import LogicEditor from './LogicEditor'
import connect from './connect'
import NodeTypes from "../registers/NodeTypes"
import { ConnectPins } from "./GraphEditor/commands/ConnectPins"
import { reduceUuid } from "../utils/reduce"

const initialFunc = () => {
  const entry = NodeTypes.Entry()
  const end = NodeTypes.Return()
  let nodes = ConnectPins({}, {node: entry, pin: entry.pins[0]}, {node: end, pin: end.pins[0]})
  nodes = reduceUuid(nodes, (n) => n)
  return nodes
}

const LogicEngine = connect(({state, init, data = {}, returnPins = [], userNodesRegister, ...userData}) => {
  useEffect(() => {
    let {nodes, variables} = data
    if (!data.nodes) {
      nodes = initialFunc()
    }
    init({nodes, variables, userData})
  }, [])

  return <LogicEditor userNodesRegister={userNodesRegister} />
})

export { LogicEngine }
