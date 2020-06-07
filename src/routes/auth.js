import express from 'express'
import { validatorAuthGrantType, validatorAuthToken } from '../middleware/validation'
import checkTokenExpire from '../middleware/checkTokenExpire'
import authController from '../controller/authController'

const router = express.Router()

router.post('/token',
    (req, res, next) => {
      res.opeationName = 'postOAuthToken'
      next()
    },
    validatorAuthGrantType,
    validatorAuthToken,
    authController.token,
)

router.post('/verify',
    (req, res, next) => {
      res.opeationName = 'postVerifyAuth'
      next()
    },
    checkTokenExpire,
    authController.verify,
)

export default router
