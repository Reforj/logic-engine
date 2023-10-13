import { v4 as uuid } from 'uuid'
import { SIZE } from '../consts/Editor'
import { NodeCode, NodeType, NodesData } from '../consts/NodesData'
import { Pin as IPin } from '../interfaces/Pin'

const defaultPos = [SIZE.width / 2 - 300, SIZE.height / 2 - 100]

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

interface Args {
  code: NodeCode,
  pins: IPin[]
  position: [x: number, y: number]
}

export const Entry = (args:any = {}) => ({
  uuid: uuid(),
  code: NodeCode.ENTRY,
  pins: [
    ...NodesData[NodeCode.ENTRY].pins.map((p) => newPin(p)),
    ...(args.inputs || []).map((pin) => PinOut(pin)),
  ],
  p: args.position || defaultPos,
})

export const Return = (_, args:any = { offset: { x: 200 } }) => ({
  uuid: uuid(),
  code: NodeCode.RETURN,
  pins: NodesData[NodeCode.RETURN].pins.map((p) => newPin(p)),
  p: args.position || [defaultPos[0] + (args.offset.x), defaultPos[1]],
})

export const RegularNode = (func, args:Args) => ({
  uuid: uuid(),
  code: args.code,
  pins: args.pins.map((p) => newPin(p)),
  p: args.position || defaultPos,
})

const UserNode = (func, args:any = {}) => ({
  uuid: uuid(),
  type: NodeType.UserNode,
  name: args.name,
  executable: args.executable || false,
  data: args.data,
  pins: [
    ...(args.executable ? [PinExecIn(), PinExecOut()] : []),
    ...args.pins.map((pin) => newPin(pin)),
  ],
  p: args.position || defaultPos,
})

export default {
  [NodeType.Entry]: Entry,
  [NodeType.Return]: Return,
  [NodeType.Operator]: RegularNode,
  [NodeType.CallLibrary]: RegularNode,
  [NodeType.Branch]: RegularNode,
  [NodeType.UserNode]: UserNode,
}
