export enum PinType {
  FlowInput,
  FlowOutput,
  DataInput,
  DataOutput
}

export interface PinArgs {
  type: PinType,
  name?: string
  dataType?: DataType
  defaultValue?: any
  data?: any
}

export enum DataType {
  Boolean,
  String,
  Number,
  Object,
  Any
}

interface EntryPin {
  name: string
  dataType?: DataType
  defaultValue?: any
}

interface ExistsPin extends Pin {
  uuid: string
}

interface Node {
  name: string
  title: string
  pins: Pin[]
  executable?: boolean
}

interface CustomNode extends Node {
  nodeClassName?: string
  headerClassName?: string
  pinsClassName?: string
  data?: any
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
  pins: ReactNode
  inputPins: ExistsPin[]
  outputPins: ExistsPin[]
  renderPin(pin: ExistsPin): ReactNode
  disconnectPin(pin: ExistsPin): void
  disconnectAllPins(): void
  changePin(pin: ExistsPin): void
  change({ data, pins }: {data: any, pins: ExistsPin[]}): void
  createPin(pin: Pin): ExistsPin
  removePin(data: ExistsPin): void
}

export declare class NodesRegister {
  define (category: string, node: CustomNode, Component: React.FC<CustomComponentProps>): void
}

export declare const LogicEngine: React.ForwardRefExoticComponent<{
  userNodesRegister: NodesRegister,
  data?: State,
  headerContent?: React.ReactNode
  useDndProvider?: boolean
  entryArgs?: EntryPin[]
}>

export declare function getState(): State

export declare function Pin(args:PinArgs): ExistsPin
