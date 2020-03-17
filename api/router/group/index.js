import express from 'express'
import { getGroups, getGroup, updateGroupPosition } from './handlers'

let router = express.Router()
 
//public routes
router.get('/', getGroups)
router.get('/:id', getGroup)
router.patch('/:id', updateGroupPosition)

export default router