import express from 'express'
import userRouter from './api/user.routes.js'
import songRouter from './api/song.routes.js'
import playlistRouter from './api/playlist.routes.js'

const router = express.Router()

router.use('/user', userRouter)
router.use('/music', songRouter)
router.use('/collections', playlistRouter)

export default router