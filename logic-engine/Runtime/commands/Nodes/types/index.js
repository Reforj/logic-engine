import NodeRegister from '../../../registers/NodeHandlerRegister'

import Entry from './Entry'
import Return from './Return'
import CallLibrary from './CallLibrary'
import UserNode from './UserNode'
import Branch from './Branch'  // legacy


NodeRegister.define('Entry', Entry)
NodeRegister.define('Return', Return)
NodeRegister.define('CallLibrary', CallLibrary)
NodeRegister.define('UserNode', UserNode)
NodeRegister.define('Operator', CallLibrary)
NodeRegister.define('Branch', Branch)
