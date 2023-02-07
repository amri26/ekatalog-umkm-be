const { Router } = require("express");
const multer = require("multer");
const uploads = require("../helpers/upload");
const response = require("../helpers/response");
const modules = require("../modules/gambar.modules");
const storage = uploads("img", "img");
const upload = multer({ storage });
const { userSession } = require("../helpers/middleware");

const app = Router();

app.get("/:id_gambar", async (req, res, next) => {
  const img = await modules.getImg(Number(req.params.id_gambar));
  if (img.status) {
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=${img.data.nama}`
    );
    res.setHeader("Content-Type", img.data.mime);
    res.status(200);
    res.sendFile(img.data.path);
  } else {
    response.sendResponse(res, img);
  }
});

app.post("/", upload.single("file"), async (req, res, next) => {
  response.sendResponse(res, await modules.addImg(req.file));
});

module.exports = app;
