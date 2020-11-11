import { Router } from 'express'
import getUsers from '../controllers/user/get/get.users.js'
import getUser from '../controllers/user/get/get.user.js'
import postUser from '../controllers/user/post/post.user.js'
// import putUser from '../controllers/put.user.js'
import deleteUser from '../controllers/user/delete/delete.user.js'
const router = Router()

router.get('/', getUsers)
router.get('/:id', getUser)
router.post('/', postUser)
// router.put('/user/:userId', putUser)
router.delete('/', deleteUser)

export default router
