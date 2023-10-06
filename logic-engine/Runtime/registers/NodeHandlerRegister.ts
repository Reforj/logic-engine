const nodeHandlers = {}

// { [category]: {[name]: node} }

// {type, pins: [{side: In | out}], view, handler}

const NodeRegister = {
  define (name, handler) {
    nodeHandlers[name] = handler
  },

  get (name) {
    if (nodeHandlers[name]) {
      return nodeHandlers[name]
    }
  },
}

export default NodeRegister
