import express from 'express'
import { validatorRegister } from '../middleware/validation'
import UserController from '../controller/userController'

const router = express.Router()

router.post('/',
    (req, res, next) => {
      res.opeationName = 'postRegister'
      next()
    },
    validatorRegister,
    UserController.register,
)

export default router
