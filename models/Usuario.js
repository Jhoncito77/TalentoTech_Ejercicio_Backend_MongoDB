const mongoose = require('mongoose');

const usuarioSchema = mongoose.Schema({
    nombres:{
        type:String,
        required:true,
        trim:true
    },
    correo:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        trim:true
    },
    registros:{
        type:Date,
        default:Date.now()
    }
},{versionkey:false});

module.exports = mongoose.model('Usuario',usuarioSchema);