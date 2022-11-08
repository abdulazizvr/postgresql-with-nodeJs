const router = require('express').Router();
const {GETONE,GETALL,POST,PUT,DELETE} = require('../controllers/cars');

router
    .get('/cars',GETALL)
    .get('/cars/:id',GETONE)
    .post('/cars',POST)
    .put('/cars/:id',PUT)
    .delete('/cars/:id',DELETE)

module.exports = router