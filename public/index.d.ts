export { PinSide } from '../registers/NodeTypes'

interface Pin {
  side: PinSide
  name?: string
  dataType?: 'boolean' | 'number' | 'string' | 'object'
  defaultValue?: any
  exec?: boolean
}

interface EntryPin {
  name: string
  dataType?: 'boolean' | 'number' | 'string' | 'object'
  defaultValue?: any
}

interface ExistsPin extends Pin {
  uuid: string
}

interface Node {
  name: string
  title: string
  pins: Pin[]
  data?: any
  executable?: boolean
}

interface StateNode {
  uuid: string
  name: string
  pins: ExistsPin[]
  data?: any
  executable?: boolean
}

export interface State {
  nodes: {[uuid:string]: StateNode}
}

interface CustomComponentProps {
  node: StateNode
  sockets: ReactNode
  inputPins: ExistsPin[]
  outputPins: ExistsPin[]
  renderInputPin(pin: ExistsPin): ReactNode
  renderOutputPin(pin: ExistsPin): ReactNode
  disconnectPin(pin: ExistsPin): void
  disconnectAllPins(): void
  changePin(pin: ExistsPin): void
  changePins(pins: ExistsPin[]): void
  createPin(pin: Pin): ExistsPin
  removePin(data: ExistsPin): void
  changeData(data: any): void
}

export declare class NodesRegister {
  define (category: string, node: Node, Component: React.FC<CustomComponentProps>): void
}

export declare const LogicEngine: React.ForwardRefExoticComponent<{
  userNodesRegister: NodesRegister,
  data?: State,
  headerContent?: React.ReactNode
  useDndProvider?: boolean
  entryArgs?: EntryPin[]
}>

export declare function getState(): State

export declare function newPin(args:Pin): ExistsPin
