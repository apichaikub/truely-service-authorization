import { postgreOAuth2DB, postgreUserDB } from '../database'
import { createGetId } from '../helper/model'

// import all models here
// can be use with multiple databases
const models = {
  User: postgreUserDB.import('../models/user'),
  OAuthRefreshToken: postgreOAuth2DB.import('../models/oauthrefreshtoken'),
}

// set association to the models that was declared
// such as: hasMeny, belongsTo or ect.
Object.keys(models).forEach((key) => {
  const model = models[key]

  if ('associate' in model) {
    model.associate(models)
  }

  model.createGetId = (values, options = {}) => createGetId(model, values, options)
})

export {
  models,
}

