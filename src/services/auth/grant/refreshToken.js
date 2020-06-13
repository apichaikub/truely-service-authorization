import { Op } from 'sequelize'
import dayjs from 'dayjs'
import { ResponseError } from '../../../utils/extend'
import { createAccessToken, createRefreshToken } from '../../../helper/auth'
import { decrypt } from '../../../helper/crypto'
import { TOKEN_TYPE } from '../../../helper/enum'
import config from '../../../config'

/*
 * Refreshing an Access Token
 * see: https://tools.ietf.org/html/rfc6749#section-6
 * Work flow:
 * - check refresh token is invalid
 * - if not valid throw an error
 * - if valid response new access token (JWT) and refresh token
 * @param {Object} input client request data, or `body` in `express`
 * @param {String} input.refresh_token
 * @param {Object} models
 * @return {Object} Response
 */
export default async (input, models) => {
  const { User, OAuthRefreshToken } = models

  let decryptedMsg = null

  try {
    decryptedMsg = await decrypt(input.refresh_token)
  } catch (err) {
    throw new ResponseError({
      code: 400,
      message: 'Refresh token is invalid.',
    })
  }

  const refreshTokenRow = await OAuthRefreshToken.findOne({
    where: {
      rfId: decryptedMsg,
      expiresIn: {
        [Op.gte]: dayjs(),
      },
      deletedAt: null,
    },
  })

  if (!refreshTokenRow) {
    throw new ResponseError({
      code: 400,
      message: 'Refresh token is invalid.',
    })
  }

  const user = await User.findOne({
    where: {
      userId: refreshTokenRow.userId,
    },
  })

  if (!user) {
    throw new ResponseError({
      code: 500,
      message: 'Not found a user.',
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
