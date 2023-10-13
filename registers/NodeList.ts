import { NodeCode } from '../consts/NodesData'

export default [
  {
    title: 'Logic',
    key: 'logic',
    category: true,
    children: [
      { code: NodeCode.LOGIC_NOT, title: 'Not (!)' },
      { code: NodeCode.LOGIC_AND, title: 'And (&&)' },
      { code: NodeCode.LOGIC_OR, title: 'Or (||)' },
      { code: NodeCode.LOGIC_EQUAL_BOOL, title: 'Equal (boolean === boolean)' },
      { code: NodeCode.LOGIC_NOT_EQUAL_BOOL, title: 'Not Equal (boolean !== boolean)' },
      { code: NodeCode.LOGIC_EQUAL_NUMBER, title: 'Equal (number === number)' },
      { code: NodeCode.LOGIC_NOT_EQUAL_NUMBER, title: 'Not Equal (number !== number)' },
      { code: NodeCode.LOGIC_EQUAL_STRING, title: 'Equal (string === string)' },
      { code: NodeCode.LOGIC_NOT_EQUAL_STRING, title: 'Not Equal (string !== string)' },
      { code: NodeCode.LOGIC_GT, title: 'Greater (>)' },
      { code: NodeCode.LOGIC_GT_OR_EQ, title: 'Greater or equal (>=)' },
      { code: NodeCode.LOGIC_LT, title: 'Less (<)' },
      { code: NodeCode.LOGIC_LT_OR_EQ, title: 'Less or equal (<=)' },
    ],
  },
  {
    title: 'Operator',
    key: 'operators',
    category: true,
    children: [
      { code: NodeCode.OPERATOR_PLUS_NUMBER, title: 'Number + Number(Plus)' },
      { code: NodeCode.OPERATOR_PLUS_STRING, title: 'String + String(concan)' },
    ],
  },
  {
    title: 'Debug',
    key: 'debugs',
    category: true,
    children: [
      { code: NodeCode.CONSOLE_LOG, title: 'Console Log' },
    ],
  },
  {
    title: 'Flow',
    key: 'flow',
    category: true,
    children: [
      { code: NodeCode.BRANCH, title: 'Branch' },
      { code: NodeCode.RETURN, title: 'Return Node' },
    ],
  },
]
