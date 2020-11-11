import { Router } from 'express'
import getUniverses from '../controllers/universe/get/get.universes.js'
import getUniverse from '../controllers/universe/get/get.universe.js'
import postUniverse from '../controllers/universe/post/post.universe.js'
// import putUniverse from '../controllers/put.universe.js'
// import deleteUniverse from '../controllers/delete.universe.js'
const router = Router()

// Get
router.get('/', getUniverses)
router.get('/:id', getUniverse)

// Post
router.post('/', postUniverse)

// Put
// router.put('/:id', putUniverse)

// Delete
// router.delete('/:id', deleteUniverse)

export default router
