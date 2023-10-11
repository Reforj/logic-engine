import Library from '../stores/Library'

// const add = (x, y) => x + y
Library.register({ scope: 'Math', name: 'add' }, (x, y) => x + y)

export default {
  add (x, y) {
    return x + y
  },
  sub (x, y) {
    return x - y
  },
  mul (x, y) {
    return x * y
  },
  div (x, y) {
    return x / y
  },
  abs (x) {
    return Math.abs(x)
  },
}
