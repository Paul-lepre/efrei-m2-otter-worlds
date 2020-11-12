import { Router } from 'express'
import userRouter from './user.js' // after the import from express
import universeRouter from './universe.js'
import characterRouter from './character.js'
// import inventoryRouter from './inventory.js'
// import templateCategoryRouter from './templateCategory.js'
// import templateStatRouter from './templateStat.js'
// import statRouter from './stat.js'
const apiRouter = Router()

const apiRoute = '/api/v1/'
const baseAPI = (req) => {
  return req.protocol + '://' + req.get('host') + apiRoute
}

apiRouter.use('/users', userRouter) // before the export default
apiRouter.use('/universes', universeRouter)
apiRouter.use('/characters', characterRouter)
// apiRouter.use('/inventories', inventoryRouter)
// apiRouter.use('/template-categories', templateCategoryRouter)
// apiRouter.use('/template-stats', templateStatRouter)
// apiRouter.use('/stats', statRouter)

apiRouter.get('/', (req, res) => {
  res.json({
    _links: {
      articles: `${baseAPI(req)}articles`,
      characters: `${baseAPI(req)}characters`,
      inventories: `${baseAPI(req)}inventories`,
      stats: `${baseAPI(req)}stats`,
      'template-categories': `${baseAPI(req)}template-categories`,
      'template-stats': `${baseAPI(req)}template-stats`,
      universes: `${baseAPI(req)}universes`,
      users: `${baseAPI(req)}users`
    }
  })
})

export { apiRouter, apiRoute, baseAPI }
