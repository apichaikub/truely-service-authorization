import { ResponseError } from '../../../utils/extend'
import { createAccessToken, createRefreshToken } from '../../../helper/auth'
import { TOKEN_TYPE } from '../../../helper/enum'
import config from '../../../config'

/*
 * Resource Owner Password Credentials Grant
 * see: https://tools.ietf.org/html/rfc6749#section-4.3
 * Work flow:
 * - check username and password is correct or not.
 * - if not correct throw an error.
 * - if correct response access token (JWT).
 * @param {Object} input client request data, or `body` in `express`
 * @param {String} input.username
 * @param {String} input.password
 * @param {Object} models
 * @return {Object} Response
 */
export default async (input, models) => {
  const { User } = models

  const user = await User.findOne({
    where: {
      username: input.username,
    },
  })

  if (!user) {
    throw new ResponseError({
      code: 403,
      message: 'The username or password is invalid.',
    })
  }

  const isValid = await user.validPassword(input.password)

  if (!isValid) {
    throw new ResponseError({
      code: 403,
      message: 'The username or password is invalid.',
    })
  }

  const [accessToken, refreshToken] = await Promise.all([
    createAccessToken(user),
    createRefreshToken(user, models),
  ])

  return {
    accessToken,
    tokenType: TOKEN_TYPE.ENUM.BEARER,
    expiresIn: config.expiresIn.accessToken,
    refreshToken,
  }
}
