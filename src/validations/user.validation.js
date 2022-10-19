const { check } = require("express-validator");

const update = [
  // name
  check("name", "Name required").not().isEmpty(),
  check("name", "Name only can contains alphabet").isAlpha("en-US", {
    ignore: " ",
  }),
  check("name", "Name maximum length is 50 characters").isLength({ max: 50 }),
  // phone
  check("phone", "Phone only can contains number").isNumeric(),
  check("phone", "Phone maximum length is 13 characters").isLength({ max: 13 }),
  // city
  check("city", "City maximum length is 100 characters").isLength({ max: 100 }),
  // address
  check("address", "Address maximum length is 100 characters").isLength({
    max: 100,
  }),
  // postal_code
  check("postalCode", "Postal Code required").not().isEmpty(),
  check("postalCode", "Postal Code only can contains number").isNumeric(),
];

module.exports = {
  update,
};
