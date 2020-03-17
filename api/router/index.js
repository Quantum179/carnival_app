import express from 'express'

import authRouter from './auth'
import paradeRouter from './parade'
import groupRouter from './group'
import voteRouter from './vote'

let router = express.Router()

router.use('/auth', authRouter)
router.use('/parades', paradeRouter)
router.use('/groups', groupRouter)
router.use('/votes', voteRouter)

export default router