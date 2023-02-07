const { Router } = require('express')
const modules = require('../modules/umkm.modules')
const response = require('../helpers/response')
const { userSession } = require('../helpers/middleware')

const app = Router()

app.get('/', async (req, res, next) => {
    response.sendResponse(res, await modules.listUmkm())
})

app.get('/:id_usaha', async (req, res, next) => {
    response.sendResponse(res, await modules.getUmkm(Number(req.params.id_usaha)))
})

app.post('/', async (req, res, next) => {
    response.sendResponse(res, await modules.addUmkm(req.body))
})

app.put('/:id_usaha', async (req, res, next) => {
    response.sendResponse(res, await modules.editUmkm(Number(req.params.id_usaha), req.body))
})

app.delete('/:id_usaha', async (req, res, next) => {
    response.sendResponse(res, await modules.delUmkm(Number(req.params.id_usaha)))
})

module.exports = app