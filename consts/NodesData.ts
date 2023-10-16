import { Opcode } from './Opcodes'
import {
  Pin, DataType, PinType,
} from '../interfaces/Pin'

const defaultValues = {
  [DataType.Boolean]: false,
  [DataType.Number]: 0,
  [DataType.String]: '',
  [DataType.Object]: {},
  [DataType.Any]: undefined,
}

interface PinArgs {
  type: PinType,
  name?: string
  dataType?: DataType
  defaultValue?: any
}
interface InputArgs extends Omit<PinArgs, 'type'> {
  exec?: boolean
}

const pin = (data: PinArgs) => ({ ...data })
const output = ({ exec, ...data }: InputArgs) => pin({
  type: exec ? PinType.FlowOutput : PinType.DataOutput,
  ...data,
})
const input = ({ exec, ...data }: InputArgs) => pin({
  type: exec ? PinType.FlowInput : PinType.DataInput,
  ...data,
  ...({ defaultValue: data.defaultValue ?? defaultValues[data.dataType ?? DataType.Any] }),
})

export enum NodeType {
  Entry,
  Return,
  Operator,
  CallLibrary,
  Branch,
  UserNode,
}

export enum NodeCode {
  LOGIC_NOT = 1,
  LOGIC_AND = 2,
  LOGIC_OR = 3,
  LOGIC_EQUAL_BOOL = 4,
  LOGIC_EQUAL_NUMBER = 5,
  LOGIC_EQUAL_STRING = 6,
  LOGIC_NOT_EQUAL_BOOL = 7,
  LOGIC_NOT_EQUAL_NUMBER = 8,
  LOGIC_NOT_EQUAL_STRING = 9,
  LOGIC_GT = 10,
  LOGIC_GT_OR_EQ = 11,
  LOGIC_LT = 12,
  LOGIC_LT_OR_EQ = 13,

  OPERATOR_PLUS_NUMBER = 14,
  OPERATOR_PLUS_STRING = 15,

  BRANCH = 16,
  ENTRY = 17,
  RETURN = 18,
  CONSOLE_LOG = 19,
  USER_NODE = 20,
}

