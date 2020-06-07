import { validator, getErrMsg } from '../helper/validator'
import { authRoles, userRoles } from '../helper/validator/roles'
import { GRANT_TYPE } from '../helper/enum'

const validatorRegister = (req, res, next) => {
  validator(req.body, userRoles.register, (err) => {
    if (!!err) {
      res.status(400).fail(getErrMsg(err))
    } else {
      next()
    }
  })
}

const validatorAuthGrantType = (req, res, next) => {
  validator(req.body, authRoles.grantType, (err) => {
    if (!!err) {
      res.status(400).fail(getErrMsg(err))
    } else {
      next()
    }
  })
}

const validatorAuthToken = (req, res, next) => {
  const { PASSWORD, REFRESH_TOKEN } = GRANT_TYPE.ENUM
  let roles = null

  switch (req.body.grant_type) {
    case PASSWORD:
      roles = authRoles.token
      break
    case REFRESH_TOKEN:
      roles = authRoles.refresh
      break
  }

  validator(req.body, roles, (err) => {
    if (!!err) {
      res.status(400).fail(getErrMsg(err))
    } else {
      next()
    }
  })
}

export {
  validatorRegister,
  validatorAuthGrantType,
  validatorAuthToken,
}
