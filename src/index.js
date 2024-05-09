const express = require('express');
const conectarDB = require('../config/db');
const cors = require('cors');

// configuracion express y puerto
const app = express();
const port = 5000;
app.use(express.json());
app.use(cors());
// rutas de los modulos
app.use('/api/clientes', require('../routers/routersCliente'));
app.use('/api/empleados', require('../routers/EmpleadoRouters'));
app.use('/api/auth', require('../routers/AuthRouters'))
app.use('/api/usuarios', require('../routers/UsuarioRouters'))

// enlazamos la conexion de la base de datos
conectarDB();


//configuracion del puerto a utilizar en el servidor
app.listen(port,()=>console.log('nuestro servidor esta conectado al puerto ',port));


// prueba para navegador
app.get('/',(req,res)=>{
    res.send('El servidor esta iniciado');
})