import { v4 as uuid } from 'uuid'
import { SIZE } from '../consts/Editor'
import { NodeCode, NodeType, NodesData } from '../consts/NodesData'
import { Pin as IPin, PinType, PinArgs } from '../interfaces/Pin'

const defaultPos = [SIZE.width / 2 - 300, SIZE.height / 2 - 100]

export const PinExecIn = (args = {}) => (
  Pin({
    type: PinType.FlowInput, ...args,
  })
)

export const PinExecOut = (args = {}) => (
  Pin({
    type: PinType.FlowOutput, ...args,
  })
)

export const Pin = ({ type, ...args }: PinArgs) => ({
  uuid: uuid(),
  type,
  ...args,
})

export const PinOut = (args) => (
  Pin({
    type: PinType.DataOutput, ...args,
  })
)

export const PinIn = (args) => (
  Pin({
    type: PinType.DataInput, ...args,
  })
)

interface Args {
  code: NodeCode,
  pins: IPin[]
  position: [x: number, y: number]
}

export const Entry = (args:any = {}) => ({
  uuid: uuid(),
  code: NodeCode.ENTRY,
  pins: [
    ...NodesData[NodeCode.ENTRY].pins.map((p) => Pin(p)),
    ...(args.inputs || []).map((pin) => PinOut(pin)),
  ],
  p: args.position || defaultPos,
})

export const Return = (_, args:any = { offset: { x: 200 } }) => ({
  uuid: uuid(),
  code: NodeCode.RETURN,
  pins: NodesData[NodeCode.RETURN].pins.map((p) => Pin(p)),
  p: args.position || [defaultPos[0] + (args.offset.x), defaultPos[1]],
})

export const RegularNode = (func, args:Args) => ({
  uuid: uuid(),
  code: args.code,
  pins: args.pins.map((p) => Pin(p)),
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
    ...args.pins.map((pin) => Pin(pin)),
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
