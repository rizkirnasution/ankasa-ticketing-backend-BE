const { v4: uuidv4 } = require('uuid');
const crypto = require('crypto');
const productModel = require('../models/product.model');
const { success, failed } = require('../utils/createResponse');
const createPagination = require('../utils/createPagination');

const productController = {
    getListProduct: async (req, res) => {
        try {
            const {
                transitFiltered,
                airlinesFiltered,
                minPriceFiltered,
                maxPriceFiltered,
                originFiltered,
                destinationFiltered,
                typeFiltered,
                page,
                limit,
                stockFiltered,
                sortFiltered,
            } = req.query;

            const transit = transitFiltered || '';
            const airline = airlinesFiltered || '';
            const minprice = minPriceFiltered || '';
            const maxprice = maxPriceFiltered || '';
            const origin = originFiltered || '';
            const destination = destinationFiltered || '';
            const type = typeFiltered || '';
            const stock = stockFiltered || '';
            const orderBy = sortFiltered || 'created_date';

            const count = await productModel.countAll(
                transit,
                airline,
                minprice,
                maxprice,
                origin,
                destination,
                type,
                stock,
            );
            const paging = createPagination(count.rows[0].count, page, limit);

            await productModel
                .getAllProduct(
                    transit,
                    airline,
                    minprice,
                    maxprice,
                    origin,
                    destination,
                    type,
                    stock,
                    orderBy,
                    paging,
                )
                .then((result) => {
                    success(res, {
                        code: 200,
                        payload: result.rows,
                        pagination: paging.response,
                        message: 'get All product success',
                    });
                })
                .catch((err) => {
                    failed(res, {
                        code: 500,
                        payload: err.message,
                        message: 'failed to get All product',
                    });
                });
        } catch (err) {
            failed(res, {
                code: 500,
                payload: err.message,
                message: 'Internal server error',
            });
        }
    },
    createdProduct: async (req, res) => {
        try {
            const id = uuidv4();

            const {
                origin,
                destination,
                price,
                stock,
                transit_total,
                flight_date,
                airline_id,
                estimation,
                type,
                gate,
                terminal,
            } = req.body;
            const created_date = new Date();
            const code = crypto.randomBytes(3).toString('hex').toUpperCase();

            await productModel
                .storeProduct(
                    origin,
                    destination,
                    price,
                    type,
                    stock,
                    transit_total,
                    flight_date,
                    airline_id,
                    estimation,
                    created_date,
                    gate,
                    terminal,
                    id,
                    code,
                )
                .then(() => {
                    success(res, {
                        code: 200,
                        payload: null,
                        message: 'create product success',
                    });
                })
                .catch((err) => {
                    failed(
                        (res,
                        {
                            code: 500,
                            payload: err.message,
                            message: 'failed to create product',
                        }),
                    );
                });
        } catch (err) {
            failed(res, {
                code: 500,
                payload: err.message,
                message: 'Internal server error',
            });
        }
    },
    getDetailProduct: async (req, res) => {
        try {
            const { id } = req.params;

            await productModel
                .detailProduct(id)
                .then((result) => {
                    success(res, {
                        code: 200,
                        payload: result.rows[0],
                        message: 'get detail product success',
                    });
                })
                .catch((err) => {
                    failed(res, {
                        code: 500,
                        payload: err.message,
                        message: 'failed to get detail product',
                    });
                });
        } catch (err) {
            failed(res, {
                code: 500,
                payload: err.message,
                message: 'Internal server error',
            });
        }
    },
    updateProduct: async (req, res) => {
        try {
            const productId = req.params.id;

            const {
                origin,
                destination,
                price,
                stock,
                transit_total,
                flight_date,
                airline_id,
                estimation,
                type,
                gate,
                terminal,
            } = req.body;

            await productModel
                .updateProduct(
                    origin,
                    destination,
                    price,
                    type,
                    stock,
                    transit_total,
                    flight_date,
                    airline_id,
                    estimation,
                    gate,
                    terminal,
                    productId,
                )
                .then((result) => {
                    success(res, {
                        code: 200,
                        payload: result,
                        message: 'update product success',
                    });
                })
                .catch((err) => {
                    failed(
                        (res,
                        {
                            code: 500,
                            payload: err.message,
                            message: 'failed to update product',
                        }),
                    );
                });
        } catch (err) {
            failed(res, {
                code: 500,
                payload: err.message,
                message: 'Internal server error',
            });
        }
    },
    deleteProduct: async (req, res) => {
        try {
            const { id } = req.params;

            productModel
                .deleteProduct(id)
                .then((result) => {
                    success(res, {
                        code: 200,
                        payload: result.rows,
                        message: 'delete product success',
                    });
                })
                .catch((err) => {
                    failed(res, {
                        code: 500,
                        payload: err.message,
                        message: 'failed to delete product',
                    });
                });
        } catch (err) {
            failed(res, {
                code: 500,
                payload: err.message,
                message: 'Internal server error',
            });
        }
    },
};

module.exports = productController;
