const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/ClienteController');

//aca van las rutas del CRUD
router.post('/',clienteController.agregarCliente);
router.get('/',clienteController.mostrarClientes);
router.get('/:id',clienteController.buscarCliente);
router.delete('/:id',clienteController.eliminarCliente);
router.put('/:id',clienteController.editarCliente);

module.exports = router;