import attributes from './attributes'
import options from './options'

export default (sequelize) => {
  const OAuthRefreshToken = sequelize.define('oauthrefreshtoken', attributes, options)
  return OAuthRefreshToken
}
