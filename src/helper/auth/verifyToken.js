import jwt from 'jsonwebtoken'
import config from '../../config'

// @param {String} token : access token or refresh token
export default (token) => {
  const { jwt: { secret } } = config
  try {
    const decoded = jwt.verify(token, secret)
    return [null, decoded]
  } catch (error) {
    return [error, null]
  }
}
