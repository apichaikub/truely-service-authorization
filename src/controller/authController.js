import { authService } from '../services'
import { GRANT_TYPE } from '../helper/enum'

/**
 * Following The OAuth 2.0 Authorization Framework.
 * see: https://tools.ietf.org/html/rfc6749
 */
class userController {
  /**
   * Obtaining Authorization
   * @param {*} req
   * @param {Object} req.body
   * @param {String} req.body.username
   * @param {String} req.body.password encryption password as string
   * @param {*} res
   */
  async token(req, res) {
    try {
      const { body, models } = req
      const { PASSWORD, REFRESH_TOKEN } = GRANT_TYPE.ENUM
      let data = null

      if (body.grant_type === PASSWORD) {
        // Resource Owner Password Credentials Grant
        // see: https://tools.ietf.org/html/rfc6749#section-4.3
        data = await authService.grant.password(body, models)
      } else if (body.grant_type === REFRESH_TOKEN) {
        // Refreshing an Access Token
        // see: https://tools.ietf.org/html/rfc6749#section-6
        data = await authService.grant.refreshToken(body, models)
      }

      res.success(data)
    } catch (error) {
      res.status(error.code || 500).fail(error.message)
    }
  }

  /**
   * @param {*} req
   * @param {*} res
   */
  verify(req, res) {
    try {
      res.status(204).success()
    } catch (error) {
      res.status(error.code || 500).fail(error.message)
    }
  }
}

export default new userController()
