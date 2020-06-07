import express from 'express'
import router from './routes'
import config from './config'
import bodyParser from 'body-parser'
import { postgresdb } from './models'
import responseFormat from './middleware/responseFormat'
import useModels from './middleware/useModel'

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

// connect to postgres db
postgresdb.authenticate().then(() => {
  console.log('postgres is connected.')
})

app.listen(config.port, () => {
  console.log(`Running on port: ${config.port}`)
})
