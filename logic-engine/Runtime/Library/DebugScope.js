import { Opcode } from '../../../consts/Opcodes'

export default {
  // eslint-disable-next-line no-console
  [Opcode.CONSOLE_LOG]: (...args) => console.log(...args),
}
