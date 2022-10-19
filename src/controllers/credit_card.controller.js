const { v4: uuidv4 } = require("uuid");
const { CreditCardModel } = require("../models/credit_card.model");
const { success, failed } = require("../utils/createResponse");

const CreditCardController = {
  selectAll: async (req, res) => {
    try {
      const credit_card = await CreditCardModel.getAllCreditCards();
      if (credit_card.rowCount > 0) {
        return success(res, {
          code: 200,
          payload: credit_card.rows,
          message: `Select List User's Credit Cards Success`,
        });
      }
      return res.json({
        message: "Sorry, no recipes found",
      });
    } catch (error) {
      return failed(res, {
        code: 500,
        payload: error.message,
        message: "Internal Server Error",
      });
    }
  },
  selectByDetail: async (req, res) => {
    try {
      const { number } = req.params;
      const credit_card = await CreditCardModel.getCreditCardDetail(number);
      if (credit_card.rows.length > 0) {
        return success(res, {
          code: 200,
          payload: credit_card.rows[0],
          message: `Select User's Credit Card Based On Card's Number Success`,
        });
      }
      return res.json({
        message: "Sorry, the recipe has not been available",
      });
    } catch (error) {
      return failed(res, {
        code: 500,
        payload: error.message,
        message: "Internal Server Error",
      });
    }
  },
  selectByUserID: async (req, res) => {
    try {
      const { user_id } = req.params;
      const credit_card = await CreditCardModel.getCreditCardByUser(user_id);
      if (credit_card.rows.length > 0) {
        return success(res, {
          code: 200,
          payload: credit_card.rows[0],
          message: `Select Credit Card Based On User's ID Success`,
        });
      }
      return res.json({
        message: "Sorry, the recipe has not been available",
      });
    } catch (error) {
      return failed(res, {
        code: 500,
        payload: error.message,
        message: "Internal Server Error",
      });
    }
  },
  insert: async (req, res) => {
    const id = uuidv4();
    const { number, name, user_id } = req.body;

    const creditCardNumberCheck = !number || number === "";
    const creditCardNameCheck = !name || name === "";
    const userIDCheck = !user_id || user_id === "";

    if (creditCardNumberCheck && creditCardNameCheck && userIDCheck) {
      return res.status(400).json({
        status: "failed",
        message: "All recipe data must be filled",
      });
    }

    try {
      const credit_card = await CreditCardModel.insertCreditCard(
        number,
        name,
        user_id,
        id
      );
      return success(res, {
        code: 200,
        payload: credit_card,
        message: "Credit Card Is Successfully Inserted",
      });
    } catch (error) {
      return failed(res, {
        code: 500,
        payload: error.message,
        message: "Internal Server Error",
      });
    }
  },
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { number, name, user_id } = req.body;
      const credit_card = await CreditCardModel.updateCreditCard(
        number,
        name,
        user_id,
        id
      );
      success(res, {
        code: 200,
        payload: credit_card,
        message: "Credit Card Is Successfully Updated",
      });
    } catch (error) {
      failed(res, {
        code: 500,
        payload: error.message,
        message: "Internal Server Error",
      });
    }
  },
  deleted: async (req, res) => {
    try {
      const { id } = req.params;
      const credit_card = await CreditCardModel.deleteCreditCard(id);
      success(res, {
        code: 200,
        payload: credit_card,
        message: "Credit Card Is Successfully Deleted",
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

module.exports = CreditCardController;
