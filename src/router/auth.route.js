const express = require("express");
const {
  register,
  activation,
  login,
  forgot,
  reset,
} = require("../controllers/auth.controller.js");
const authValidation = require("../validations/auth.validation.js");
const runValidation = require("../middlewares/runValidation");
const { isVerified } = require("../middlewares/authorization");

const router = express.Router();

router
  .post("/auth/register", authValidation.register, runValidation, register)
  .get("/auth/activation/:token", activation)
  .post("/auth/login", isVerified, authValidation.login, runValidation, login)
  .put("/auth/forgot", isVerified, authValidation.forgot, runValidation, forgot)
  .put("/auth/reset/:token", authValidation.reset, runValidation, reset);

module.exports = router;
