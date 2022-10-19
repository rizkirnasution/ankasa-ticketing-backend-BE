const express = require('express');

const {
    getListProduct,
    createdProduct,
    getDetailProduct,
    updateProduct,
    deleteProduct,
} = require('../controllers/product.controller');
const jwtAuth = require('../middlewares/jwtAuth');
const productValidation = require('../validations/product.validation');
const runValidation = require('../middlewares/runValidation');

const route = express.Router();

route
    .get('/product', jwtAuth, getListProduct)
    .post('/product', jwtAuth, productValidation.post, runValidation, createdProduct)
    .get('/product-detail/:id', jwtAuth, getDetailProduct)
    .put('/product/:id', jwtAuth, productValidation.post, runValidation, updateProduct)
    .delete('/delete-product/:id', jwtAuth, deleteProduct);

module.exports = route;
