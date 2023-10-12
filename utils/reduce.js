import _ from 'lodash'

export const reduce = (data, cb, initial = {}) => _.reduce(data, cb, initial)

export const reduceUuid = (data, cb) => _.reduce(data, (obj, item, i) => ({ ...obj, [item.uuid]: cb(item, i) }), {})
