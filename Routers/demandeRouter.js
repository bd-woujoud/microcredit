
const demandeController = require('../Controllers/demandeController');
const express = require('express')
const route = express.Router();
const upload=require('../middleware/upload'); 
const userController = require('../Controllers/userController');

route.post('/createdemande', upload.fields([{name:'document1'},{name:'document2'},{name:'document3'},{ name:'document4'}]),demandeController.createdemande)

// route.post('/createdemande',upload.single('document'),demandeController.createdemande)
route.get('/getAlldemande',demandeController.getAlldemande)
route.get('/getdemandebyId/:id',demandeController.getdemandeById)
route.delete('/deletedemandebyId/:id',demandeController.deletedemandeById)
route.put('/updatedemande/:id',userController.sendMail,demandeController.updatedemandeById)
route.get('/getbyuser/:id',demandeController.getdemandeByUser)


module.exports = route;
