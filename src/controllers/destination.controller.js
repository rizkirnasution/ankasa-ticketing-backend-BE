const { v4: uuidv4 } = require("uuid");
const destinationModels = require("../models/destination.model");
const { success, failed } = require("../utils/createResponse");

const destinationController = {
  createDestination: async (req, res) => {
    try {
      const id = uuidv4();
      const PORT = process.env.PORT;
      const PGHOST = process.env.PGHOST;
      let image = req.file.filename;
      const setData = {
        id,
        country: req.body.country,
        place: req.body.place,
        image: `http://${PGHOST}/img/${image}`,
        price: Number(req.body.price),
        totalAirline: Number(req.body.totalAirline),
        date: new Date(),
      };
      const destination = await destinationModels.createDestination(setData);
      success(res, {
        code: 200,
        payload: destination,
        message: "sucess create destination!",
      });
    } catch (error) {
      failed(res, {
        code: 500,
        payload: error.message,
        message: "internal server error!",
      });
    }
  },
  getDestination: async (req, res) => {
    const limit = req.query.limit ? req.query.limit : 5;
    const sortType = req.query.sortType ? req.query.sortType : "DESC";
    try {
      const destination = await destinationModels.getDestination(
        sortType,
        limit
      );
      success(res, {
        code: 200,
        payload: destination.rows,
        message: "sucess get destination!",
      });
    } catch (error) {
      failed(res, {
        code: 500,
        payload: error.message,
        message: "internal server error!",
      });
    }
  },
  getDetailDestination: async (req, res) => {
    try {
      const { id } = req.params;
      const destination = await destinationModels.getDetailDestination(id);
      success(res, {
        code: 200,
        payload: destination.rows[0],
        message: "sucess get detail destination!",
      });
    } catch (error) {
      failed(res, {
        code: 500,
        payload: error.message,
        message: "internal server error!",
      });
    }
  },
  updateDestination: async (req, res) => {
    try {
      const setData = {
        id: req.params.id,
        country: req.body.country,
        place: req.body.place,
        image: req.file.filename,
        price: Number(req.body.price),
        totalAirline: Number(req.body.totalAirline),
        date: new Date(),
      };
      const destination = await destinationModels.updateDestination(setData);
      success(res, {
        code: 200,
        payload: destination,
        message: "update destination success!",
      });
    } catch (error) {
      failed(res, {
        code: 500,
        payload: error.message,
        message: "internal server error!",
      });
    }
  },
  deleteDestination: async (req, res) => {
    try {
      const { id } = req.params;
      const destination = await destinationModels.deleteDestination(id);
      success(res, {
        code: 200,
        payload: destination,
        message: "delete destination success!",
      });
    } catch (error) {
      failed(res, {
        code: 500,
        payload: error.message,
        message: "internal server error!",
      });
    }
  },
};

module.exports = destinationController;
