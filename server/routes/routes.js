import { Router } from 'express'
import universeRouter from './universe.js' // after the import from express
const router = Router()
const baseAPI = 'http://localhost:3000/api/'

router.use('/universes', universeRouter) // before the export default

router.get('/', (req, res) => {
  res.json({
    _links: {
      articles: `${baseAPI}articles`,
      characters: `${baseAPI}characters`,
      universes: `${baseAPI}universes`,
      users: `${baseAPI}users`
    }
  })
})

export default router
