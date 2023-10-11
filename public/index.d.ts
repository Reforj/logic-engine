interface Pin {
  side: 'In' | 'Out'
  name?: string
  dataType?: 'boolean' | 'number' | 'string' | 'object'
  defaultValue?: any
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
  pins: Pin[]
}

export interface State {
  nodes: {[uuid:string]: StateNode}
}

interface CustomComponentProps {
  node: Node
  sockets: ReactNode
  inputSockets: Pin[]
  outputSockets: Pin[]
  disconnectPin: (pin: Pin) => void
  disconnectAllPins: () => void
  changePins: (pins: Pin[]) => void
  createPin: (pin: Pin) => void
  changeData: (data: any) => void
}

export declare class NodesRegister {
  define (category: string, node: Node, Component: React.FC<CustomComponentProps>): void
}

export declare const LogicEngine: React.ForwardRefExoticComponent<{
  userNodesRegister: NodesRegister,
  data?: State,
  headerContent?: React.ReactNode
  useDndProvider?: boolean
}>

export declare function getState(): State

export declare function Pin(args:Pin): Pin
