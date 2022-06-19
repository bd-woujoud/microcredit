const clientController = require('../Controllers/clientController');

const express = require('express')
const route = express.Router();
const passport=require('passport')
require('../passport')
const LocalStrategy = require('passport-local').Strategy;
var JwtStrategy = require('passport-jwt').Strategy;

route.get('/getAllclient',clientController.getAllclient)
route.get('/getclientbyId/:id',clientController.getclientById)
route.delete('/deleteclientbyId/:id',clientController.deleteclientById)
route.put('/updateclientbyId/:id',clientController.updateclientById)


module.exports = route;