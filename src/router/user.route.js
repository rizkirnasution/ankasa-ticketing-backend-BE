const express = require("express");
const {
  list,
  detail,
  update,
  remove,
  updatePhoto,
} = require("../controllers/user.controller");
const upload = require("../middlewares/upload");
const userValidation = require("../validations/user.validation");
const runValidation = require("../middlewares/runValidation");
const jwtAuth = require("../middlewares/jwtAuth");
const photoLimit = require("../middlewares/photoLimit");

const router = express.Router();

router
  .get("/user", jwtAuth, list)
  .get("/user/:id", jwtAuth, detail)
  .put("/user/:id", jwtAuth, userValidation.update, runValidation, update)
  .put("/user/:id/photo", jwtAuth, upload, photoLimit, updatePhoto)
  .delete("/user/:id", jwtAuth, remove);

module.exports = router;
