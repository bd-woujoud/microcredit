
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const demandeSchema = new Schema({

    nom: {

        type: String,
        required: true,
    }
    ,

    civilite:{

        type:String,
       required:true, 
    },

    prenom:{

        type:String,
        required:true, 
     },

    date_naissance:{
        type:Date,
       required:true, 
    },

    num_piece:{

        type:Number,
        required:true, 
    },

    // email:{

    //     type:String,
    //    required:true, 
    // },

    tel:{

        type:Number,
        required:true, 
    },

    famille:{

        type:String,
        required:true, 
    },

    enfants:{

        type:String,
        required:true, 
    },

    gouvernorat:{

        type:String,
       required:true, 

    },

    statut_prof:{

        type:String,
        required:true, 
    },

    revenu:{
        type:Number,
        required:true
    },

    credit_cour:{
        type:String,
        required:true, 
    },

    type:{

        type:String,
        required:true, 
    },

    montant:{

        type:Number,
        required:true, 
    },

    duree:{

        type:Number,
        required:true, 
    },

    nom_garant:{

        type:String,
        required:true,
    },

    montant_garant:{

        type:Number,
        required:true, 
    },

    document1:{

        type:String,
        required:true, 
    },
    document2:{

        type:String,
        required:true, 
    },
    document3:{

        type:String,
        required:true, 
    },
    document4:{

        type:String,
        required:true, 
    },

    interestRate: {type:String},
    date: {type:Date},
    loanAmount: {type:String},
    loanTerm: {type:String},
    paymentMethod: {type:String},


    user: {

        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',

    },

    isvalid: {

        type: Boolean,
        default: false
    }

}, { timestamps: true } // Date de modification et de creation de schema
)

module.exports = mongoose.model('demande', demandeSchema)