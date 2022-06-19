
const userModel = require('../Models/userModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const nodemailer = require('nodemailer')

const SignToken = (uid, role) => { // utilise pour le login 
  return jwt.sign({
    id: uid,
    role: role,
  }, process.env.PRIVATE_KEY, { expiresIn: '1h' });// sauvegarde de cle secret jwt_secret dans le dossier dotenv
}

module.exports = {

  register: async (req, res) => {
    const { email, password, role } = req.body;
    userModel.findOne({ email }, function (err, user) {
      if (err)
        return res.status(500).json({ msg: err.message, error: true })
      if (user)
        return res.status(400).json({ msg: "User already exist", error: true })
      else {
        const newUser = new userModel(req.body)
        newUser.email = req.body.email,
          newUser.password = req.body.password,
          newUser.nom = req.body.nom,
          newUser.prenom = req.body.prenom,
          newUser.NumContact = req.body.NumContact,
          //  newUser.secteur = req.body.secteur,
          // newUser.adresse = req.body.adresse,
          newUser.role = req.body.role,

          newUser.save((err, user) => {
            if (err)
              return res.status(500).json({ msg: err.message, error: true })
            else {
              return res.status(200).json({ isAuthenticated: true, user: { email, role }, error: false })
            }
          })
      }
    }
    )
  },


  login: (req, res) => {
    const { _id, email, role, nom, prenom, avatar, NumContact } = req.user;
    const token = SignToken(_id);
    res.cookie("access_token", token, { maxAge: 3600 * 1000, httpOnly: true, sameSite: true });
    return res.status(200).json({ isAuthenticated: true, user: { email, role, token, nom, prenom, avatar, NumContact } })
  },


  logout: (req, res) => {
    res.clearCookie("access_token");
    res.status(200).json({
      isConnected: false,
      message: " success logout"
    })
  },


  // Admin and normal user can access
  protectedData: function (req, res) {
    return res.status(200).json({ data: "Protected data..." })
  },


  // Only Admin can access
  AdminprotecteData: function (req, res) {

    const { role } = req.user;
    if (role === "admin")

      return res.status(200).json({ data: "Admin Protected data..." })
    return res.status(403).json({ data: "" })

  },


  //Check auth status everytime front-end app refreshes
  authenticated: function (req, res) {
    const { email, role, nom, prenom, avatar, NumContact, _id } = req.user;
    return res.status(200).json({ isAuthenticated: true, user: { _id, email, role, nom, prenom, avatar, NumContact } })
  },



  getComite: function (req, res) {

    userModel.find({role:"comite"}).populate('demande').exec((err, user)=> {

      if (err) {
        res.json({ messsage: 'error ', data: null, statut: 500 })
      }

      else {
        res.json({ messsage: 'all agent in BD', data: user, statut: 200 })
      }

    })

  },

  
  getuserById: function (req, res) {

    userModel.findById({ _id: req.params.id }).populate('demande').exec ((err, user)=> {
      if (err) {
        res.json({ messsage: 'error', data: null, statut: 500 })
      }
      else {
        res.json({ messsage: 'user application by id in BD', data: user, statut: 200 })
      }
    })
  },

  getAlluser: function (req, res,next){
  


    userModel.find({}).populate('demande').exec ((err, user)=> {
      if (err) {
        res.json({ messsage: 'error', data: null, statut: 500 })
      }
      else {
        res.json({ messsage: 'user application by id in BD', data: user, statut: 200 })
      }
    })

 },


  deletecomiteById: function (req, res) {
    userModel.findByIdAndDelete({ _id: req.params.id }, function (err, comite) {
      if (err) {
        res.json({ messsage: 'error', data: null, statut: 500 })
      }
      else {
        res.json({ messsage: 'comite deleted successfuly', data: comite, statut: 200 })
      }
    })
  },


  updateuserById: async function (req, res) {

    const passwordhash = await bcrypt.hash(req.body.password, 10) // cryptage password 

    req.body.password = passwordhash

    userModel.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true }, function (err, user) {
      
      if (err) {
        res.json({ messsage: 'error ', data: null, statut: 500 })
      }
      else {
        res.json({ messsage: 'user updated successfuly', data: user, statut: 200 })
      }
    })
  },


  sendMail: function (req, res,next) {
    var transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      service: "gmail",
      port: 465,
      secure: true,
      auth: {
        user: process.env.MAIL,// generated ethereal user
        pass: process.env.PASS // generated ethereal password
      }
    });

    console.log(process.env.PASS);

    var mailOptions = {
      from: process.env.MAIL,  // sender address
      to: req.body.to,// list of receivers
      subject: "demande de microcrédit", // Subject line
      text: req.body.text, // plain text body
      html: "Chers client, Votre demande de microcrédit est acceptée veuillez s'il vous plait visitez notre organisation pour mieu discuter concernant le reste des procédures"
   
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        res.json({ message: 'errorsss ' + error });
      } else {
        res.json({ message: 'email sent'  });
      }
    })
    next()
  },




  uploadavatar: (req, res) => {
    const data = {
      avatar: req.file.filename,
    };

    userModel.findByIdAndUpdate({ _id: req.params.id }, data, (err, user) => {
      if (err) {
        res.status(500).json({ message: "avatar not uploaded" });
      } else {
        userModel.findById({ _id: user.id }, (err, user) => {
          if (err) {
            res.json("error");
          } else {
            res.status(200).json({
              message: "user updated",
              data: user,
            });
          }
        });
      }
    });
  },
}









