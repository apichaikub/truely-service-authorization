import jwt from 'jsonwebtoken'
import config from '../../config'

export default (user) => {
  return jwt.sign(
      { id: user.userId, role: user.role },
      config.jwt.secret,
      { expiresIn: config.expiresIn.accessToken },
  )
}
