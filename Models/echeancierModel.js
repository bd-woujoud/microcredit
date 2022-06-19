const mongoose = require('mongoose')
const Schema = mongoose.Schema
const  echeancierSchema = new Schema({

loanAmount:{

        type:Number,
        required:true, // obligatoire

    },

loanTerm:{
        type:Number,
        required:true, // obligatoire
},

interestRate:{
        type:Number,
        required:true, // obligatoire
},

date:{
        type:Date,
        required:true, // obligatoire
},
payementMethod:{
        type:String,
        required:true, // obligatoire
},
// nom:{
//         type:String,
//         required:true, // obligatoire
// },
// Num_piece:{
//         type:Number,
//         required:true, // obligatoire
// },


demande:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'demande',
    },

},

{timestamps:true} // Date de modification et de creation de schema

)

module.exports = mongoose.model('echeancier',echeancierSchema)