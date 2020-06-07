import { TOKEN } from '../helper/enum'
import { verifyToken } from '../helper/auth'

export default async (req, res, next) => {
  const { ACCESS_TOKEN } = TOKEN.ENUM

  // access token did not provided
  if (!req.headers[ACCESS_TOKEN]) {
    return res.status(412).fail(`${ACCESS_TOKEN} must be provide in header`)
  }

  const [error] = verifyToken(req.headers[ACCESS_TOKEN])

  if (error) {
    res.status(401).fail('Invalid tokens')
  } else {
    next()
  }
}
