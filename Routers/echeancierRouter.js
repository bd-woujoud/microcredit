const echeancierController = require('../Controllers/echeancierController');

const express = require('express')
const route = express.Router();


route.post('/createecheancier',echeancierController.createecheancier)
route.get('/getAllecheancier',echeancierController.getAllecheancier)
route.get('/getecheancierbyId/:id',echeancierController.getecheancierById)
route.delete('/deleteecheancierbyId/:id',echeancierController.deleteecheancierById)
route.put('/updateecheancierbyId/:id',echeancierController.updateecheancierById)


module.exports = route;
