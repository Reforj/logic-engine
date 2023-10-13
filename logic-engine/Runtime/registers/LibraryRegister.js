import operators from '../Library/OperatorScope'
import debugs from '../Library/DebugScope'
import logic from '../Library/LogicScope'
import array from '../Library/ArrayScope'

const functions = {
  ...operators,
  ...debugs,
  ...logic,
  ...array,
}

export default {
  register (name, func) {
    functions[name] = func
  },

  get (opcode) {
    return functions[opcode]
  },

  call (opcode, args) {
    if (functions[opcode]) {
      return functions[opcode](...args)
    }
    console.error(`LibraryRegister: undefined function: ${opcode}`)
  },
}
