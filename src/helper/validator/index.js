// use validatorjs to handle this
// see more info or documentation: https://www.npmjs.com/package/validatorjs
import ValidatorJs from 'validatorjs'

const validator = (input, rules, cb) => {
  const v = new ValidatorJs(input, rules)
  v.passes(() => cb(null))
  v.fails(() => cb(v.errors))
}

const getErrMsg = ({ errors }) => {
  if (!Object.keys(errors).length) {
    return null
  }

  return Object.keys(errors).reduce((msgs, key) => {
    errors[key].forEach((msg) => {
      msgs.push(msg.replace('.', ''))
    })
    return msgs
  }, []).join(', ')
}

export {
  validator,
  getErrMsg,
}
