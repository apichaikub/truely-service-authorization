import attributes from './attributes'
import options from './options'

export default (sequelize) => {
  const OAuthRefreshToken = sequelize.define('oauthrefreshtoken', attributes, options)

  OAuthRefreshToken.associate = ({ User }) => {
    OAuthRefreshToken.belongsTo(User, {
      foreignKey: {
        name: 'userId',
        allowNull: false,
      },
    })
  }

  return OAuthRefreshToken
}
