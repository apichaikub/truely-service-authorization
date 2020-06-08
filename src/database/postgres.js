import Sequelize from 'sequelize'
import config from '../config/'

// connect to progres
const postgreOAuth2DB = new Sequelize(config.databases.postgres.uri, {
  dialect: 'postgres',
})

export {
  postgreOAuth2DB,
}
