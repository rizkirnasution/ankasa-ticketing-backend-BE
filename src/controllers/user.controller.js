// const bcrypt = require('bcrypt');
const userModel = require("../models/user.model");
const createPagination = require("../utils/createPagination");
const { success, failed } = require("../utils/createResponse");
const deleteFile = require("../utils/deleteFile");
const uploadGoogleDrive = require("../utils/uploadGoogleDrive");
const deleteGoogleDrive = require("../utils/deleteGoogleDrive");

module.exports = {
  list: async (req, res) => {
    try {
      const { page, limit } = req.query;
      const count = await userModel.countAll();
      const paging = createPagination(count.rows[0].count, page, limit);
      const users = await userModel.selectAll(paging);

      success(res, {
        code: 200,
        payload: users.rows,
        message: "Select List User Success",
        pagination: paging.response,
      });
    } catch (error) {
      failed(res, {
        code: 500,
        payload: error.message,
        message: "Internal Server Error",
      });
    }
  },
  detail: async (req, res) => {
    try {
      const { id } = req.params;
      const user = await userModel.selectById(id);

      // jika user tidak ditemukan
      if (!user.rowCount) {
        failed(res, {
          code: 404,
          payload: `User with Id ${id} not found`,
          message: "Select Detail User Failed",
        });
        return;
      }

      success(res, {
        code: 200,
        payload: user.rows[0],
        message: "Select Detail User Success",
      });
    } catch (error) {
      failed(res, {
        code: 500,
        payload: error.message,
        message: "Internal Server Error",
      });
    }
  },
  update: async (req, res) => {
    try {
      const { id } = req.params;

      const user = await userModel.selectById(id);
      // jika user tidak ditemukan
      if (!user.rowCount) {
        failed(res, {
          code: 404,
          payload: `User with Id ${id} not found`,
          message: "Update User Failed",
        });
        return;
      }

      // jika update user disertai photo
      const { image, email } = user.rows[0]; // email tidak boleh diubah
      await userModel.updateById(id, { ...req.body, image, email });

      success(res, {
        code: 200,
        payload: null,
        message: "Update User Success",
      });
    } catch (error) {
      failed(res, {
        code: 500,
        payload: error.message,
        message: "Internal Server Error",
      });
    }
  },
  updatePhoto: async (req, res) => {
    try {
      const { id } = req.params;

      const user = await userModel.selectById(id.toString());
      // jika user tidak ditemukan
      if (!user.rowCount) {
        // menghapus photo jika ada
        if (req.files) {
          if (req.files.image) {
            deleteFile(req.files.image[0].path);
          }
        }

        failed(res, {
          code: 404,
          payload: `User with Id ${id} not found`,
          message: "Update User Failed",
        });
        return;
      }

      // jika update user disertai image
      let { image } = user.rows[0];
      if (req.files) {
        if (req.files.image) {
          // menghapus image lama
          if (user.rows[0].image) {
            await deleteGoogleDrive(user.rows[0].image);
          }
          // mendapatkan name image baru
          image = await uploadGoogleDrive(req.files.image[0]);
          deleteFile(req.files.image[0].path);
        }
      }
      await userModel.updatePhoto(user.rows[0].id, image);

      success(res, {
        code: 200,
        payload: null,
        message: "Update User Photo Success",
      });
    } catch (error) {
      failed(res, {
        code: 500,
        payload: error.message,
        message: "Internal Server Error",
      });
    }
  },
  remove: async (req, res) => {
    try {
      const { id } = req.params;
      const user = await userModel.selectById(id);

      // jika user tidak ditemukan
      if (!user.rowCount) {
        failed(res, {
          code: 404,
          payload: `User with Id ${id} not found`,
          message: "Delete User Failed",
        });
        return;
      }
      await userModel.removeById(id);

      // menghapus photo jika ada
      if (user.rows[0].image) {
        deleteFile(`public/${user.rows[0].image}`);
      }

      success(res, {
        code: 200,
        payload: null,
        message: "Delete User Success",
      });
    } catch (error) {
      failed(res, {
        code: 500,
        payload: error.message,
        message: "Internal Server Error",
      });
    }
  },
};
