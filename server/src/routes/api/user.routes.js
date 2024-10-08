import express from 'express'
import userModel from '../../models/user.model.js'
import validator from '../../middlewares/validator.middleware.js'
import userService from '../../services/user.service.js'
import tokenMiddleware from '../../middlewares/auth.middleware.js'
import { body } from 'express-validator'


const router = express.Router()


router.post(
    '/signup',
    body('username')
        .exists()
        .withMessage("Потрібне ім'я")
        .isLength({ min: 8 })
        .withMessage("Ім'я користувача має мати принаймі 8 символів")
        .custom(async user => {
            const getuser = await userModel.findOne({ username: user })
            if (getuser) return Promise.reject("Ім'я користувача вже зайняте")
        }),
    body('password')
        .exists()
        .withMessage("Потрібен пароль")
        .isLength({ min: 8 })
        .withMessage("Пароль користувача має мати принаймі 8 символів"),
    body('confirmPassword')
        .exists()
        .withMessage("Потрібне підтвердження паролю.")
        .isLength({ min: 8 })
        .withMessage("Підтверджений пароль має мати принаймі 8 символів")
        .custom((value, { req }) => {
            if (value !== req.body.password) throw new Error("Підтврдження паролю не пройшло, перевірте його будь ласка.")
            return true
        })
    ,
    validator,
    userService.userSignUp.bind(userService)

)

router.post(
    '/signin',
    body('username')
        .exists()
        .withMessage("Потрібне ім'я"),
    body('password')
        .exists()
        .withMessage("Потрібен пароль"),
    validator,
    userService.userSignIn.bind(userService)
)

router.get(
    '/information',
    tokenMiddleware.authMiddleware,
    userService.getUserInformation.bind(userService)

)

router.get(
    '/rating',
    tokenMiddleware.authMiddleware,
    userService.getUserRanking.bind(userService)
)

router.put(
    '/update-password',
    tokenMiddleware.authMiddleware,
    body('password')
        .exists()
        .withMessage("Потрібен пароль"),
    body('newPassword')
        .exists()
        .withMessage("Потрібен новий пароль пароль"),
    body('confirmNewPassword')
        .exists()
        .withMessage("Потрібен пароль")
        .custom((value, { req }) => {
            if (value !== req.body.newPassword) throw new Error('confirmNewPassword not match')
            return true
        }),
    validator,
    userService.updateUserPassword.bind(userService),

)

router.put(
    '/update-username',
    tokenMiddleware.authMiddleware,
    body('newUserName')
        .exists()
        .withMessage("Потрібно вказати нове імя користувача"),
    validator,
    userService.updateUserName.bind(userService)
)

export default router

