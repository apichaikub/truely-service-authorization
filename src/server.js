import express from 'express'
import router from './routes'
import config from './config'
import bodyParser from 'body-parser'
import { models } from './models'
import { postgreOAuth2DB } from './database'
import responseFormat from './middleware/responseFormat'
import useModels from './middleware/useModel'
import faker from './helper/faker/'

const app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// custom response in express
app.use(responseFormat)

// Use models from the req.models
app.use(useModels)

// Restful APIs
app.use(router)

// sync to postgreOAuth2DB db
postgreOAuth2DB.sync({ force: true }).then(() => {
  faker(models)
  console.log('authorization service sync to postgreOAuth2DB success.')
})

app.listen(config.port, () => {
  console.log(`Running on port: ${config.port}`)
})
