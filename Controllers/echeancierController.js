const echeancierModel = require('../Models/echeancierModel');


module.exports = {


    createecheancier: function (req, res) {
        echeancierModel.create(req.body, function (err, echeancier) {
            if (err) {
                res.json({ messsage: 'error create echeancier'+ err, data: null, statut: 500 })
            }
            else {
                res.json({ messsage: 'echeancier created successfuly', data:echeancier , statut: 200 })
            }
        })
    },


    getAllecheancier:function(req,res){
      echeancierModel.find({}).populate('demande'),function(err,echeancier){
        if (err) {
            res.json({ messsage: 'error', data: null, statut: 500 })
        }
        else {
            res.json({ messsage: 'All echeancier in BD', data: echeancier, statut: 200 })
        }
      }
    },


    getecheancierById:function(req,res){
      echeancierModel.findById({_id:req.params.id}).populate('demande'),function(err,echeancier){
        if (err) {
            res.json({ messsage: 'error', data: null, statut: 500 })
        }
        else {
            res.json({ messsage: 'echeancier by id  in BD', data: echeancier, statut: 200 })
        }
      }
    },


    deleteecheancierById:function(req,res){
      echeancierModel.findByIdAndDelete({_id:req.params.id}),function(err,echeancier){
        if (err) {
            res.json({ messsage: 'error', data: null, statut: 500 })
        }
        else {
            res.json({ messsage: 'echeancier deleted successfuly', data: echeancier, statut: 200 })
        }
      }
    },


    updateecheancierById:function(req,res){
      echeancierModel.findByIdAndUpdate({_id:req.params.id},req.body),function(err,echeancier){
        if (err) {
            res.json({ messsage: 'error', data: null, statut: 500 })
        }
        else {
            res.json({ messsage: 'echeancier updated successfuly', data: echeancier, statut: 200 })
        }
      }
    },

    
}




