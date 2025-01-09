const auth = (req, res, next) => {
    const apiKey = req.header("x-api-key");

    if (!apiKey) {
        return res.status(401).json({ error: "Acceso no autorizado: falta la API Key." });
    }

    if (apiKey !== process.env.API_KEY) {
        return res.status(403).json({ error: "Acceso denegado: API Key inválida." });
    }
};
module.exports = auth;