const db = require('../config/db');

const destinationModels = {
    createDestination: (setData) => new Promise((resolve, reject) => {
        db.query('INSERT INTO destinations (id, country, place, image, price, total_airline, date) VALUES ($1, $2, $3, $4, $5, $6, $7)', [setData.id, setData.country, setData.place, setData.image, setData.price, setData.totalAirline, setData.date], (err, result) => {
            if (err) {
                reject(err);
            }
            resolve(result);
        });
    }),
    getDestination: (sortType, limit) => new Promise((resolve, reject) => {
        db.query(`SELECT * FROM destinations ORDER BY date ${sortType} LIMIT ${limit}`, (err, result) => {
            if (err) {
                reject(err);
            }
            resolve(result);
        });
    }),
    getDetailDestination: (id) => new Promise((resolve, reject) => {
        db.query('SELECT * FROM destinations WHERE id=$1', [id], (err, result) => {
            if (err) {
                reject(err);
            }
            resolve(result);
        });
    }),
    updateDestination: (setData) => new Promise((resolve, reject) => {
        db.query('UPDATE destinations SET country=$1, place=$2, image=$3, total_airline=$4, price=$5, date=$6 WHERE id=$7', [setData.country, setData.place, setData.image, setData.totalAirline, setData.price, setData.date, setData.id], (err, result) => {
            if (err) {
                reject(err);
            }
            resolve(result);
        });
    }),
    deleteDestination: (id) => new Promise((resolve, reject) => {
        db.query('DELETE FROM destinations WHERE id=$1', [id], (err, result) => {
            if (err) {
                reject(err);
            }
            resolve(result);
        });
    }),
};

module.exports = destinationModels;
