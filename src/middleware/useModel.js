import { models } from '../models'
import { postgresdb } from '../database'

export default (req, res, next) => {
  postgresdb.authenticate().then(() => {
    req.models = models
    next()
  }).catch((err) => {
    res.status(503).fail(err)
  })
}
