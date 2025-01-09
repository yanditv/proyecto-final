const request = require("supertest");
const express = require("express");

// Simula la configuración del servidor y las rutas
const app = express();
app.use(express.json());

// Rutas CRUD de ejemplo para "users"
const usersData = [
    { id: 1, name: "John Doe", email: "john@example.com" },
    { id: 2, name: "Jane Doe", email: "jane@example.com" },
];

let users;

beforeEach(() => {
    // Restaura los datos iniciales antes de cada prueba
    users = [...usersData];
});

// GET - Obtener todos los usuarios
app.get("/users", (req, res) => {
    res.status(200).json(users);
});

// POST - Crear un nuevo usuario
app.post("/users", (req, res) => {
    const { name, email } = req.body;
    if (!name || !email) {
        return res.status(400).json({ error: "Name and email are required." });
    }
    const newUser = { id: users.length + 1, name, email };
    users.push(newUser);
    res.status(201).json(newUser);
});

// PUT - Actualizar un usuario por ID
app.put("/users/:id", (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;
    const user = users.find((u) => u.id === parseInt(id));

    if (!user) {
        return res.status(404).json({ error: "User not found." });
    }
    if (!name || !email) {
        return res.status(400).json({ error: "Name and email are required." });
    }

    user.name = name;
    user.email = email;
    res.status(200).json(user);
});

// DELETE - Eliminar un usuario por ID
app.delete("/users/:id", (req, res) => {
    const { id } = req.params;
    const index = users.findIndex((u) => u.id === parseInt(id));

    if (index === -1) {
        return res.status(404).json({ error: "User not found." });
    }

    users.splice(index, 1);
    res.status(204).send();
});



describe("Rutas CRUD para /users", () => {
    it("GET /users - Debe retornar todos los usuarios", async () => {
        const response = await request(app).get("/users");
        expect(response.status).toBe(200);
        expect(response.body).toEqual([
            { id: 1, name: "John Doe", email: "john@example.com" },
            { id: 2, name: "Jane Doe", email: "jane@example.com" },
        ]);
    });

    it("POST /users - Debe crear un nuevo usuario", async () => {
        const newUser = { name: "Alice", email: "alice@example.com" };
        const response = await request(app).post("/users").send(newUser);

        expect(response.status).toBe(201);
        expect(response.body).toEqual({
            id: 3, // Asignado automáticamente
            name: "Alice",
            email: "alice@example.com",
        });
    });

    it("POST /users - Debe devolver un error si faltan datos", async () => {
        const response = await request(app).post("/users").send({ name: "Alice" });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({ error: "Name and email are required." });
    });

    it("PUT /users/:id - Debe actualizar un usuario existente", async () => {
        const updatedUser = { name: "John Updated", email: "johnupdated@example.com" };
        const response = await request(app).put("/users/1").send(updatedUser);

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            id: 1,
            name: "John Updated",
            email: "johnupdated@example.com",
        });
    });

    it("PUT /users/:id - Debe devolver un error si el usuario no existe", async () => {
        const response = await request(app).put("/users/999").send({
            name: "Nonexistent User",
            email: "nonexistent@example.com",
        });

        expect(response.status).toBe(404);
        expect(response.body).toEqual({ error: "User not found." });
    });

    it("DELETE /users/:id - Debe eliminar un usuario existente", async () => {
        const response = await request(app).delete("/users/1");
        expect(response.status).toBe(204);

        // Verifica que el usuario fue eliminado
        const getResponse = await request(app).get("/users");
        expect(getResponse.body).toEqual([
            { id: 2, name: "Jane Doe", email: "jane@example.com" },
        ]);
    });

    it("DELETE /users/:id - Debe devolver un error si el usuario no existe", async () => {
        const response = await request(app).delete("/users/999");
        expect(response.status).toBe(404);
        expect(response.body).toEqual({ error: "User not found." });
    });
});
