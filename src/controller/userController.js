import { userService } from '../services'

/**
 * userController use for authorization
 */
class userController {
  /**
   * @param {*} req
   * @param {Object} req.body
   * @param {String} req.body.username
   * @param {String} req.body.password encryption password as string
   * @param {*} res
   */
  async register(req, res) {
    try {
      const input = req.body
      const models = req.models
      const data = await userService.register(input, models)

      res.success(data)
    } catch (error) {
      res.status(error.code || 500).fail(error.message)
    }
  }
}

export default new userController()
