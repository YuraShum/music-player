import jsonwebtoken from 'jsonwebtoken'
import responseHendlers from '../handlers/response.js'
import userModel from '../models/user.model.js'


const tokenDecode = (request) => {
    try {
        const bearerHeder = request.headers["authorization"]

        if (bearerHeder) {
            const token = bearerHeder.split(" ")[1]
            return jsonwebtoken.verify(token, process.env.JWT_SECRET_TOKEN)
        }
        return false
    } catch {
        return false
    }
}

const authMiddleware = async (request, response, next) => {
    const tokDecode = tokenDecode(request)

    if (!tokDecode) responseHendlers.unautorize(response)

    const user = await userModel.findById(tokDecode.data)

    if(!user) responseHendlers.unautorize(response)

    request.user = user

    next()
}

export default {tokenDecode, authMiddleware}