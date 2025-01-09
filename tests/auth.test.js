const request = require("supertest");
const express = require("express");
//require("dotenv").config();

// Importar el middleware
const auth = require("../src/middlewares/auth");

// Configurar la app de prueba con una ruta protegida
const app = express();
app.use(express.json());
app.get("/protected", auth, (req, res) => {
    res.status(200).json({ message: "Ruta protegida accedida correctamente" });
});

describe("Middleware de autenticación", () => {
    it("Debe rechazar una solicitud sin API Key", async () => {
        const response = await request(app).get("/protected");
        expect(response.status).toBe(401);
        expect(response.body).toEqual({ error: "Acceso no autorizado: falta la API Key." });
    });

    it("Debe rechazar una solicitud con API Key inválida", async () => {
        const response = await request(app)
            .get("/protected")
            .set("x-api-key", "clave-invalida");
        expect(response.status).toBe(403);
        expect(response.body).toEqual({ error: "Acceso denegado: API Key inválida." });
    });

    // it("Debe permitir el acceso con una API Key válida", async () => {
    //     const response = await request(app)
    //         .get("/protected")
    //         .set("x-api-key", process.env.API_KEY);
    //     expect(response.status).toBe(200);
    //     expect(response.body).toEqual({ message: "Ruta protegida accedida correctamente" });
    // });
});
