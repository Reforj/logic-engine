export enum DataType {
  Boolean,
  String,
  Number,
  Object,
  Any
}

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
}

export interface Pin {
  type: PinType,
  dataType?: DataType
  defaultValue?: any
  name?: string
  exec?: boolean
}

export interface InputPin extends Pin {
}

export interface OutputPin extends Pin {
}
