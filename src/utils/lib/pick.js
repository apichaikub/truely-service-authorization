import { isObject, isString, isArray } from './dataType'

// pick keys from object
export default (obj, keys) => {
  if (!isObject(obj) || !isString(keys) && !isArray(keys)) {
    return {}
  }

  if (isString(keys)) {
    return {
      [keys]: obj[keys],
    }
  }

  return keys.reduce((result, key) => {
    if (obj.hasOwnProperty(key)) {
      result[key] = obj[key]
    }
    return result
  }, {})
}
