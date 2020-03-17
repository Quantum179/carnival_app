import express from 'express'
import { getParades, getParade } from './handlers'

let router = express.Router()
 
//public routes
router.get('/', getParades)
router.get('/:id', getParade)

export default router