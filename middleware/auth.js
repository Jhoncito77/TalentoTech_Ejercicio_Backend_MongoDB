const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
    //se va a leer el token del header
    const token = req.header("x-auth-token");
    //comprobar que si se tiene un token
    if (!token) {
        return res.status(400).json({ msg: "Acceso denegado, ingrese con un token" })
    }
    //validar el token
    try {
        const cifrado = jwt.verify(token.process.env.SECRETA)
        req.usuario = cifrado.usuario;
        next()
    } catch (error) {
        res.status(400).json({msg:"Token invalido"})
    }
}