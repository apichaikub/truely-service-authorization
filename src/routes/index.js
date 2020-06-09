import express from 'express'
import register from './register'
import auth from './auth'

const router = express.Router()

router.get('/', (req, res) => res.send('Service Authorization_'))
router.use('/register', register)
router.use('/oauth2', auth)

export default router
