const Cliente = require("../models/cliente");
const { validateCedula } = require("../utils/cedulaValidator");

exports.getClientes = async (req, res) => {
    try {
        const clientes = await Cliente.find();
        res.status(200).json(clientes);
    } catch (err) {
        res.status(500).json({ message: "Error al obtener los clientes." });
    }
};

exports.createCliente = async (req, res) => {
    const { nombres, apellidos, cedula, correo, telefono, fechaNacimiento } = req.body;

    // Validar datos requeridos
    if (!nombres || !apellidos || !cedula || !correo || !telefono || !fechaNacimiento) {
        return res.status(400).json({ message: "Todos los datos son obligatorios." });
    }

    // Validar cédula
    if (!validateCedula(cedula)) {
        return res.status(400).json({ message: "Cédula inválida." });
    }

    try {
        const clienteExistente = await Cliente.findOne({ cedula });
        if (clienteExistente) {
            return res.status(400).json({ message: "Ya existe un cliente con esa cédula." });
        }

        const nuevoCliente = new Cliente({ nombres, apellidos, cedula, correo, telefono, fechaNacimiento });
        await nuevoCliente.save();

        res.status(201).json(nuevoCliente);
    } catch (err) {
        res.status(500).json({ message: "Error al crear el cliente." });
    }
};

exports.updateCliente = async (req, res) => {
    const { id } = req.params;
    const { nombres, apellidos, cedula, correo, telefono, fechaNacimiento } = req.body;

    try {
        const clienteActualizado = await Cliente.findByIdAndUpdate(
            id,
            { nombres, apellidos, cedula, correo, telefono, fechaNacimiento },
            { new: true }
        );

        if (!clienteActualizado) {
            return res.status(404).json({ message: "Cliente no encontrado." });
        }

        res.status(200).json(clienteActualizado);
    } catch (err) {
        res.status(500).json({ message: "Error al actualizar el cliente." });
    }
};

exports.deleteCliente = async (req, res) => {
    const { id } = req.params;

    try {
        const clienteEliminado = await Cliente.findByIdAndDelete(id);

        if (!clienteEliminado) {
            return res.status(404).json({ message: "Cliente no encontrado." });
        }

        res.status(200).json({ message: "Cliente eliminado correctamente." });
    } catch (err) {
        res.status(500).json({ message: "Error al eliminar el cliente." });
    }
};
