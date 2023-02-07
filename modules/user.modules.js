const prisma = require('../helpers/database')
const bcrypt = require('bcrypt')
const Joi = require('joi')

class _user {
    addUser = async (body) => {
        try {
            const schema = Joi.object({
                username: Joi.string().required(),
                password: Joi.string().required(),
            })

            const validation = schema.validate(body)

            if (validation.error) {
                const errorDetails = validation.error.details.map(detail => detail.message)

                return {
                    status: false,
                    code: 422,
                    error: errorDetails.join(', ')
                }
            }

            const check = await prisma.user.findUnique({
                where: {
                    username: body.username
                }
            })

            if (check) {
                return {
                    status: false,
                    code: 409,
                    error: "Data duplicate found"
                }
            }

            body.password = bcrypt.hashSync(body.password, 10)

            const add = await prisma.user.create({
                data: {
                    username: body.username,
                    password: body.password,
                },
                select: {
                    id_user: true
                }
            })

            return {
                status: true,
                code: 201,
                data: add
            }
        } catch (error) {
            console.error('addUser module error: ', error)

            return {
                status: false,
                error
            }
        }
    }
}

module.exports = new _user()