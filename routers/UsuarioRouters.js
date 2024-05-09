const express = require('express');
const router = express.Router();
const {check} = require("express-validator")
const usuarioController = require("../controllers/UsuarioController")


//creamos un usuario --> // api/usuarios
router.post('/',[
    check("nombres","El nombre es obligatorio").not().isEmpty(),
    check("correo","Agregue un correo valido").isEmail(),
    check("password","La contraseña debe ser minimo de 8 caracteres").isLength({min:8})
],usuarioController.crearUsuario);



module.exports = router;