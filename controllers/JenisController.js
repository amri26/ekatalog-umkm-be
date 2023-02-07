const { Router } = require('express')
const modules = require('../modules/jenis.modules')
const response = require('../helpers/response')
const { userSession } = require('../helpers/middleware')

const app = Router()

app.get('/', async (req, res, next) => {
    response.sendResponse(res, await modules.listJenis())
})

app.post('/', async (req, res, next) => {
    response.sendResponse(res, await modules.addJenis(req.body))
})

app.put('/:id_jenis', async (req, res, next) => {
    response.sendResponse(res, await modules.editJenis(Number(req.params.id_jenis), req.body))
})

app.delete('/:id_jenis', async (req, res, next) => {
    response.sendResponse(res, await modules.delJenis(Number(req.params.id_jenis)))
})

module.exports = app