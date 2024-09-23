import express from 'express'
import tokenMidleware from '../../middlewares/auth.middleware.js'
import validator from '../../middlewares/validator.middleware.js'
import favoriteService from '../../services/favorite.service.js'
import { body } from 'express-validator'

const router = express.Router()


router.post(
    '/favorite',
    tokenMidleware.authMiddleware,
    body('songId')
        .exists()
        .withMessage("Ідентифікатор пісні обов'язковий."),
    validator,
    favoriteService.addToFavorites.bind(favoriteService)
)

router.delete(
    '/favorite',
    tokenMidleware.authMiddleware,
    body('songId')
        .exists()
        .withMessage("Ідентифікатор пісні обов'язковий."),
    validator,
    favoriteService.removeFromFavorites.bind(favoriteService)
)

router.get(
    '/favorite',
    tokenMidleware.authMiddleware,
    favoriteService.getAllUserFavoritesSongs.bind(favoriteService)
)

router.get(
    '/check-favorites/:songId',
    tokenMidleware.authMiddleware,
    favoriteService.isSongIsFavorites.bind(favoriteService)
)

export default router