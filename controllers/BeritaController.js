const { Router } = require("express");
const modules = require("../modules/berita.modules");
const response = require("../helpers/response");
const { userSession } = require("../helpers/middleware");

const app = Router();

app.get("/", async (req, res, next) => {
  response.sendResponse(res, await modules.listBerita());
});

app.get("/:id_berita", async (req, res, next) => {
  response.sendResponse(
    res,
    await modules.getBerita(Number(req.params.id_berita))
  );
});

app.post("/", async (req, res, next) => {
  response.sendResponse(res, await modules.addBerita(req.body));
});

module.exports = app;
