export default {
  'Array.Push': (arr, item) => {
    return arr.push(item) - 1
  },
  'Array.iPush': (arr, item) => {
    return [...arr, item]
  },
  'Array.IndexOf': (arr, item) => {
    return arr.indexOf(item)
  },
  'Array.remove': (arr, item) => {
    const i = arr.indexOf(item)
    return arr.splice(i, 1)
  },
  'Array.iRemove': (arr, item) => {
    return arr.filter((a) => a !== item)
  },
  'Array.iRemoveAt': (arr, index) => {
    return arr.filter((a, i) => i !== index)
  },

}
