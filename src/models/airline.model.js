const db = require('../config/db');

const airlinesModel = {
    allData: () => new Promise((resolve, reject) => {
        db.query('SELECT COUNT(*) AS total FROM airlines', (err, res) => {
            if (err) {
                reject(err);
            }
            resolve(res);
        });
    }),
    listAll: (search, limit, offset) => new Promise((resolve, reject) => {
        db.query(
            `SELECT * FROM airlines WHERE name LIKE '%${search}%' LIMIT ${limit} OFFSET ${offset}`,
            (err, res) => {
                if (err) {
                    reject(err);
                }
                resolve(res);
            },
        );
    }),
    detailAirlines: (id) => new Promise((resolve, reject) => {
        db.query(`SELECT * FROM airlines WHERE id='${id}'`, (err, res) => {
            if (err) {
                reject(err);
            }
            resolve(res);
        });
    }),
    inputAirlines: (data) => new Promise((resolve, reject) => {
        const {
            id, file, name, pic, phone, date, isActive,
        } = data;

        db.query(
            `INSERT INTO airlines ( photo, name, pic, phone, created_date, id, is_active) 
            VALUES ('${file}', '${name}','${pic}', '${phone}', $1, '${id}',${isActive})`,
            [date],
            (err, res) => {
                if (err) {
                    reject(err);
                }
                resolve(res);
            },
        );
    }),
    updateAirlines: (
        id,
        photo,
        name,
        pic,
        phone,
    ) => new Promise((resolve, reject) => {
        db.query(
            `UPDATE airlines SET photo='${photo}', name='${name}',pic='${pic}'
                , phone='${phone}' WHERE id='${id}'`,
            (err, res) => {
                if (err) {
                    reject(err);
                }
                resolve(res);
            },
        );
    }),
    deleteAirlines: (id) => new Promise((resolve, reject) => {
        db.query(`DELETE FROM airlines WHERE id='${id}'`, (err, res) => {
            if (err) {
                reject(err);
            }
            resolve(res);
        });
    }),
    airlinesControl: (id, isActive) => new Promise((resolve, reject) => {
        db.query(
            `UPDATE airlines SET is_active='${isActive}' WHERE id='${id}'`,
            (err, res) => {
                if (err) {
                    reject(err);
                }
                resolve(res);
            },
        );
    }),
};

module.exports = airlinesModel;
