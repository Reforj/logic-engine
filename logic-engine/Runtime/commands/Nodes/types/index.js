import { NodeType } from '../../../../../consts/NodesData'

import Entry from './Entry'
import Return from './Return'
import CallLibrary from './CallLibrary'
import UserNode from './UserNode'
import Branch from './Branch' // legacy

export default {
  [NodeType.Entry]: Entry,
  [NodeType.Return]: Return,
  [NodeType.CallLibrary]: CallLibrary,
  [NodeType.Operator]: CallLibrary,
  [NodeType.Branch]: Branch,
  [NodeType.UserNode]: UserNode,
}