export const NodesData = {
  [NodeCode.LOGIC_NOT]: {
    type: NodeType.Operator,
    nodeTitle: 'NOT',
    opcode: Opcode.NOT,
    pins: [
      input({ dataType: DataType.Boolean }),
      output({ dataType: DataType.Boolean }),
    ],
  },
  [NodeCode.LOGIC_AND]: {
    type: NodeType.Operator,
    nodeTitle: 'AND',
    opcode: Opcode.AND,
    canAddInputs: true,
    pins: [
      input({ dataType: DataType.Boolean }),
      input({ dataType: DataType.Boolean }),
      output({ dataType: DataType.Boolean }),
    ],
  },
  [NodeCode.LOGIC_OR]: {
    type: NodeType.Operator,
    nodeTitle: 'OR',
    opcode: Opcode.OR,
    canAddInputs: true,
    pins: [
      input({ dataType: DataType.Boolean }),
      input({ dataType: DataType.Boolean }),
      output({ dataType: DataType.Boolean }),
    ],
  },
  [NodeCode.LOGIC_EQUAL_BOOL]: {
    type: NodeType.Operator,
    nodeTitle: 'EQUAL',
    opcode: Opcode.EQUAL,
    pins: [
      input({ dataType: DataType.Boolean }),
      input({ dataType: DataType.Boolean }),
      output({ dataType: DataType.Boolean }),
    ],
  },
  [NodeCode.LOGIC_EQUAL_NUMBER]: {
    type: NodeType.Operator,
    nodeTitle: 'EQUAL',
    opcode: Opcode.EQUAL,
    pins: [
      input({ dataType: DataType.Number }),
      input({ dataType: DataType.Number }),
      output({ dataType: DataType.Boolean }),
    ],
  },
  [NodeCode.LOGIC_EQUAL_STRING]: {
    type: NodeType.Operator,
    nodeTitle: 'EQUAL',
    opcode: Opcode.EQUAL,
    pins: [
      input({ dataType: DataType.String }),
      input({ dataType: DataType.String }),
      output({ dataType: DataType.Boolean }),
    ],
  },
  [NodeCode.LOGIC_NOT_EQUAL_BOOL]: {
    type: NodeType.Operator,
    nodeTitle: 'EQUAL',
    opcode: Opcode.NOT_EQUAL,
    pins: [
      input({ dataType: DataType.Boolean }),
      input({ dataType: DataType.Boolean }),
      output({ dataType: DataType.Boolean }),
    ],
  },
  [NodeCode.LOGIC_NOT_EQUAL_NUMBER]: {
    type: NodeType.Operator,
    nodeTitle: 'EQUAL',
    opcode: Opcode.NOT_EQUAL,
    pins: [
      input({ dataType: DataType.Number }),
      input({ dataType: DataType.Number }),
      output({ dataType: DataType.Boolean }),
    ],
  },
  [NodeCode.LOGIC_NOT_EQUAL_STRING]: {
    type: NodeType.Operator,
    nodeTitle: 'EQUAL',
    opcode: Opcode.NOT_EQUAL,
    pins: [
      input({ dataType: DataType.String }),
      input({ dataType: DataType.String }),
      output({ dataType: DataType.Boolean }),
    ],
  },
  [NodeCode.LOGIC_GT]: {
    type: NodeType.Operator,
    nodeTitle: 'EQUAL',
    opcode: Opcode.GT,
    pins: [
      input({ dataType: DataType.Number }),
      input({ dataType: DataType.Number }),
      output({ dataType: DataType.Boolean }),
    ],
  },
  [NodeCode.LOGIC_GT_OR_EQ]: {
    type: NodeType.Operator,
    nodeTitle: 'EQUAL',
    opcode: Opcode.GT_OR_EQ,
    pins: [
      input({ dataType: DataType.Number }),
      input({ dataType: DataType.Number }),
      output({ dataType: DataType.Boolean }),
    ],
  },
  [NodeCode.LOGIC_LT]: {
    type: NodeType.Operator,
    nodeTitle: 'EQUAL',
    opcode: Opcode.LT,
    pins: [
      input({ dataType: DataType.Number }),
      input({ dataType: DataType.Number }),
      output({ dataType: DataType.Boolean }),
    ],
  },
  [NodeCode.LOGIC_LT_OR_EQ]: {
    type: NodeType.Operator,
    nodeTitle: 'EQUAL',
    opcode: Opcode.LT_OR_EQ,
    pins: [
      input({ dataType: DataType.Number }),
      input({ dataType: DataType.Number }),
      output({ dataType: DataType.Boolean }),
    ],
  },

  [NodeCode.OPERATOR_PLUS_NUMBER]: {
    type: NodeType.Operator,
    nodeTitle: '+',
    opcode: Opcode.PLUS,
    pins: [
      input({ dataType: DataType.Number }),
      input({ dataType: DataType.Number }),
      output({ dataType: DataType.Number }),
    ],
  },

  [NodeCode.OPERATOR_PLUS_STRING]: {
    type: NodeType.Operator,
    nodeTitle: '+',
    opcode: Opcode.PLUS,
    pins: [
      input({ dataType: DataType.String }),
      input({ dataType: DataType.String }),
      output({ dataType: DataType.String }),
    ],
  },
  [NodeCode.CONSOLE_LOG]: {
    type: NodeType.CallLibrary,
    nodeTitle: 'Console.log',
    opcode: Opcode.CONSOLE_LOG,
    pins: [
      input({ exec: true }),
      output({ exec: true }),
      input({ dataType: DataType.Any }),
    ],
  },
  [NodeCode.BRANCH]: {
    type: NodeType.Branch,
    pins: [
      input({ exec: true }),
      output({ exec: true, name: 'True' }),
      output({ exec: true, name: 'False' }),
      input({ name: 'Condition', dataType: DataType.Boolean }),
    ],
    executable: true,
  },
  [NodeCode.ENTRY]: {
    type: NodeType.Entry,
    pins: [output({ exec: true })],
    canNotDelete: true,
    executable: true,
  },
  [NodeCode.RETURN]: {
    type: NodeType.Return,
    pins: [input({ exec: true }), input({ name: 'Result', dataType: DataType.Boolean })],
    executable: true,
  },
  [NodeCode.USER_NODE]: {
    type: NodeType.UserNode,
    pins: [],
  },
}
