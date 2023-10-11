export default {
  'Array.Push': (arr, item) => arr.push(item) - 1,
  'Array.iPush': (arr, item) => [...arr, item],
  'Array.IndexOf': (arr, item) => arr.indexOf(item),
  'Array.remove': (arr, item) => {
    const i = arr.indexOf(item)
    return arr.splice(i, 1)
  },
  'Array.iRemove': (arr, item) => arr.filter((a) => a !== item),
  'Array.iRemoveAt': (arr, index) => arr.filter((a, i) => i !== index),

}
