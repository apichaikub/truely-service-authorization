export default {
  // set port for the server. use `src/server.js`.
  'port': process.env.PORT,

  // environment development, production
  'environment': process.env.NODE_ENV,

  // use `sequelize` to connect multiple databases `src/config/database.js`.
  'databases': {
    'postgres': {
      'account': process.env.DATABASE_POSTGRE_ACCOUNT,
    },
  },

  'crypto': {
    'secret': 'GjqmaVNTsgN61Zl3QPq8',
    'algorithm': 'aes-128-cbc',
    'bytes': 16,
    'encode': 'hex',
  },

  'jwt': {
    'secret': 'EdAz6U6SjUu3PY3KCEOL',
  },

  'expiresIn': {
    'accessToken': 60 * 15, // 15 minutes
    'refreshToken': 60 * 60 * 24 * 7, // 7 days
  },
}
