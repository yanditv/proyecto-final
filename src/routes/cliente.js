// routes/clienteRoutes.js
const express = require("express");
const router = express.Router();
const clienteController = require("../controllers/clienteController");

/* GET Clientes */
/* #swagger.tags = ['Clientes'] */
/* #swagger.summary = 'Consultar todos los clientes' */
/* #swagger.description = 'Obtiene una lista de todos los clientes registrados en el sistema.' */
/* #swagger.responses[200] = {
  description: 'Lista de clientes obtenida exitosamente.',
  schema: [
    {
      id: 1,
      nombres: "Juan",
      apellidos: "Pérez",
      cedula: "0123456789",
      correo: "juan.perez@example.com",
      telefono: "0991234567",
      fechaNacimiento: "1990-01-01"
    }
  ]
} */
router.get("/", clienteController.getClientes);

/* POST Cliente */
/* #swagger.tags = ['Clientes'] */
/* #swagger.summary = 'Crear un nuevo cliente' */
/* #swagger.description = 'Agrega un nuevo cliente al sistema.' */
/* #swagger.parameters['body'] = {
  in: 'body',
  description: 'Información del cliente',
  required: true,
  schema: {
    nombres: "Juan",
    apellidos: "Pérez",
    cedula: "0123456789",
    correo: "juan.perez@example.com",
    telefono: "0991234567",
    fechaNacimiento: "1990-01-01"
  }
} */
/* #swagger.responses[201] = {
  description: 'Cliente creado exitosamente.',
  schema: {
    id: 1,
    nombres: "Juan",
    apellidos: "Pérez",
    cedula: "0123456789",
    correo: "juan.perez@example.com",
    telefono: "0991234567",
    fechaNacimiento: "1990-01-01"
  }
} */
/* #swagger.responses[400] = {
  description: 'Datos del cliente inválidos o incompletos.'
} */
router.post("/", clienteController.createCliente);

/* PUT Cliente */
/* #swagger.tags = ['Clientes'] */
/* #swagger.summary = 'Actualizar un cliente existente' */
/* #swagger.description = 'Actualiza la información de un cliente existente identificado por su ID.' */
/* #swagger.parameters['id'] = {
  in: 'path',
  description: 'ID del cliente',
  required: true,
  type: 'integer'
} */
/* #swagger.parameters['body'] = {
  in: 'body',
  description: 'Información actualizada del cliente',
  required: true,
  schema: {
    nombres: "Juan",
    apellidos: "Pérez",
    cedula: "0123456789",
    correo: "juan.perez@example.com",
    telefono: "0991234567",
    fechaNacimiento: "1990-01-01"
  }
} */
/* #swagger.responses[200] = {
  description: 'Cliente actualizado exitosamente.',
  schema: {
    id: 1,
    nombres: "Juan",
    apellidos: "Pérez",
    cedula: "0123456789",
    correo: "juan.perez@example.com",
    telefono: "0991234567",
    fechaNacimiento: "1990-01-01"
  }
} */
/* #swagger.responses[404] = {
  description: 'Cliente no encontrado.'
} */
router.put("/:id", clienteController.updateCliente);

/* DELETE Cliente */
/* #swagger.tags = ['Clientes'] */
/* #swagger.summary = 'Eliminar un cliente existente' */
/* #swagger.description = 'Elimina un cliente del sistema identificado por su ID.' */
/* #swagger.parameters['id'] = {
  in: 'path',
  description: 'ID del cliente',
  required: true,
  type: 'integer'
} */
/* #swagger.responses[200] = {
  description: 'Cliente eliminado exitosamente.'
} */
/* #swagger.responses[404] = {
  description: 'Cliente no encontrado.'
} */
router.delete("/:id", clienteController.deleteCliente);

module.exports = router;
