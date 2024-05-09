const Usuario = require('../models/Usuario');
const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

exports.crearUsuario = async (req, res) => {
    //revisar errores
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({ errores: errores.array() });
    }

    const { correo, password } = req.body;

    try {
        //Se verifica si el usuario registrado es unico
        let usuario = await Usuario.findOne({ correo });
        if (usuario) {
            return res.status(400).json({ msg: "El usuario ingresado ya existe" });
        }
        //si el usuario no existe se crea un nuevo usuario
        usuario = new Usuario(req.body);
        usuario.password = await bcryptjs.hash(password, 8); //8 caracteres minimos
        
        //guardamos el usuario en la base de datos
        await usuario.save();
        
        //si hasta aca esta todo bien, se firma el token
        const payload = {
            usuario: { id: usuario.id }
        };

        jwt.sign(payload, process.env.SECRETA, {
            expiresIn: 3600 
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