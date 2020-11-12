import { Router } from 'express'
import getCharacters from '../controllers/character/get.characters.js'
import getCharacter from '../controllers/character/get.character.js'
import postCharacter from '../controllers/character/post.character.js'
import putCharacter from '../controllers/character/put.character.js'
import deleteCharacter from '../controllers/character/delete.character.js'
const router = Router()

// Get
router.get('/', getCharacters)
router.get('/:id', getCharacter)

// Post
router.post('/', postCharacter)

// Put
router.put('/:id', putCharacter)

// Delete
router.delete('/:id', deleteCharacter)

export default router
