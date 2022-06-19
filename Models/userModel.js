const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')
const userSchema = new Schema({

    nom: { type: String, required: true, },
    prenom: { type: String, required: true, },
    
    secteur: {
        type: String,
        //required:true, 
    },

    adresse: {
        type: String,
        // required:true, 
    },

    NumContact: {
        type: Number,
        required: true,
    },

    email: {
        type: String,
        required: true,
    },

    password: {

        type: String,
        required: true,
    },




    echeancier: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'echeancier'
    }],

    demande:[{

        type: mongoose.Schema.Types.ObjectId,
        ref:'demande',

    }], 



    role: {
        type: String,
        enum: ['admin', 'comite', 'client'],
        default: 'client'
    },

    avatar: {

        type: String,
        default: '1652792401803-admin.png'
    }

},
    { timestamps: true } // Date de modification et de creation de schema
)

userSchema.methods.comparePassword = function (password, cb) {
    bcrypt.compare(password, this.password, (err, isMatch) => {
        if (err)
            return cb(err)
        if (!isMatch)
            return cb(null, false)
        return cb(null, this)
    })
}

//Presave middleware - NOTE: if use arrow function, this becomes empty object, and we can't use isModified()
userSchema.pre("save", function (next) {
    //If there's no change to password field (no change, no add new), call next()
    if (!this.isModified('password')) {
        next()
    }


    bcrypt.hash(this.password, 10, (err, hashedPassword) => {
        if (err)
            return next(err)
        this.password = hashedPassword;
        return next()
    })
})


userSchema.virtual('demandes', {
    ref: 'demande',
    localField: '_id',
    foreignField: 'user'
});


module.exports = mongoose.model('user', userSchema)