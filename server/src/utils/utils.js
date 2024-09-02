import jsonwebtoken from 'jsonwebtoken'

const generateToken = (userId) => {
    return jsonwebtoken.sign(
        {data: userId},
        process.env.JWT_SECRET_TOKEN,
        {expiresIn: '12h'}
    )
}

export {generateToken}