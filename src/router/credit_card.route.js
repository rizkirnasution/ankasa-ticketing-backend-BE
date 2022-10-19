const express = require("express");
const {
  selectAll,
  selectByDetail,
  selectByUserID,
  insert,
  update,
  deleted,
} = require("../controllers/credit_card.controller");

const router = express.Router();
const jwtAuth = require("../middlewares/jwtAuth");

router
  .get("/credit_card", jwtAuth, selectAll)
  .get("/credit_card/:number", jwtAuth, selectByDetail)
  .get("/credit_card/:user_id", jwtAuth, selectByUserID)
  .post("/credit_card", jwtAuth, insert)
  .put("/credit_card/:id", jwtAuth, update)
  .delete("/credit_card/:id", jwtAuth, deleted);

module.exports = router;
