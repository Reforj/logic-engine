import NodeRegister from '../../../registers/NodeRegister'

import Begin from './views/Begin'
import Entry from './views/Entry'
import Return from './views/Return'
import Operator from './views/Operator'
import CallLibrary from './views/CallLibrary'
import Branch from './views/Branch'
import UserNode from './views/UserNode'

NodeRegister.defineView('Begin', Begin)
NodeRegister.defineView('Entry', Entry)
NodeRegister.defineView('Return', Return)
NodeRegister.defineView('Operator', Operator)
NodeRegister.defineView('CallLibrary', CallLibrary)
NodeRegister.defineView('Branch', Branch)
NodeRegister.defineView('UserNode', UserNode)
