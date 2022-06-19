const userController = require('../Controllers/userController');

const express = require('express')
const route = express.Router();
const jwt=require('jsonwebtoken')
const passport=require('passport')
require('../passport')
const LocalStrategy = require('passport-local').Strategy;
var JwtStrategy = require('passport-jwt').Strategy;
const upload = require('../middleware/upload');
const demandeController = require('../Controllers/demandeController');

route.post('/register',userController.register)
route.post('/login', passport.authenticate('local', { session: false }),userController.login)
route.get('/authenticated', passport.authenticate('jwt', { session: false }),userController.authenticated)

route.get('/logout',userController.logout)
route.get('/getAlluser',userController.getAlluser)
route.get('/getuserbyId/:id',userController.getuserById)
route.delete('/deletecomite/:id', userController.deletecomiteById)
route.put('/update/:id',userController.updateuserById)
route.get('/getComite',userController.getComite)
route.post('/sendMail',userController.sendMail)
route.put('/avatar/:id',upload.single("avatar"),userController.uploadavatar);

module.exports = route;
