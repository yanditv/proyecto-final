const mongoose = require("mongoose");

const clienteSchema = new mongoose.Schema({
    nombres: { type: String, required: true },
    apellidos: { type: String, required: true },
    cedula: { type: String, required: true, unique: true },
    correo: { type: String, required: true, match: /\S+@\S+\.\S+/ },
    telefono: { type: String, required: true },
    fechaNacimiento: { type: String, required: true },
});

module.exports = mongoose.model("Cliente", clienteSchema);
