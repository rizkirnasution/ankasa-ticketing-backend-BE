const db = require('../config/db');

const transactionsModels = {
    createTransaction: (setData) => new Promise((resolve, reject) => {
        db.query(
            'INSERT INTO transactions (product_id, airline_id, is_paid, user_id, seat, total_order, id, passenger_name, passenger_phone) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)',
            [
                setData.product_id,
                setData.airline_id,
                setData.is_paid,
                setData.user_id,
                setData.seat,
                setData.totalOrder,
                setData.id,
                setData.passenger_name,
                setData.passenger_phone,
            ],
            (err, result) => {
                if (err) {
                    reject(err);
                }
                resolve(result);
            },
        );
    }),
    paid: (transactionId) => new Promise((resolve, rejectt) => {
        db.query(
            'UPDATE transactions SET is_paid=$1 WHERE id=$2',
            [true, transactionId],
            (err, result) => {
                if (err) {
                    rejectt(err);
                }
                resolve(result);
            },
        );
    }),
    getTransactions: () => new Promise((resolve, reject) => {
        db.query('SELECT transactions.id, transactions.is_paid, transactions.seat, transactions.total_order, transactions.user_id, transactions.passenger_name, transactions.passenger_phone, products.origin, products.destination, products.price, products.type, airlines.name, airlines.photo, airlines.pic, airlines.phone, airlines.is_active, products.stock, products.transit_total, products.flight_date, products.code, products.gate, products.terminal FROM transactions inner join products ON transactions.product_id = products.id inner join airlines on transactions.airline_id = airlines.id', (err, result) => {
            if (err) {
                reject(err);
            }
            resolve(result);
        });
    }),
    getDetailTransactions: (id) => new Promise((resolve, reject) => {
        db.query(
            'SELECT * FROM transactions WHERE id=$1',
            [id],
            (err, result) => {
                if (err) {
                    reject(err);
                }
                resolve(result);
            },
        );
    }),
    deleteTransactions: (id, userId) => new Promise((resolve, reject) => {
        db.query(
            'DELETE FROM transactions WHERE id=$1 AND user_id=$2',
            [id, userId],
            (err, result) => {
                if (err) {
                    reject(err);
                }
                resolve(result);
            },
        );
    }),
    getTransactionByUser: (userId) => new Promise((resolve, reject) => {
        db.query(
            'SELECT products.flight_date, products.origin, products.destination, airlines.name, transactions.seat, transactions.is_paid, transactions.id FROM transactions inner join products ON transactions.product_id = products.id inner join airlines on transactions.airline_id = airlines.id WHERE user_id=$1',
            [userId],
            (err, result) => {
                if (err) {
                    reject(err);
                }
                resolve(result);
            },
        );
    }),
    getBookingDetail: (id) => new Promise((resolve, reject) => {
        db.query('SELECT airlines.name as airline, airlines.photo, products.origin, products.destination, products.code, products.terminal, products.gate, products.flight_date, products.type, transactions.passenger_name, transactions.seat FROM transactions INNER JOIN products ON transactions.product_id = products.id INNER JOIN airlines ON transactions.airline_id = airlines.id WHERE transactions.id=$1', [id], (err, result) => {
            if (err) {
                reject(err);
            }
            resolve(result);
        });
    }),
};

module.exports = transactionsModels;
