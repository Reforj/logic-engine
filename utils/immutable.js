import get from 'lodash/get'
import set from 'lodash/fp/set'

export { default as merge } from 'lodash/fp/merge'

export const getIn = get
export const setIn = (object, path, value) => set(path, value, object)
export const updateIn = (object, path, callback) => setIn(object, path, callback(getIn(object, path)))

export const insert = (arr, index, item) => [...arr.slice(0, index), item, ...arr.slice(index)]
