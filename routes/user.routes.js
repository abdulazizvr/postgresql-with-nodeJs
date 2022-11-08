const router = require('express').Router();
const {GETONE,GETALL,POST,PUT,DELETE} = require('../controllers/users');

router
    .get('/users',GETALL)
    .get('/users/:id',GETONE)
    .post('/users',POST)
    .put('/users/:id',PUT)
    .delete('/users/:id',DELETE)

module.exports = router