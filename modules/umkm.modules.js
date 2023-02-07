const prisma = require("../helpers/database");
const Joi = require("joi");

class _umkm {
  listUmkm = async () => {
    try {
      const list = await prisma.usaha.findMany({
        select: {
          id_usaha: true,
          bidang_usaha: true,
          nama_usaha: true,
          orang: {
            select: {
              nama_lengkap: true,
              no_hp: true,
            },
          },
          jenis: {
            select: {
              nama: true,
            },
          },
        },
      });

      return {
        status: true,
        data: list,
      };
    } catch (error) {
      console.error("listUmkm module error: ", error);

      return {
        status: false,
        error,
      };
    }
  };

  getUmkm = async (id_usaha) => {
    try {
      const schema = Joi.number().required();

      const validation = schema.validate(id_usaha);

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

      const get = await prisma.usaha.findUnique({
        where: {
          id_usaha,
        },
        include: {
          jenis: true,
          orang: true,
        },
      });

      return {
        status: true,
        data: get,
      };
    } catch (error) {
      console.error("getUmkm module error: ", error);

      return {
        status: false,
        error,
      };
    }
  };

  addUmkm = async (body) => {
    try {
      const schema = Joi.object({
        nik: Joi.string(),
        nama_lengkap: Joi.string(),
        jenis_kelamin: Joi.string(),
        tanggal_lahir: Joi.date(),
        pemohon_dusun: Joi.string(),
        pemohon_desa: Joi.string(),
        pemohon_kecamatan: Joi.string(),
        no_hp: Joi.string(),
        email: Joi.string(),
        bidang_usaha: Joi.number(),
        luas_lahan: Joi.number(),
        usaha_dusun: Joi.string(),
        usaha_desa: Joi.string(),
        usaha_kecamatan: Joi.string(),
        usaha_kode_pos: Joi.string(),
        status: Joi.number(),
        nama_usaha: Joi.string(),
        modal: Joi.number(),
        jumlah_tenaga_kerja: Joi.number(),
        jenis_produk: Joi.number(),
        kapasitas_penjualan: Joi.number(),
        nama_pendata: Joi.string(),
        oss_email: Joi.string(),
        oss_username: Joi.string(),
        oss_password: Joi.string(),
        keterangan: Joi.string(),
        id_gambar: Joi.number(),
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

      const addOrang = await prisma.orang.create({
        data: {
          nik: body.nik,
          nama_lengkap: body.nama_lengkap,
          jenis_kelamin: body.jenis_kelamin,
          tanggal_lahir: body.tanggal_lahir,
          pemohon_dusun: body.pemohon_dusun,
          pemohon_desa: body.pemohon_desa,
          pemohon_kecamatan: body.pemohon_kecamatan,
          no_hp: body.no_hp,
          email: body.email,
        },
        select: {
          id_orang: true,
        },
      });

      await prisma.usaha.create({
        data: {
          id_orang: addOrang.id_orang,
          bidang_usaha: body.bidang_usaha,
          luas_lahan: body.luas_lahan,
          usaha_dusun: body.usaha_dusun,
          usaha_desa: body.usaha_desa,
          usaha_kecamatan: body.usaha_kecamatan,
          usaha_kode_pos: body.usaha_kode_pos,
          status: body.status,
          nama_usaha: body.nama_usaha,
          modal: body.modal,
          jumlah_tenaga_kerja: body.jumlah_tenaga_kerja,
          jenis_produk: body.jenis_produk,
          kapasitas_penjualan: body.kapasitas_penjualan,
          nama_pendata: body.nama_pendata,
          oss_email: body.oss_email,
          oss_username: body.oss_username,
          oss_password: body.oss_password,
          keterangan: body.keterangan,
          id_gambar: body.id_gambar,
        },
      });

      return {
        status: true,
        code: 201,
      };
    } catch (error) {
      console.error("addUmkm module error: ", error);

      return {
        status: false,
        error,
      };
    }
  };

  editUmkm = async (id_usaha, body) => {
    try {
      body = {
        id_usaha,
        ...body,
      };

      const schema = Joi.object({
        id_usaha: Joi.number().required(),
        nik: Joi.string(),
        nama_lengkap: Joi.string(),
        jenis_kelamin: Joi.string(),
        tanggal_lahir: Joi.date(),
        pemohon_dusun: Joi.string(),
        pemohon_desa: Joi.string(),
        pemohon_kecamatan: Joi.string(),
        no_hp: Joi.string(),
        email: Joi.string(),
        bidang_usaha: Joi.number(),
        luas_lahan: Joi.number(),
        usaha_dusun: Joi.string(),
        usaha_desa: Joi.string(),
        usaha_kecamatan: Joi.string(),
        usaha_kode_pos: Joi.string(),
        status: Joi.number(),
        nama_usaha: Joi.string(),
        modal: Joi.number(),
        jumlah_tenaga_kerja: Joi.number(),
        jenis_produk: Joi.number(),
        kapasitas_penjualan: Joi.number(),
        nama_pendata: Joi.string(),
        oss_email: Joi.string(),
        oss_username: Joi.string(),
        oss_password: Joi.string(),
        keterangan: Joi.string(),
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

      const check = await prisma.usaha.findUnique({
        where: {
          id_usaha: body.id_usaha,
        },
        select: {
          id_orang: true,
        },
      });

      if (!check) {
        return {
          status: false,
          code: 404,
          error: "Data not found",
        };
      }

      await prisma.usaha.update({
        where: {
          id_usaha: body.id_usaha,
        },
        data: {
          bidang_usaha: body.bidang_usaha,
          luas_lahan: body.luas_lahan,
          usaha_dusun: body.usaha_dusun,
          usaha_desa: body.usaha_desa,
          usaha_kecamatan: body.usaha_kecamatan,
          usaha_kode_pos: body.usaha_kode_pos,
          status: body.status,
          nama_usaha: body.nama_usaha,
          modal: body.modal,
          jumlah_tenaga_kerja: body.jumlah_tenaga_kerja,
          jenis_produk: body.jenis_produk,
          kapasitas_penjualan: body.kapasitas_penjualan,
          nama_pendata: body.nama_pendata,
          oss_email: body.oss_email,
          oss_username: body.oss_username,
          oss_password: body.oss_password,
          keterangan: body.keterangan,
        },
      });

      await prisma.orang.update({
        where: {
          id_orang: check.id_orang,
        },
        data: {
          nik: body.nik,
          nama_lengkap: body.nama_lengkap,
          jenis_kelamin: body.jenis_kelamin,
          tanggal_lahir: body.tanggal_lahir,
          pemohon_dusun: body.pemohon_dusun,
          pemohon_desa: body.pemohon_desa,
          pemohon_kecamatan: body.pemohon_kecamatan,
          no_hp: body.no_hp,
          email: body.email,
        },
      });

      return {
        status: true,
      };
    } catch (error) {
      console.error("editUmkm module error: ", error);

      return {
        status: false,
        error,
      };
    }
  };

  delUmkm = async (id_usaha) => {
    try {
      const schema = Joi.number().required();

      const validation = schema.validate(id_usaha);

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

      const check = await prisma.usaha.findUnique({
        where: {
          id_usaha,
        },
        select: {
          id_orang: true,
        },
      });

      if (!check) {
        return {
          status: false,
          code: 404,
          error: "Data not found",
        };
      }

      await prisma.usaha.delete({
        where: {
          id_usaha,
        },
      });

      await prisma.orang.delete({
        where: {
          id_orang: check.id_orang,
        },
      });

      return {
        status: true,
      };
    } catch (error) {
      console.error("delUmkm module error: ", error);

      return {
        status: false,
        error,
      };
    }
  };
}

module.exports = new _umkm();
