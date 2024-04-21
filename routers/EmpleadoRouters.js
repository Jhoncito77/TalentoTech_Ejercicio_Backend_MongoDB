const express = require('express');
const router = express.Router();
const empleadoController = require('../controllers/EmpleadoController');

//aca van las rutas del CRUD
router.post('/',empleadoController.agregarEmpleado);
router.get('/',empleadoController.mostrarEmpleados);
router.get('/:id',empleadoController.buscarEmpleado);
router.delete('/:id',empleadoController.eliminarEmpleado);
router.put('/:id',empleadoController.editarEmpleado);

module.exports = router;