import { Opcode } from '../../../consts/Opcodes'

export default {
  [Opcode.PLUS]: (x, y) => x + y,
  [Opcode.MINUS]: (x, y) => x - y,
}
