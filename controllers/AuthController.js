const Usuario = require('../models/Usuario');
const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

exports.autenticarUsuario = async (req, res) => {
    //revisar errores
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({ errores: errores.array() });
    }

    const { correo, password } = req.body;

    try {
        //validar si hay un usuario conectado
        let usuario = await Usuario.findOne({ correo });
        if (!usuario) {
            return res.status(400).json({ msg: "El usuario no esta registrado" });
        }
        //revisamos el password
        const passwordCorrecto = await bcryptjs.compare(password, usuario.password);
        if (!passwordCorrecto) {
            return res.status(400).json({ msg: "La contraseña es incorrecta" });
        }
        //si hasta aca esta todo bien, se firma el token
        const payload = {
            usuario: { id: usuario.id }
        };

        jwt.sign(payload, process.env.SECRETA, {
            expiresIn: 43200 //1 hora
        },
        (error,token)=>{
            if(error) throw error;
            //confirmacion
            res.json({token});
        }
        );
    }catch(error){
        console.error("Hay un error");
        console.log(error);
        res.status(400).send("Hay un error");
    }
}

exports.usuarioAutenticado = async(req,res)=>{
    try{
        const usuario = await Usuario.findById(req.usuario.id);
        res.json({usuario})
    }catch(errores){
        res.status(400).json({msg:"hubo un error"});
    }
    
}