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

  call (name, args) {
    if (functions[name]) {
      return functions[name](...args)
    }
    console.error(`LibraryRegister: undefined function: ${name}`)
  },
}
