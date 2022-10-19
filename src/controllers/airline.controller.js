const { v4: uuidv4 } = require("uuid");
const airlinesModel = require("../models/airline.model");
const { success, failed } = require("../utils/createResponse");

const airlinesController = {
  list: async (req, res) => {
    try {
      const str = "";
      const search = req.query.search ? req.query.search : str;
      const { page, limit } = req.query;
      const pageValue = page ? Number(page) : 1;
      const limitValue = limit ? Number(limit) : 100;
      const offset = (pageValue - 1) * limitValue;
      const allData = await airlinesModel.allData();
      const totalData = Number(allData.rows[0].total);
      airlinesModel
        .listAll(search, limitValue, offset)
        .then((result) => {
          const pagination = {
            currentPage: pageValue,
            dataPerPage: limitValue,
            totalPage: Math.ceil(totalData / limitValue),
          };
          const data = {
            code: 200,
            payload: result.rows,
            message: "get all data success",
            pagination,
          };
          success(res, data);
        })
        .catch((err) => {
          const data = {
            code: 404,
            payload: err,
            message: "get all data failed p",
          };
          failed(res, data);
        });
    } catch (err) {
      const data = {
        code: 404,
        payload: err,
        message: "get all data failed o",
      };
      failed(res, data);
    }
  },
  detail: (req, res) => {
    try {
      const { id } = req.params;
      airlinesModel
        .detailAirlines(id)
        .then((result) => {
          if (result.rowCount === 0) {
            const data = {
              code: 404,
              payload: result.rows[0],
              message: "get deatil airline failed",
            };
            return failed(res, data);
          }
          const data = {
            code: 200,
            payload: result.rows[0],
            message: "get detail airline success",
          };
          success(res, data);
        })
        .catch((err) => {
          const data = {
            code: 404,
            payload: err,
            message: "get deatil airline failed",
          };
          failed(res, data);
        });
    } catch (err) {
      const data = {
        code: 404,
        payload: err,
        message: "get deatil airline failed",
      };
      failed(res, data);
    }
  },
  input: async (req, res) => {
    try {
      const { body } = req;
      const id = uuidv4();
      const PORT = process.env.PORT;
      const DB_HOST = process.env.DB_HOST;
      let image = req.file.filename;
      const { name, pic, phone } = body;

      const data = {
        image: `http://${DB_HOST}:${PORT}/img/${image}`,
        name,
        pic,
        phone,
        date: new Date(),
        id,
        isActive: false,
      };
      airlinesModel
        .inputAirlines(data)
        .then((result) => {
          const data = {
            code: 200,
            payload: result,
            message: "input data airline success",
          };
          success(res, data);
        })
        .catch((err) => {
          const data = {
            code: 404,
            payload: err,
            message: "input data airline failed",
          };
          failed(res, data);
        });
    } catch (err) {
      const data = {
        code: 404,
        payload: err,
        message: "input data airline failed o",
      };
      failed(res, data);
    }
  },
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const photo = req.file.filename;
      const { name, pic, phone } = req.body;
      airlinesModel
        .updateAirlines(id, photo, name, pic, phone)
        .then((result) => {
          const data = {
            code: 200,
            payload: result,
            message: "success to update airlines",
          };
          success(res, data);
        })
        .catch((err) => {
          const data = {
            code: 404,
            payload: err,
            message: "failed to update airlines",
          };
          failed(res, data);
        });
    } catch (err) {
      const data = {
        code: 404,
        payload: err,
        message: "failed to update airlines",
      };
      failed(res, data);
    }
  },
  deleted: async (req, res) => {
    try {
      const { id } = req.params;
      airlinesModel
        .deleteAirlines(id)
        .then((result) => {
          const data = {
            code: 200,
            payload: result,
            message: "success to delete airlines",
          };
          success(res, data);
        })
        .catch((err) => {
          const data = {
            code: 500,
            payload: err,
            message: "failed to delete airlines",
          };
          failed(res, data);
        });
    } catch (err) {
      const data = {
        code: 500,
        payload: err,
        message: "failed to delete airlines",
      };
      failed(res, data);
    }
  },
  control: async (req, res) => {
    try {
      const { id } = req.params;
      const { isActive } = req.body;
      airlinesModel
        .airlinesControl(id, isActive)
        .then((result) => {
          const data = {
            code: 200,
            payload: result.command,
            message: "managed to change the activeness of the airline",
          };
          success(res, data);
        })
        .catch((err) => {
          const data = {
            code: 404,
            payload: err,
            message: "failed to change airline activity",
          };
          failed(res, data);
        });
    } catch (err) {
      const data = {
        code: 404,
        payload: err,
        message: "failed to change airline activity",
      };
      failed(res, data);
    }
  },
};
module.exports = airlinesController;
