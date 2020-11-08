import { Router } from 'express'
import getUniverses from '../controllers/universe/get/get.universes.js'
import getUniverse from '../controllers/universe/get/get.universe.js'
// import postUniverse from '../controllers/post.universe.js'
// import putUniverse from '../controllers/put.universe.js'
// import deleteUniverse from '../controllers/delete.universe.js'
const router = Router()

router.get('/', getUniverses)
router.get('/:id', getUniverse)
// router.post('/universe', postUniverse)
// router.put('/universe/:universeId', putUniverse)
// router.delete('/universe/:universeId', deleteUniverse)

export default router
