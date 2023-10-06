export default {
  'Logic.Not': (x) => {
    return !x
  },
  'Logic.And': (...args) => {
    if (!args[0]) { return false }
    let res = args[0]
    for(let i=1; i<args.length; i++) {
      res = res && args[i]
      if (!res) { return false }
    }
    return res
  },
  'Logic.Or': (...args) => {
    if (args[0]) { return true }

    let res = args[0]
    for(let i=1; i<args.length; i++) {
      res = res || args[i]
      if (res) { return true }
    }
    return res
  },
  'Logic.Equal': (x, y) => {
    return x === y
  },
  'Logic.NotEqual': (x, y) => {
    return x !== y
  },
  'Logic.Greater': (x, y) => {
    return x > y
  },
  'Logic.Less': (x, y) => {
    return x < y
  },
  'Logic.GreaterEqual': (x, y) => {
    return x >= y
  },
  'Logic.LessEqual': (x, y) => {
    return x <= y
  },
}
