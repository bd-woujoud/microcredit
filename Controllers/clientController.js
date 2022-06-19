const clientModel = require('../Models/clientModel');
const bcrypt = require('bcrypt');
const userModel = require('../Models/userModel');

module.exports = {
  

  getAllclient: function (req, res) {
    userModel.find({role:"client"}).populate('demande').exec((err, client)=> {
      if (err) {
        res.json({ messsage: 'error', data: null, statut: 500 })
      }
      else {
        res.json({ messsage: 'all client in BD', data: client, statut: 200 })
      }
    })
  },


  getclientById: function (req, res) {

    userModel.findById({ _id: req.params.id }).populate('demande'), function (err, client) {
      if (err) {
        res.json({ messsage: 'error', data: null, statut: 500 })
      }
      else {
        res.json({ messsage: 'client by id  in BD', data: client, statut: 200 })
      }
    }
  },


  deleteclientById: function (req, res) {
    userModel.findByIdAndDelete({ _id: req.params.id }, function (err, client) {
      if (err) {
        res.json({ messsage: 'error', data: null, statut: 500 })
      }
      else {
        res.json({ messsage: 'client deleted successfuly', data: client, statut: 200 })
      }
    })
  },

  
  updateclientById: function (req, res) {
    clientModel.findByIdAndUpdate({ _id: req.params.id }, req.body), function (err, client) {
      if (err) {
        res.json({ messsage: 'error', data: null, statut: 500 })
      }
      else {
        res.json({ messsage: 'client updated successfuly', data: client, statut: 200 })
      }
    }
  },

}




