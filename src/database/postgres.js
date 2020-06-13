import Sequelize from 'sequelize'
import config from '../config/'

// connect to progres
const postgreOAuth2DB = new Sequelize(config.databases.postgres.oauth2, {
  dialect: 'postgres',
})

const postgreUserDB = new Sequelize(config.databases.postgres.account, {
  dialect: 'postgres',
})

export {
  postgreOAuth2DB,
  postgreUserDB,
}
