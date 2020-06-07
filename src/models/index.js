import { postgresdb } from '../database'
import { createGetId } from '../helper/model'

// import all models here
// can be use with multiple databases
const models = {
  User: postgresdb.import('../models/user'),
  OAuthRefreshToken: postgresdb.import('../models/oauthrefreshtoken'),
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

postgresdb.sync({ force: false }).then(() => {
  console.log('service authorization sync postgresdb success.')
})

export {
  postgresdb,
  models,
}

