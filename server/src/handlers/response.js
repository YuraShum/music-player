const responseConstuctor = (response, statusCode, data) => {
    return response.status(statusCode).json(data)
}


const responseHendlers = {
    unautorize: (response) => {
        return responseConstuctor(
            response,
            401,
            {
                message: 'Немає доступу. Потрібна авторизація.',
                status: 401
            }
        )
    },
    forbidden: (response) => {
        return responseConstuctor(
            response,
            403,
            {
                message: 'Неправильний або прострочений токен',
                status: 403
            }
        )
    },
    badRequest: (response, message) => {
        return responseConstuctor(
            response,
            400,
            {
                message,
                status: 400
            }
        )
    },
    created: (response, data) => {
        return responseConstuctor(response, 201, data)

    },
    error: (response) => {
        return responseConstuctor(
            response,
            500,
            {
                message: 'Щось пішло не так',
                status: 500
            }
        )
    },
    notFound: (response, message) => {
        return responseConstuctor(
            response,
            404,
            {
                message,
                status: 404
            }
        )
    },
    ok: (response, data) => {
        return responseConstuctor(response, 200, data)
    }

}

export default responseHendlers