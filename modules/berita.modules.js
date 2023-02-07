const prisma = require("../helpers/database");
const Joi = require("joi");

class _berita {
  listBerita = async () => {
    try {
      const list = await prisma.berita.findMany({
        select: {
          id_berita: true,
          judul: true,
          isi: true,
          created_at: true,
        },
      });

      return {
        status: true,
        data: list,
      };
    } catch (error) {
      console.error("listBerita module error: ", error);

      return {
        status: false,
        error,
      };
    }
  };

  getBerita = async (id_berita) => {
    try {
      const schema = Joi.number().required();

      const validation = schema.validate(id_berita);

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

      const get = await prisma.berita.findUnique({
        where: {
          id_berita,
        },
      });

      return {
        status: true,
        data: get,
      };
    } catch (error) {
      console.error("getBerita module error: ", error);

      return {
        status: false,
        error,
      };
    }
  };

  addBerita = async (body) => {
    try {
      const schema = Joi.object({
        id_gambar: Joi.number(),
        judul: Joi.string(),
        isi: Joi.string(),
      });

      const validation = schema.validate(body);

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

      await prisma.berita.create({
        data: {
          id_gambar: body.id_gambar,
          judul: body.judul,
          isi: body.isi,
        },
      });

      return {
        status: true,
        code: 201,
      };
    } catch (error) {
      console.error("addBerita module error: ", error);

      return {
        status: false,
        error,
      };
    }
  };
}

module.exports = new _berita();
