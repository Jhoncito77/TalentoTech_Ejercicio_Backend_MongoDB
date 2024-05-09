const express = require('express');
const router = express.Router();
const {check} = require("express-validator")
const AuthControler = require("../controllers/AuthController")
const auth = require('../middleware/auth');

//autenticar un usuario --> // api/auth
router.post('/',[
    check("correo","digite un correo valido").isEmail(),
    check("password","El password debe ser minimo de 8 caracteres").isLength({min:8})
],AuthControler.autenticarUsuario);

router.get('/', auth, AuthControler.usuarioAutenticado);

module.exports = router;