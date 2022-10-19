const express = require('express');
const {
    createDestination, getDestination, getDetailDestination, updateDestination, deleteDestination,
} = require('../controllers/destination.controller');
const upload = require('../middlewares/upload');

const router = express.Router();

router
    .post('/destination', upload, createDestination)
    .get('/destination', getDestination)
    .get('/destination/:id', getDetailDestination)
    .put('/destination/:id', upload, updateDestination)
    .delete('/destination/:id', deleteDestination);
module.exports = router;
