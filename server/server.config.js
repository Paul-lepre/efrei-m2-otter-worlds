let existingConf
try {
  existingConf = require('./local.server.config.js')
} catch (err) {
  existingConf = {}
}

function e (param) {
  return process.env[param] || existingConf[param] || ''
}
export default {
  SESSION_SECRET: e('SESSION_SECRET'),
  MARIADB: {
    host: e('MARIADB_HOST'),
    database: e('MARIADB_DB'),
    user: e('MARIADB_USER'),
    password: e('MARIADB_PASSWORD')
  }
}
