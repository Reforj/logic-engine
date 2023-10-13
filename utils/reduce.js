import _reduce from 'lodash/reduce'

export const reduce = (data, cb, initial = {}) => _reduce(data, cb, initial)

export const reduceUuid = (data, cb) => _reduce(data, (obj, item, i) => ({ ...obj, [item.uuid]: cb(item, i) }), {})
