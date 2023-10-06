import _ from 'lodash'

export const reduce = (data, cb, initial = {}) => {
  return _.reduce(data, cb, initial)
}

export const reduceUuid = (data, cb) => {
  return _.reduce(data, (obj, item, i) => {
    return { ...obj, [item.uuid]: cb(item, i) }
  }, {})
}
