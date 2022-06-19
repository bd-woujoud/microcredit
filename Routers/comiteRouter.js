const comiteController = require('../Controllers/comiteController');

const express = require('express')
const route = express.Router();


route.post('/createcomite',comiteController.createcomite)
route.get('/getAllcomite',comiteController.getAllcomite)
route.get('/getcomitebyId/:id',comiteController.getcomiteById)
route.delete('/deletecomitebyId/:id',comiteController.deletecomiteById)
route.put('/updatecomitebyId/:id',comiteController.updatecomiteById)


module.exports = route;