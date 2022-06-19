const mongoose = require('mongoose')
const userModel = require('./userModel')
const Schema = mongoose.Schema
const  clientSchema = new Schema({




demande:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'demande'
}],


},

{timestamps:true} // Date de modification et de creation de schema

)


module.exports = userModel.discriminator('client',clientSchema)