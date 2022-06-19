const comiteModel = require('../Models/comiteModel');


module.exports = {

  
  createcomite: function (req, res) {
      comiteModel.create(req.body, function (err, client) {
          if (err) {
              res.json({ messsage: 'error create comite'+ err, data: null, statut: 500 })
          }
          else {
              res.json({ messsage: 'comite created successfuly', data:comite, statut: 200 })
          }
      })
  },


  getAllcomite: function (req, res) {
    comiteModel.find({}).populate('demande').populate('echeancier'), function (err, comite) {
      if (err) {
        res.json({ messsage: 'error', data: null, statut: 500 })
      }
      else {
        res.json({ messsage: 'all comite in BD', data: comite, statut: 200 })
      }
    }
  },


  getcomiteById: function (req, res) {
    comiteModel.findById({ _id: req.params.id }).populate('demande').populate('echeancier'), function (err, comite) {
      if (err) {
        res.json({ messsage: 'error', data: null, statut: 500 })
      }
      else {
        res.json({ messsage: 'comite by id in BD', data: client, statut: 200 })
      }
    }
  },
  

  deletecomiteById: function (req, res) {
    comiteModel.findByIdAndDelete({ _id: req.params.id }), function (err, comite) {
      if (err) {
        res.json({ messsage: 'error', data: null, statut: 500 })
      }
      else {
        res.json({ messsage: 'comite deleted successfuly', data: comite, statut: 200 })
      }
    }
  },


  updatecomiteById: function (req, res) {
    comiteModel.findByIdAndUpdate({ _id: req.params.id }, req.body), function (err, comite) {
      if (err) {
        res.json({ messsage: 'error', data: null, statut: 500 })
      }
      else {
        res.json({ messsage: 'comite updated successfuly', data: comite, statut: 200 })
      }
    }
  },

  
}




