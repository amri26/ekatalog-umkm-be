const prisma = require("../helpers/database");
const Joi = require("joi");

class _gambar {
  getImg = async (id_gambar) => {
    try {
      const schema = Joi.number().required();

      const validation = schema.validate(id_gambar);

      if (validation.error) {
        const errorDetails = validation.error.details.map(
          (detail) => detail.message
        );

        return {
          status: false,
          code: 422,
          error: errorDetails.join(", "),
        };
      }

      const get = await prisma.gambar.findUnique({
        where: {
          id_gambar,
        },
      });

      if (!get) {
        return {
          status: false,
          code: 404,
          error: "Image not found",
        };
      }

      return {
        status: true,
        data: get,
      };
    } catch (error) {
      console.error("getImg module error: ", error);

      return {
        status: false,
        error,
      };
    }
  };

  addImg = async (file) => {
    try {
      const add = await prisma.gambar.create({
        data: {
          nama: file.filename,
          path: file.path,
          nama_asli: file.originalname,
          mime: file.mimetype,
        },
        select: {
          id_gambar: true,
        },
      });

      return {
        status: true,
        data: add,
      };
    } catch (error) {
      console.error("addImg module error: ", error);

      return {
        status: false,
        error,
      };
    }
  };
}

module.exports = new _gambar();
