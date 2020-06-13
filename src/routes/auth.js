import express from 'express'
import { validatorAuthGrantType, validatorAuthToken } from '../middleware/validation'
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

export default router
