const db = require("../config/db");

module.exports = {
  register: (body) =>
    new Promise((resolve, reject) => {
      const {
        id,
        name,
        email,
        phone = "",
        city = "",
        address = "",
        postalCode,
        password,
        level = 1,
        createdDate,
        isVerified = false,
        photo = "",
      } = body;

      db.query(
        "INSERT INTO users (id, name, email, phone, city, address, postal_code, password, level, created_date, is_verified, photo) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING id",
        [
          id,
          name,
          email,
          phone,
          city,
          address,
          postalCode,
          password,
          level,
          createdDate,
          isVerified,
          photo,
        ],
        (error, result) => {
          if (error) {
            reject(error);
          }
          resolve(result);
        }
      );
    }),
  updateToken: (id, token) =>
    new Promise((resolve, reject) => {
      db.query(
        "UPDATE users SET token=$1 WHERE id=$2",
        [token, id],
        (error, result) => {
          if (error) {
            reject(error);
          }
          resolve(result);
        }
      );
    }),
  checkEmailToken: (token) =>
    new Promise((resolve, reject) => {
      console.log(token);
      db.query(
        "SELECT * FROM users WHERE token=$1",
        [token],
        (error, result) => {
          if (error) {
            reject(error);
          }
          resolve(result);
        }
      );
    }),
  activateEmail: (id) =>
    new Promise((resolve, reject) => {
      db.query(
        "UPDATE users SET is_verified=true WHERE id=$1",
        [id],
        (error, result) => {
          if (error) {
            reject(error);
          }
          resolve(result);
        }
      );
    }),
  login: (email) =>
    new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM users WHERE email=$1",
        [email],
        (error, result) => {
          if (error) {
            reject(error);
          }
          resolve(result);
        }
      );
    }),
  resetPassword: (id, password) =>
    new Promise((resolve, reject) => {
      db.query(
        "UPDATE users SET password=$1 WHERE id=$2",
        [password, id],
        (error, result) => {
          if (error) {
            reject(error);
          }
          resolve(result);
        }
      );
    }),
};
