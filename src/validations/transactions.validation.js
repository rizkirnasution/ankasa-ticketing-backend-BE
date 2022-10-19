const { check } = require('express-validator');

const post = [
    // passenger_name
    check('passenger_name', 'Name required').not().isEmpty(),
    check('passenger_name', 'Name only can contains alphabet').isAlpha('en-US', {
        ignore: ' ',
    }),
    check('passenger_name', 'Name maximum length is 50 characters').isLength({
        max: 50,
    }),
    // phone
    check('passenger_phone', 'Phone required').not().isEmpty(),
    check('passenger_phone', 'Phone only can contains number').isNumeric(),
    check('passenger_phone', 'Phone maximum length is 13 characters').isLength({
        max: 13,
    }),
];

module.exports = {
    post,
};
