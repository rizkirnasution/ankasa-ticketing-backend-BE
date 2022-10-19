const db = require('../config/db');

const productModel = {
    getAllProduct: (
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
    ) => new Promise((resolve, reject) => {
        let sql = 'SELECT products.origin, products.destination, products.price, products.type, products.stock, products.transit_total, products.flight_date, products.airline_id, products.estimation, products.created_date, products.code, products.gate, products.terminal, products.id, airlines.name, airlines.photo FROM products INNER JOIN airlines ON products.airline_id = airlines.id WHERE products.stock >= 1';

        if (transit) {
            sql += ` AND products.transit_total = ${transit}`;
        }
        if (airline) {
            sql += ` AND airlines.name='${airline}'`;
        }
        if (minprice) {
            sql += ` AND products.price>=${minprice}`;
        }
        if (maxprice) {
            sql += ` AND products.price<=${maxprice}`;
        }
        if (origin) {
            sql += ` AND LOWER(products.origin) LIKE '%${origin.toLowerCase()}%'`;
        }
        if (destination) {
            sql += ` AND LOWER(products.destination) LIKE '%${destination.toLowerCase()}%'`;
        }
        if (type) {
            sql += ` AND LOWER(products.type)='${type.toLowerCase()}'`;
        }
        if (stock) {
            sql += ` AND products.stock>=${stock}`;
        }

        if (orderBy.trim() === 'price') {
            sql += ' ORDER BY products.price';
        } else if (orderBy.trim() === 'origin') {
            sql += ' ORDER BY products.origin';
        } else if (orderBy.trim() === 'transit') {
            sql += ' ORDER BY products.transit_total';
        } else if (orderBy.trim() === 'destination') {
            sql += ' ORDER BY products.destination';
        } else if (orderBy.trim() === 'type') {
            sql += ' ORDER BY products.type ';
        } else if (orderBy.trim() === 'stock') {
            sql += ' ORDER BY products.stock';
        } else if (orderBy.trim() === 'airline') {
            sql += ' ORDER BY airlines.name';
        } else {
            sql += ' ORDER BY products.created_date';
        }
        sql += ` LIMIT ${paging.limit} OFFSET ${paging.offset}`;

        db.query(sql, (err, result) => {
            if (err) {
                reject(err);
            }
            resolve(result);
        });
    }),
    storeProduct: (
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
    ) => new Promise((resolve, reject) => {
        db.query(
            `INSERT INTO products (origin, destination, price, stock,
                transit_total, flight_date, airline_id, estimation,
                created_date, code, gate, terminal, id, type) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9,
                $10, $11, $12, $13, $14)`,
            [
                origin,
                destination,
                price,
                stock,
                transit_total,
                flight_date,
                airline_id,
                estimation,
                created_date,
                code,
                gate,
                terminal,
                id,
                type,
            ],
            (err, result) => {
                if (err) {
                    reject(err);
                }
                resolve(result);
            },
        );
    }),
    countAll: (
        transit,
        airline,
        minprice,
        maxprice,
        origin,
        destination,
        type,
        stock,
    ) => new Promise((resolve, reject) => {
        let sql = 'SELECT count(*) FROM products INNER JOIN airlines ON products.airline_id = airlines.id WHERE products.stock >= 1';

        if (transit) {
            sql += ` AND products.transit_total = ${transit}`;
        }
        if (airline) {
            sql += ` AND airlines.name='${airline}'`;
        }
        if (minprice) {
            sql += ` AND products.price>=${minprice}`;
        }
        if (maxprice) {
            sql += ` AND products.price<=${maxprice}`;
        }
        if (origin) {
            sql += ` AND LOWER(products.origin) LIKE '%${origin.toLowerCase()}%'`;
        }
        if (destination) {
            sql += ` AND LOWER(products.destination) LIKE '%${destination.toLowerCase()}%'`;
        }
        if (type) {
            sql += ` AND LOWER(products.type)='${type.toLowerCase()}'`;
        }
        if (stock) {
            sql += ` AND products.stock>=${stock}`;
        }

        db.query(
            sql,
            (err, result) => {
                if (err) {
                    reject(err);
                }
                resolve(result);
            },
        );
    }),
    detailProduct: (id) => new Promise((resolve, reject) => {
        db.query(
            `SELECT products.id, products.airline_id, products.origin, products.destination, products.price, products.stock, products.transit_total, products.flight_date, products.estimation, products.created_date, products.code, products.terminal, products.gate, products.type, airlines.name, airlines.pic, airlines.phone, airlines.photo FROM products INNER JOIN airlines ON products.airline_id = airlines.id WHERE products.id='${id}'`,
            (err, result) => {
                if (err) {
                    reject(err);
                }
                resolve(result);
            },
        );
    }),
    updateProduct: (
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
        id,
    ) => new Promise((resolve, reject) => {
        db.query(
            `UPDATE products SET origin=$1, destination=$2, price=$3, type=$4, stock=$5,
                transit_total=$6, flight_date=$7, airline_id=$8, estimation=$9,
                gate=$10, terminal=$11 WHERE id=$12`,
            [
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
                id,
            ],
            (err, result) => {
                if (err) {
                    reject(err);
                }
                resolve(result);
            },
        );
    }),

    deleteProduct: (id) => new Promise((resolve, reject) => {
        db.query(`DELETE FROM products WHERE id='${id}'`, (err, result) => {
            if (err) {
                reject(err);
            }
            resolve(result);
        });
    }),
    reduceStock: (id, stock) => new Promise((resolve, reject) => {
        db.query(
            `UPDATE products SET stock = ${stock} WHERE id='${id}'`,
            (err, result) => {
                if (err) {
                    reject(err);
                }
                resolve(result);
            },
        );
    }),
};

module.exports = productModel;
