const { db } = require("../config/db");

const CreditCardModel = {
  getAllCreditCards: () =>
    new Promise((resolve, reject) => {
      db.query("SELECT * FROM credit_card", (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(results);
      });
    }),
  getCreditCardDetail: (number) =>
    new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM credit_card WHERE number = $1",
        [number],
        (error, results) => {
          if (error) {
            reject(error);
          }
          resolve(results);
        }
      );
    }),
  getCreditCardByUser: (user_id) =>
    new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM credit_card WHERE user_id = $1",
        [user_id],
        (error, results) => {
          if (error) {
            reject(error);
          }
          resolve(results);
        }
      );
    }),
  // eslint-disable-next-line no-shadow
  insertCreditCard: (number, name, user_id, id) =>
    new Promise((resolve, reject) => {
      db.query(
        "INSERT INTO credit_card (number, name, user_id, id) VALUES ($1, $2, $3, $4)",
        [number, name, user_id, id],
        (error, results) => {
          if (error) {
            reject(error);
          }
          resolve(results);
        }
      );
    }),
  updateCreditCard: (number, name, id) =>
    new Promise((resolve, reject) => {
      db.query(
        "UPDATE credit_card SET number = $1, name = $2, WHERE id = $3",
        [number, name, id],
        (error, results) => {
          if (error) {
            reject(error);
          }
          resolve(results);
        }
      );
    }),
  deleteCreditCard: (id) =>
    new Promise((resolve, reject) => {
      db.query(
        "DELETE FROM credit_card WHERE id = $1",
        [id],
        (error, results) => {
          if (error) {
            reject(error);
          }
          resolve(results);
        }
      );
    }),
};

module.exports = {
  CreditCardModel,
};
