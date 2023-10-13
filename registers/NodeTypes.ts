import { v4 as uuid } from 'uuid'
import { SIZE } from '../consts/Editor'

const defaultPos = { x: SIZE.width / 2 - 300, y: SIZE.height / 2 - 100 }

export enum PinSide {
  In = 0,
  Out = 1
}

export const PinExecIn = (args = {}) => ({
  ...PinIn({
    exec: true, ...args,
  }),
  multiple: true,
})

export const PinExecOut = (args = {}) => ({
  ...PinOut({
    exec: true, ...args,
  }),
  multiple: false,
})

export const newPin = (data) => {
  if (data.side === PinSide.In) {
    return data.exec ? PinExecIn(data) : PinIn(data)
  }
  return data.exec ? PinExecOut(data) : PinOut(data)
}

export const Pin = (args) => ({
  uuid: uuid(),
  ...args,
})

export const PinOut = (args) => ({
  ...Pin(args),
  side: PinSide.Out,
  multiple: true,
})

export const PinIn = (args) => ({
  ...Pin(args),
  side: PinSide.In,
})

const Entry = (args:any = {}) => ({
  uuid: uuid(),
  type: 'Entry',
  canNotDelete: true,
  executable: true,
  pins: [
    PinExecOut(),
    ...(args.inputs || []).map((pin) => PinOut(pin)),
  ],
  position: args.position || defaultPos,
})

const Return = (_, args:any = { offset: { x: 200 } }) => ({
  uuid: uuid(),
  type: 'Return',
  executable: true,
  pins: [
    PinExecIn(),
    PinIn({
      outputUuid: 'result', name: 'Result', dataType: 'boolean', defaultValue: false,
    }),
  ],
  position: args.position || { x: defaultPos.x + (args.offset.x), y: defaultPos.y },
})

const Operator = (func, args:any = {}) => ({
  uuid: uuid(),
  type: 'Operator',
  nodeTitle: args.nodeTitle,
  path: args.path,
  pure: args.pure || false,
  pins: [
    ...args.inputs.map((input) => PinIn({ dataType: input.dataType, defaultValue: input.defaultValue })),
    ...args.outputs.map((output) => PinOut({ dataType: output.dataType })),
  ],
  position: args.position || defaultPos,
  canAddInputs: args.canAddInputs || false,
})

const CallLibrary = (func, args:any = {}) => ({
  uuid: uuid(),
  type: 'CallLibrary',
  nodeTitle: args.nodeTitle,
  title: args.title,
  pure: args.pure || false,
  path: args.path,
  pins: [
    ...(args.pure ? [] : [PinExecIn(), PinExecOut()]),
    ...(args.inputs || []).map((s) => PinIn(s)),
    ...(args.outputs || []).map((s) => PinOut(s)),
  ],
  position: args.position || defaultPos,
})

const Branch = (func, args:any = {}) => ({
  uuid: uuid(),
  type: 'Branch',
  pins: [
    PinExecIn(),
    PinExecOut({ name: 'True' }),
    PinExecOut({ name: 'False' }),
    PinIn({ name: 'Condition', dataType: 'boolean', defaultValue: false }),
  ],
  position: args.position || defaultPos,
})

const UserNode = (func, args:any = {}) => ({
  uuid: uuid(),
  type: 'UserNode',
  name: args.name,
  title: args.title,
  executable: args.executable || false,
  pins: [
    ...(args.executable ? [PinExecIn(), PinExecOut()] : []),
    ...args.pins.map((pin) => (pin.side === PinSide.In ? PinIn(pin) : PinOut(pin))),
  ],
  position: args.position || defaultPos,
  data: args.data,
})

export default {
  Entry,
  Return,
  Operator,
  CallLibrary,
  Branch,
  UserNode,
}
