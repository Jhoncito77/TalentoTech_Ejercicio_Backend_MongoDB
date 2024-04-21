const mongoose = require('mongoose');
require('dotenv').config();

//funcion para hacer la conexion

const conectarDB = ()=>{
    mongoose.connect(process.env.MONGO_URL)
    .then(()=>console.log('Conectado a MongoDB'))
    .catch((err)=>console.log(err));
}

module.exports = conectarDB;