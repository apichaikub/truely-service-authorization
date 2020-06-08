import { models } from '../models'
import { postgreOAuth2DB } from '../database'

export default (req, res, next) => {
  postgreOAuth2DB.authenticate().then(() => {
    req.models = models
    next()
  }).catch((err) => {
    res.status(503).fail(err)
  })
}
