import { Opcode } from '../../../consts/Opcodes'

export default {
  [Opcode.NOT]: (x) => !x,
  [Opcode.AND]: (...args) => {
    if (!args[0]) { return false }
    let res = args[0]
    for (let i = 1; i < args.length; i++) {
      res = res && args[i]
      if (!res) { return false }
    }
    return res
  },
  [Opcode.OR]: (...args) => {
    if (args[0]) { return true }

    let res = args[0]
    for (let i = 1; i < args.length; i++) {
      res = res || args[i]
      if (res) { return true }
    }
    return res
  },
  [Opcode.EQUAL]: (x, y) => x === y,
  [Opcode.NOT_EQUAL]: (x, y) => x !== y,
  [Opcode.GT]: (x, y) => x > y,
  [Opcode.LT]: (x, y) => x < y,
  [Opcode.GT_OR_EQ]: (x, y) => x >= y,
  [Opcode.LT_OR_EQ]: (x, y) => x <= y,
}
