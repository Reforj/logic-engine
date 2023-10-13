import { Opcode } from '../../../consts/Opcodes'

export default {
  [Opcode.PLUS]: (x, y) => x + y,
  'Operator.Minus': (x, y) => x - y,
  'Operator.Multiple': (x, y) => x * y,
  'Operator.Increment': (x) => +x + 1,
  'Operator.Decrement': (x) => +x - 1,
  'Operator.UnaryPlus': (x) => +x,
  'Operator.UnaryMinus': (x) => -x,
}
