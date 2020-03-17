import express from 'express'
import { getVotes, postVote } from './handlers'
import { authGuard } from '../../passport'

let router = express.Router()
 
//public routes
router.get('/', getVotes)

//private routes
router.post('/', authGuard(), postVote)

export default router