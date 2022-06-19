
const mongoose = require('mongoose')
const userModel = require('./userModel')
const Schema = mongoose.Schema
const  comiteSchema = new Schema({


demande:[{

    type:mongoose.Schema.Types.ObjectId,
    ref:'demande'

}],

echeancier:[{

    type:mongoose.Schema.Types.ObjectId,
    ref:'echeancier'

}],


},


{timestamps:true} // Date de modification et de creation de schema

)


module.exports = userModel.discriminator('comite',comiteSchema)