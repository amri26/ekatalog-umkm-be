const AuthController = require("./controllers/AuthController");
const UserController = require("./controllers/UserController");
const UmkmController = require("./controllers/UmkmController");
const JenisController = require("./controllers/JenisController");
const GambarController = require("./controllers/GambarController");
const BeritaController = require("./controllers/BeritaController");

const _routes = [
  ["/login", AuthController],
  ["/user", UserController],
  ["/umkm", UmkmController],
  ["/jenis", JenisController],
  ["/gambar", GambarController],
  ["/berita", BeritaController],
];

const routes = (app) => {
  _routes.forEach((route) => {
    const [url, controller] = route;
    app.use(`${url}`, controller);
  });
};

module.exports = routes;
