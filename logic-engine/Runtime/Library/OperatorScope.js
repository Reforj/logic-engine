export default {
  'Operator.Plus': (x, y) => {
    return x + y
  },
  'Operator.Minus': (x, y) => {
    return x - y
  },
  'Operator.Multiple': (x, y) => {
    return x * y
  },
  'Operator.Increment': (x) => {
    return +x + 1
  },
  'Operator.Decrement': (x) => {
    return +x - 1
  },
  'Operator.UnaryPlus': (x) => {
    return +x
  },
  'Operator.UnaryMinus': (x) => {
    return -x
  },
}
