// importamos el modelo
const cliente = require('../models/Cliente');

// funcion agregar cliente

exports.agregarCliente = async(req,res)=>{
    try{
        let clientes = new cliente(req.body);
        await clientes.save();
        res.send({msg:'Cliente agregado'})
    }catch(err){
        console.log(err);
        res.status(500).send('Error al intentar agregar cliente');
    }
}

//funcion mostrar clientes
exports.mostrarClientes = async(req, res)=>{
    try{
        const clientes = await cliente.find();
        res.json({clientes})
    }catch(err){
        console.log(err);
        res.status(500).send('Error al consultar clientes');
    }
}

//funcion para buscar un cliente por ID
exports.buscarCliente = async(req,res)=>{
    try{
        let clienteEncontrado = await cliente.findById(req.params.id);
        if(!clienteEncontrado){
            res.status(404).send({msg:'No hay un cliente con el id solicitado'});
            return
        }
        res.json(clienteEncontrado)
    }catch(err){
        console.log(err);
        res.status(500).send('Error al buscar el cliente');
    }
}


// funcion para eliminar un cliente
exports.eliminarCliente = async(req,res)=>{
    try{
        let clienteAEliminar = await cliente.findById(req.params.id);
        if(!clienteAEliminar){
            res.status(404).json({msg:'El cliente a eliminar no existe'});
            return;
        }
        await cliente.findOneAndDelete({_id: req.params.id});
        res.json({msg:'El cliente a sido eliminado'});
        return;
    }catch(err){
        console.log(err);
        res.status(500).send('Error al eliminar el cliente');
    }
}

//funcion para editar un cliente
exports.editarCliente = async (req,res)=>{
    try{
        const {nombres,apellidos,cedula,correo,telefono,direccion} = req.body;
        let clienteAEditar = await cliente.findById(req.params.id);
        if(!clienteAEditar){
            res.status(404).json({msg:'El cliente a editar no existe'});
            return;
        }
        clienteAEditar.nombres = nombres;
        clienteAEditar.apellidos = apellidos;
        clienteAEditar.cedula = cedula;
        clienteAEditar.correo = correo;
        clienteAEditar.telefono = telefono;
        clienteAEditar.direccion = direccion;

        clienteAEditar = await cliente.findOneAndUpdate({_id: req.params.id},clienteAEditar,{new:true});
        res.json(clienteAEditar);
    }catch(err){
        console.log(err);
        res.status(500).send({msg:'Error al editar el cliente'});
    }
}


