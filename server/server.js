import express from 'express'
import session from 'express-session'
import logger from 'morgan'
import apiRouter from './routes/routes.js'
import config from './server.config.js'
import mariadbStore from './mariadb-store.js'

const app = express()
mariadbStore.init(config.mariaDB)

app.use(logger('dev'))
app.use(session({
  secret: config.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/', apiRouter)

export default app
