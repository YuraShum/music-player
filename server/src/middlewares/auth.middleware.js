import jsonwebtoken from 'jsonwebtoken'
import responseHendlers from '../handlers/response'
import userModel from '../models/user.model'


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
    const tokenDecode = tokenDecode(request)

    if (!tokenDecode) responseHendlers.unautorize(response)

    const user = await userModel.findById(tokenDecode.data)

    if(!user) responseHendlers.unautorize(response)

    request.user = user

    next()
}

export default {tokenDecode, authMiddleware}