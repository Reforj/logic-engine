export enum DataType {
  Boolean,
  String,
  Number,
  Object,
  Any
}

export enum PinSide {
  In = 0,
  Out = 1
}

export interface Pin {
  dataType?: DataType
  defaultValue?: any
  name?: string
  exec?: boolean
}

export interface InputPin extends Pin {
  side: PinSide.In
}

export interface OutputPin extends Pin {
  side: PinSide.Out
}
