import { validationResult } from 'express-validator'
import responseHendlers from '../handlers/response.js'

const validator = (req, res, next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return responseHendlers.badRequest(res, errors.array()[0].msg)
    }
    next()
}

export default validator