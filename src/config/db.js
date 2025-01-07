const mongoose = require("mongoose");
require('dotenv').config(); // Cargar variables de entorno desde el archivo .env

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB conectado: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error en la conexión a MongoDB: ${error.message}`);
        process.exit(1); // Finalizar aplicación en caso de error
    }
};

module.exports = connectDB;