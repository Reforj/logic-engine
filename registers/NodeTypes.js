import {v4 as uuid} from 'uuid'
import { SIZE } from '../consts/Editor'
import _ from 'lodash'

const defaultPos = {x: SIZE.width / 2 - 300, y: SIZE.height / 2 - 100 }

export const PinExecIn = (args) => ({
  ...PinIn({exec: true, multiple: true, ...args})
})

export const PinExecOut = (args) => ({
  ...PinOut({exec: true, multiple: false, ...args})
})

export const PinOut = (args) => ({
  uuid: uuid(),
  side: 'Out',
  multiple: true,
  ...args,
})

export const Pin = (args) => ({
  uuid: uuid(),
  ...args,
})

export const PinIn = (args) => ({
  ...Pin(args),
  side: 'In',
})

const Entry = ({inputs = []} = {}, args = {}) => ({
  uuid: uuid(),
  type: "Entry",
  canNotDelete: true,
  executable: true,
  pins: [
    PinExecOut(),
  ],
  position: args.position || defaultPos
})

const Begin = ({inputs = []} = {}, args = {}) => ({
  uuid: uuid(),
  type: "Begin",
  canNotDelete: true,
  executable: true,
  pins: [
    PinExecOut(),
  ],
  position: args.position || defaultPos
})

const Return = ({outputs = []} = {}, args = {offset: {x: 200}}) => ({
  uuid: uuid(),
  type: "Return",
  pins: [
    PinExecIn(),
    PinIn({outputUuid: 'result', name: 'Result', dataType: 'boolean', defaultValue: false})
  ],
  position: args.position || { x: defaultPos.x + (args.offset.x), y: defaultPos.y }
})

const Operator = (func, args = {}) => ({
  uuid: uuid(),
  type: "Operator",
  nodeTitle: args.nodeTitle,
  path: args.path,
  pure: args.pure || false,
  pins: [
    ..._.map(args.inputs, input => PinIn({dataType: input.dataType, defaultValue: input.defaultValue})),
    ..._.map(args.outputs, output => PinOut({dataType: output.dataType})),
  ],
  position: args.position || defaultPos,
  canAddInputs: args.canAddInputs || false,
})

const CallLibrary = (func, args = {}) => ({
  uuid: uuid(),
  type: "CallLibrary",
  nodeTitle: args.nodeTitle,
  title: args.title,
  pure: args.pure || false,
  path: args.path,
  pins: [
    ...(args.pure ? [] : [PinExecIn(), PinExecOut()]),
    ..._.map(args.inputs || [], (s) => PinIn(s)),
    ..._.map(args.outputs || [], (s) => PinOut(s))
  ],
  position: args.position || defaultPos
})

const Branch = (func, args) => ({
  uuid: uuid(),
  type: "Branch",
  pins: [
    PinExecIn(),
    PinExecOut({name: 'True'}),
    PinExecOut({name: 'False'}),
    PinIn({name: 'Condition', dataType: 'boolean', defaultValue: false})
  ],
  position: args.position || defaultPos
})

const UserNode = (func, args = {}) => ({
  uuid: uuid(),
  type: "UserNode",
  name: args.name,
  title: args.title,
  executable: args.executable || false,
  pins: [
    ...(args.executable ? [PinExecIn(), PinExecOut()] : []),
    ..._.map(args.pins, (pin) => pin.side === 'In' ? PinIn(pin) : PinOut(pin))
  ],
  position: args.position || defaultPos,
  data: args.data
})

export default {
  Begin,
  Entry,
  Return,
  Operator,
  CallLibrary,
  Branch,
  UserNode,
}
