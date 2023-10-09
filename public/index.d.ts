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

export declare class NodesRegister {
  define (name: string, node: Node) {}
}

export declare const LogicEngine: React.ForwardRefExoticComponent<{
  userNodesRegister: NodesRegister,
  data?: State,
  headerContent?: React.ReactNode
  useDndProvider?: boolean
}>

export declare function getState(): State
