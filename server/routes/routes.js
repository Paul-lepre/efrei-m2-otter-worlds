import { Router } from 'express'
import universeRouter from './universe.js' // after the import from express
const apiRouter = Router()

const apiRoute = '/api/v1/'
const baseAPI = (req) => {
  return req.protocol + '://' + req.get('host') + apiRoute
}

apiRouter.use('/universes', universeRouter) // before the export default

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
