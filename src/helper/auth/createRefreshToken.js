import { Op } from 'sequelize'
import dayjs from 'dayjs'
import config from '../../config'
import { encrypt } from '../../helper/crypto'

export default async (user, models) => {
  const { OAuthRefreshToken } = models
  // create new refresh token
  const rfId = await OAuthRefreshToken.createGetId({
    userId: user.userId,
    expiresIn: dayjs().add(config.expiresIn.refreshToken, 'second'),
  })

  // destroy old refresh tokens except new one
  await OAuthRefreshToken.update({
    deletedAt: dayjs(),
  }, {
    where: {
      userId: user.userId,
      rfId: {
        [Op.not]: rfId,
      },
    },
  })

  return encrypt(rfId)
}
