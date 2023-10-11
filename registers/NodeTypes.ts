import { v4 as uuid } from 'uuid'
import _ from 'lodash'
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

const Entry = (_, args:any = {}) => ({
  uuid: uuid(),
  type: 'Entry',
  canNotDelete: true,
  executable: true,
  pins: [
    PinExecOut(),
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
    ..._.map(args.inputs, (input) => PinIn({ dataType: input.dataType, defaultValue: input.defaultValue })),
    ..._.map(args.outputs, (output) => PinOut({ dataType: output.dataType })),
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
    ..._.map(args.inputs || [], (s) => PinIn(s)),
    ..._.map(args.outputs || [], (s) => PinOut(s)),
  ],
  position: args.position || defaultPos,
})

const Branch = (func, args:any) => ({
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
    ..._.map(args.pins, (pin) => (pin.side === PinSide.In ? PinIn(pin) : PinOut(pin))),
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
