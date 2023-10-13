import NodeRegister from '../../../registers/NodeRegister'
import { NodeType } from '../../../consts/NodesData'

import Entry from './views/Entry'
import Return from './views/Return'
import Operator from './views/Operator'
import CallLibrary from './views/CallLibrary'
import Branch from './views/Branch'
import UserNode from './views/UserNode'

NodeRegister.defineView(NodeType.Entry, Entry)
NodeRegister.defineView(NodeType.Return, Return)
NodeRegister.defineView(NodeType.Operator, Operator)
NodeRegister.defineView(NodeType.CallLibrary, CallLibrary)
NodeRegister.defineView(NodeType.Branch, Branch)
NodeRegister.defineView(NodeType.UserNode, UserNode)
