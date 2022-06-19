const demandeModel = require('../Models/demandeModel');

module.exports = {

  createdemande: async (req, res) => {

    try {

      console.log("files : ", req.files)
      const document1 = req.files.document1[0].filename;
      req.body["document1"] = document1

      const document2 = req.files.document2[0].filename; // importer 4 fichiers
      req.body["document2"] = document2

      const document3 = req.files.document3[0].filename;
      req.body["document3"] = document3

      const document4 = req.files.document4[0].filename; 
      req.body["document4"] = document4


      if (req.files.document1[0].mimetype != 'application/pdf') {
        res.json({ msg: 'please enter a valid extention for document1' })
      }
      else if (req.files.document2[0].mimetype != 'application/pdf') {
        res.json({ msg: 'please enter a valid extention for document2' })
      }
      else if (req.files.document3[0].mimetype != 'application/pdf') {
        res.json({ msg: 'please enter a valid extention for document3' })
      }
      else if (req.files.document4[0].mimetype != 'application/pdf') {
        res.json({ msg: 'please enter a valid extention for document4' })

      } else {

        const demande = new demandeModel({

          user: req.body.user,
          nom: req.body.nom,
          prenom: req.body.prenom,
          civilite: req.body.civilite,
          montant_garant: req.body.montant_garant,
          nom_garant: req.body.nom_garant,
          duree: req.body.duree,
          montant: req.body.montant,
          type: req.body.type,
          credit_cour: req.body.credit_cour,
          statut_prof: req.body.statut_prof,
          revenu: req.body.revenu,
          gouvernorat: req.body.gouvernorat,
          famille: req.body.famille,
          enfants: req.body.enfants,
          num_piece: req.body.num_piece,
          tel: req.body.tel,
          date_naissance: req.body.date_naissance,
          document1: req.body.document1,
          document2: req.body.document2,
          document3: req.body.document3,
          document4: req.body.document4

        })

        const result = await demande.save();
        res.json({ message: 'new demande created', data: result, status: 200 })
      }
    }

    catch (error) {
      console.log(error.message);
      res.json({ message: 'error' + error, data: error, status: 500 });
    }

  },

  getAlldemande: function (req, res) {
    demandeModel.find({}).populate('user').exec((err, demande) => {
      if (err) {
        res.json({ messsage: 'error', data: null, statut: 500 })
      }
      else {
        res.json({ messsage: 'All credit application in BD', data: demande, statut: 200 })
      }
    })
  },

  getdemandeById: function (req, res) {
    demandeModel.findById({ _id: req.params.id }).populate('user').exec((err, demande) => {
      if (err) {
        res.json({ messsage: 'error', data: null, statut: 500 })
      }
      else {
        res.json({ messsage: 'credit application by id in BD', data: demande, statut: 200 })
      }
    })
  },


  deletedemandeById: function (req, res) {
    demandeModel.findByIdAndDelete({ _id: req.params.id }, function (err, demande) {
      if (err) {
        res.json({ messsage: 'error', data: null, statut: 500 })
      }
      else {
        res.json({ messsage: 'credit application deleted successfuly', data: demande, statut: 200 })
      }
    })
  },

  updatedemandeById: function (req, res,next) {

    req.demande = {
      isvalid: true,
      to: req.body.to
    }

    let data = {
      isvalid:true,
      to: req.demande.to,
    }

    demandeModel.findByIdAndUpdate({ _id: req.params.id},data, { new: true }, function (err, demande) {
      if (err) {
        res.json({ messsage: 'error update'+err, data: null, statut: 500 })
      }
      else {
        res.json({ messsage: 'credit application updated successfuly', data: demande, statut: 200 })
      }
    })

  },


  getdemandeByUser: function (req, res) {

    demandeModel.find({ user: req.params.id }).populate('user').exec((err, demande) => {

      if (err) {


        res.json({ message: 'error get demande by userid ' + err, data: null, status: 500 })
      }

      else {

        res.json({ message: 'demande by userid exist ', data: demande, status: 200 })
      }

    })

  },
}




