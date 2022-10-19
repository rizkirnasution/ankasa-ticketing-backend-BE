const { check } = require('express-validator');

const post = [
    // name
    check('name', 'Name required').not().isEmpty(),
    // phone
    check('phone', 'Phone required').not().isEmpty(),
    check('phone', 'Phone only can contains number').isNumeric(),
    check('phone', 'Phone maximum length is 13 characters').isLength({ max: 13 }),
    // pic
    check('pic', 'Pic required').not().isEmpty(),
];

module.exports = {
    post,
};
