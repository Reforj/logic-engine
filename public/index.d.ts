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

export declare class NodesRegister {
  define (name: string, node: Node) {}
}

interface Props {
  headerContent?: React.ReactNode
}

export declare const LogicEngine: React.ForwardRefExoticComponent<{userNodesRegister: NodesRegister, nodes?: State} & Props>

export declare function getState(): State
