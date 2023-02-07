const prisma = require('../helpers/database')
const Joi = require('joi')

class _jenis {
    listJenis = async () => {
        try {
            const list = await prisma.jenis.findMany()

            return {
                status: true,
                data: list
            }
        } catch (error) {
            console.error('listJenis module error: ', error)

            return {
                status: false,
                error
            }
        }
    }

    addJenis = async (body) => {
        try {
            const schema = Joi.object({
                nama: Joi.string().required()
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

            await prisma.jenis.create({
                data: {
                    nama: body.nama
                }
            })

            return {
                status: true,
                code: 201
            }
        } catch (error) {
            console.error('addJenis module error: ', error)

            return {
                status: false,
                error
            }
        }
    }

    editJenis = async (id_jenis, body) => {
        try {
            body = {
                id_jenis,
                ...body
            }

            const schema = Joi.object({
                id_jenis: Joi.number().required(),
                nama: Joi.string().required()
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

            const check = await prisma.jenis.findUnique({
                where: {
                    id_jenis: body.id_jenis
                }
            })

            if (!check) {
                return {
                    status: false,
                    code: 404,
                    error: "Data not found"
                }
            }

            await prisma.jenis.update({
                where: {
                    id_jenis: body.id_jenis
                },
                data: {
                    nama: body.nama
                }
            })

            return {
                status: true
            }
        } catch (error) {
            console.error('editJenis module error: ', error)

            return {
                status: false,
                error
            }
        }
    }

    delJenis = async (id_jenis) => {
        try {
            const schema = Joi.number().required()

            const validation = schema.validate(id_jenis)
    
            if (validation.error) {
                const errorDetails = validation.error.details.map(detail => detail.message)
    
                return {
                    status: false,
                    code: 422,
                    error: errorDetails.join(', ')
                }
            }

            const check = await prisma.jenis.findUnique({
                where: {
                    id_jenis
                }
            })

            if (!check) {
                return {
                    status: false,
                    code: 404,
                    error: "Data not found"
                }
            }

            await prisma.jenis.delete({
                where: {
                    id_jenis
                }
            })

            return {
                status: true
            }
        } catch (error) {
            console.error('delJenis module error: ', error)

            return {
                status: false,
                error
            }
        }
    }
}

module.exports = new _jenis()