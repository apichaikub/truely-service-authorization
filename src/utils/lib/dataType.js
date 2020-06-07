const isNull = (value) => {
  return value === null
}

const isString = (value) => {
  return typeof value === 'string'
}

const isArray = (value) => {
  return Array.isArray(value)
}

const isObject = (value) => {
  if (typeof value !== 'object' || isArray(value) || isNull(value)) {
    return false
  }
  return true
}

export {
  isNull,
  isString,
  isArray,
  isObject,
}
