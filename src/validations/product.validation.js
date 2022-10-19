const { check } = require('express-validator');

const post = [
    // origin
    check('origin', 'Origin required').not().isEmpty(),
    // destination
    check('destination', 'Destination required').not().isEmpty(),
    // price
    check('price', 'Price required').not().isEmpty(),
    // stock
    check('stock', 'Stock required').not().isEmpty(),
    // transit_total
    check('transit_total', 'Transit Total required').not().isEmpty(),
    // flight_date
    check('flight_date', 'Flight Date required').not().isEmpty(),
    // estimation
    check('estimation', 'Estimation required').not().isEmpty(),
    // type
    check('type', 'Type required').not().isEmpty(),
    // gate
    check('gate', 'Gate required').not().isEmpty(),
    // terminal
    check('terminal', 'Terminal required').not().isEmpty(),
    // terminal
    check('airline_id', 'Airline required').not().isEmpty(),
];

module.exports = {
    post,
};
