require("dotenv").config();
const express = require("express");
const swaggerUi = require("swagger-ui-express");
const clienteRoutes = require("./routes/cliente");
const swaggerFile = require("./utils/swagger-output.json");
const connectDB = require("./config/db"); // Importa la función de conexión
const app = express();

app.use(express.json());

// Rutas
app.use("/api/clientes", clienteRoutes);

// Documentación Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

// Conectar a MongoDB y luego iniciar el servidor
const startServer = async () => {
    await connectDB(); // Esperar a que se conecte con la base de datos

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Servidor escuchando en http://localhost:${PORT}`);
        console.log(`Documentación en http://localhost:${PORT}/api-docs`);
    });
};

startServer(); // Llamar a la función que conecta la DB y luego inicia el servidor
