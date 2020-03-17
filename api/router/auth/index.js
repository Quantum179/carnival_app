import express from 'express'
let router = express.Router()

import {postLogin, postRegister} from './handlers'

router.post('/login', postLogin)
router.post('/register', postRegister)

export default router