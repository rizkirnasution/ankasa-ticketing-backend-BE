const express = require('express');
const {
    list,
    detail,
    input,
    update,
    deleted,
    control,
} = require('../controllers/airline.controller');
const airlineValidation = require('../validations/airline.validation');
const runValidation = require('../middlewares/runValidation');

const router = express.Router();
const jwtAuth = require('../middlewares/jwtAuth');
const upload = require('../middlewares/upload');

router
    .get('/airlines', jwtAuth, list)
    .get('/airlines/:id', jwtAuth, detail)
    .post('/airlines', jwtAuth, upload, airlineValidation.post, runValidation, input)
    .put(
        '/airlines/:id',
        jwtAuth,
        upload,
        airlineValidation.post,
        runValidation,
        update,
    )
    .delete('/airlines/:id', jwtAuth, deleted)

    // suspend
    .put('/airlines-control/:id', jwtAuth, control);

module.exports = router;
