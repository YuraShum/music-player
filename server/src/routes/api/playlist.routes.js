import express from 'express'
import tokenMidleware from '../../middlewares/auth.middleware.js'
import validator from '../../middlewares/validator.middleware.js'
import playlistService from '../../services/playlist.service.js'
import { body } from 'express-validator'


const router = express.Router()


router.post(
    '/playlist',
    tokenMidleware.authMiddleware,
    body('name')
        .exists()
        .withMessage("Назва плейлиста обов'язкова"),
    body('description')
        .exists()
        .withMessage("Опис плейлиста обов'язковий"),
    validator,
    playlistService.createPlayList.bind(playlistService)
)

router.get(
    '/playlists',
    tokenMidleware.authMiddleware,
    playlistService.getUserPlayLists.bind(playlistService)
)

router.post(
    '/playlist/songs',
    tokenMidleware.authMiddleware,
    body('playlistId')
        .exists()
        .withMessage("Необхідний ідентифікатор плейлисту."),
    body('songIds')
        .exists()
        .withMessage("Необхідний ідентифікатор пісні."),
    validator,
    playlistService.addSongToPlaylist.bind(playlistService)
)

router.delete(
    '/playlist',
    tokenMidleware.authMiddleware,
    body('playlistId')
        .exists()
        .withMessage("Необхідний ідентифікатор плейлисту."),
    validator,
    playlistService.deletePlaylist.bind(playlistService)
)

router.delete(
    '/playlist/song',
    tokenMidleware.authMiddleware,
    body('playlistId')
        .exists()
        .withMessage("Необхідний ідентифікатор плейлисту."),
    body('songId')
        .exists()
        .withMessage("Необхідний ідентифікатор пісні."),
        validator,
        playlistService.deleteSongFromPlaylist.bind(playlistService)
)

export default router