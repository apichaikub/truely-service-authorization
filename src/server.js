import express from 'express'
import router from './routes'
import config from './config'
import bodyParser from 'body-parser'
import { models } from './models'
import { postgreOAuth2DB, postgreUserDB } from './database'
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

// sync to postgre
postgreOAuth2DB.sync({ force: true }).then(() => {
  console.log('sync to postgreOAuth2DB')
})

postgreUserDB.sync({ force: true }).then(() => {
  faker(models)
  console.log('sync to postgreUserDB')
})

app.listen(config.port, () => {
  console.log(`running on port: ${config.port}`)
})
