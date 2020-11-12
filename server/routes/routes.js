import { Router } from 'express'
import userRouter from './user.js' // after the import from express
import universeRouter from './universe.js'
const apiRouter = Router()

const apiRoute = '/api/v1/'
const baseAPI = (req) => {
  return req.protocol + '://' + req.get('host') + apiRoute
}

apiRouter.use('/users', userRouter) // before the export default
apiRouter.use('/universes', universeRouter)

apiRouter.get('/', (req, res) => {
  res.json({
    _links: {
      articles: `${baseAPI(req)}articles`,
      characters: `${baseAPI(req)}characters`,
      universes: `${baseAPI(req)}universes`,
      users: `${baseAPI(req)}users`
    }
  })
})

export { apiRouter, apiRoute, baseAPI }
