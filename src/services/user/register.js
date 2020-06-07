import { ResponseError } from '../../utils/extend'

/*
 * Work flow:
 * - check username is already exist in database.
 * - if already exist throw an error.
 * - if not already exist insert new user.
 * @param {Object} input client request data, or `body` in `express`
 * @param {String} input.username
 * @param {String} input.password
 * @return {Object} Response user id
 */
export default async (input, models) => {
  const { User } = models

  const usernameCount = await User.count({
    where: {
      username: input.username,
    },
  })

  if (usernameCount > 0) {
    throw new ResponseError({
      code: 409,
      message: 'This username has already exist.',
    })
  }

  const user = await User.create({
    username: input.username,
    password: input.password,
    role: input.role,
  })

  return {
    userId: user.userId,
  }
}
