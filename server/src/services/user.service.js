import responseHendlers from "../handlers/response.js"
import userModel from "../models/user.model.js"
import { generateToken } from "../utils/utils.js"


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

    async getUserRanking(request, response) {
        try {
            const users = await userModel.find()
                .select('username songs')
                .lean();

            const sortedUsers = users.sort((a, b) => b.songs.length - a.songs.length);

            const userId = request.user.id;
            const userRank = sortedUsers.findIndex(user => user._id.toString() === userId) + 1;

            if (userRank === 0) {
                return responseHendlers.notFound(response, "Користувача не знайдено в рейтингу.");
            }

            responseHendlers.ok(response, { rank: userRank, totalUsers: sortedUsers.length });
        } catch (error) {
            return responseHendlers.error(response);
        }
    }

    async updateUserName(request, response) {
        try {
            const userId = request.user.id;
            const { newUserName } = request.body
            const user = await userModel.findById(userId)

            if (!user) {
                return responseHendlers.unautorize(response)
            }

            user.username = newUserName
            await user.save()
            responseHendlers.ok(response)
        } catch (error) {
            return responseHendlers.error(response)
        }
    }

    async updateUserPassword(request, response){
        console.log(request.body.password, request.body.newPassword)
        try {
            const userId = request.user.id
            const {password, newPassword} = request.body
        
            const user = await userModel.findById(userId).select('id password salt')
            console.log(userId)

            if (!user) {
                return responseHendlers.unautorize(response)
            }
            if(!user.validPassword(password)){
                return responseHendlers.badRequest(response, 'Вказано неправильний пароль користувача.')
            }

            user.setPassword(newPassword)

            await user.save()
            responseHendlers.ok(response)

        } catch (error) {
            return responseHendlers.error(response)
        }
    }
}


export default new UserService();