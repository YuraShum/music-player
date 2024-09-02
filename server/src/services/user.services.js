import responseHendlers from "../handlers/response"
import userModel from "../models/user.model"
import { generateToken } from "../utils/utils"


class UserService {


    async userSignUp(request, response) {
        try {
            const { username, password } = request.body

            const checkUser = await userModel.findOne({ username })

            if (checkUser) {
                return responseHendlers.badRequest(response, `Нажаль дане ім'я (${username}) вже зайняте.`)
            }

            const user = new userModel({
                username,
                songs: [],
                playlists: []
            });

            user.setPassword(password);

            await user.save()
            const genToken = generateToken(user.id)

            responseHendlers.created(
                response,
                {
                    genToken,
                    ...user._doc,
                    id: user.id
                })
        } catch {
            responseHendlers.error(response)
        }
    }

    async userSignIn(request, response) {
        try {
            const { username, password } = request.body

            const user = await userModel.findOne({ username })
                .select('username id password salt songs playlists')

            if (!user) responseHendlers.badRequest(response, `Користувача із вказаним ім'ям ${username} неіснує`)


            if (!user.validPassword(password)) responseHendlers.badRequest(response, `Вказано неправильний пароль користувача`)


            const genToken = generateToken(user.id)
            user.password = undefined
            user.salt = undefined

            responseHendlers.created(
                response,
                {
                    genToken,
                    ...user._doc,
                    id: user.id
                }
            )

        } catch {
            responseHendlers.error(response)
        }
    }

    async getUserInformation(request, response) {

        try {
            const userId = request.user.id
            const user = await userModel.findById(userId)
                .populate('songs')
                .populate('playlists')
                .select('-password -salt')

            if (!user) responseHendlers.notFound(response, "Користувача не знайдено.")
            responseHendlers.ok(response, user)
        } catch (error) {
            return responseHendlers.error(response)
        }


    }
}


export default new UserService();