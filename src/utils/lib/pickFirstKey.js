
export default (obj) => {
  const keys = Object.keys(obj)

  return keys.length ?
    obj[keys[0]] :
    null
}
