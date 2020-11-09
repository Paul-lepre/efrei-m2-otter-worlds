import { Router } from 'express'
import getUsers from '../controllers/user/get/get.users.js'
import getUser from '../controllers/user/get/get.user.js'
// import postUser from '../controllers/post.user.js'
// import putUser from '../controllers/put.user.js'
// import deleteUser from '../controllers/delete.user.js'
const router = Router()

router.get('/', getUsers)
router.get('/:id', getUser)
// router.post('/user', postUser)
// router.put('/user/:userId', putUser)
// router.delete('/user/:userId', deleteUser)

export default router
