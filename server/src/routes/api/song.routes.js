import express from 'express'
import tokenMidleware from '../../middlewares/auth.middleware.js'
import upload from '../../middlewares/upload.middleware.js'
import { body } from 'express-validator'
import validator from '../../middlewares/validator.middleware.js'
import songService from '../../services/song.service.js'


const router = express.Router()


router.post(
    '/song',
    tokenMidleware.authMiddleware,
    upload.fields([{ name: 'mp3', maxCount: 1 }, { name: 'cover', maxCount: 1 }]),
    body('title')
        .exists()
        .withMessage("Потрібна назва пісні."),
    body('artist')
        .exists()
        .withMessage("Потрібно вказати автора пісні."),
    validator,
    songService.addSong.bind(songService)
)

router.get(
    '/songs',
    tokenMidleware.authMiddleware,
    songService.getUserSongs.bind(songService)
)

router.delete(
    '/song',
    tokenMidleware.authMiddleware,
    body('songId')
        .exists()
        .withMessage("Необхідний ID пісні для видалення"),
    validator,
    songService.deleteSong.bind(songService)
)

export default router