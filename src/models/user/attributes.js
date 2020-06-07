import { DataTypes } from 'sequelize'
import { USER_ROLE } from '../../helper/enum'

export default {
  userId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [4, 100],
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [6, 48],
    },
  },
  role: {
    type: DataTypes.ENUM({
      values: USER_ROLE.values,
    }),
    defaultValue: null,
  },
}
