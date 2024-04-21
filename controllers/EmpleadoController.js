const Empleado = require('../models/Empleado');

// funcion agregar Empleado

exports.agregarEmpleado = async(req,res)=>{
    try{
        let empleado = new Empleado(req.body);
        await empleado.save();
        res.send('Empleado agregado')
    }catch(err){
        console.log(err);
        res.status(500).send('Error al intentar agregar un empleado');
    }
}

//funcion mostrar empelados
exports.mostrarEmpleados = async(req, res)=>{
    try{
        const empleados = await Empleado.find();
        res.json(empleados)
    }catch(err){
        console.log(err);
        res.status(500).send('Error al consultar los empleados');
    }
}

//funcion para buscar un empleado por ID
exports.buscarEmpleado = async(req,res)=>{
    try{
        let empleado = await Empleado.findById(req.params.id);
        if(!empleado){
            res.status(404).send({msg:'No hay un empleado con el id solicitado'});
            return
        }
        res.json(empleado)
    }catch(err){
        console.log(err);
        res.status(500).send('Error al buscar el empleado');
    }
}


// funcion para eliminar un empleado
exports.eliminarEmpleado = async(req,res)=>{
    try{
        let empleado = await Empleado.findById(req.params.id);
        if(!empleado){
            res.status(404).json({msg:'El empelado a eliminar no existe'});
            return;
        }
        await Empleado.findOneAndDelete({_id: req.params.id});
        res.json({msg:'El empleado a sido eliminado'});
        return;
    }catch(err){
        console.log(err);
        res.status(500).send('Error al eliminar el empleado');
    }
}

//funcion para editar un empleado
exports.editarEmpleado = async (req,res)=>{
    try{
        const {nombres,apellidos,cargo,cedula,correo,telefono,direccion} = req.body;
        let empleado = await Empleado.findById(req.params.id);
        if(!empleado){
            res.status(404).json({msg:'El empleado a editar no existe'});
            return;
        }
        empleado.nombres = nombres;
        empleado.apellidos = apellidos;
        empleado.cargo = cargo;
        empleado.cedula = cedula;
        empleado.correo = correo;
        empleado.telefono = telefono;
        empleado.direccion = direccion;

        empelado = await Empleado.findOneAndUpdate({_id: req.params.id},empleado,{new:true});
        res.json(empleado);
    }catch(err){
        console.log(err);
        res.status(500).send('Error al editar al empleado');
    }
}