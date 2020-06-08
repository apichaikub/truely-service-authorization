import users from './users'

export default async ({ User }) => {
  try {
    for (const user of users) {
      await User.create(user)
    }
  } catch (err) {
    throw new Error(err)
  }
}
