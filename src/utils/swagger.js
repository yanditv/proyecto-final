const swaggerAutogen = require("swagger-autogen")();

const doc = {
    info: {
        title: "API de Administración de Clientes",
        description: "API REST para gestionar clientes de un comercio",
    },
    host: "localhost:3000",
    schemes: ["http"],
    securityDefinitions: {
        ApiKeyAuth: {
            type: "apiKey",
            name: "x-api-key",
            in: "header",
        },
    },
};

const outputFile = "./swagger-output.json"; // Archivo donde se generará la documentación
const endpointsFiles = ["./src/app.js"]; // Archivos donde tienes definidos tus endpoints

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    console.log("Documentación generada exitosamente");
});

