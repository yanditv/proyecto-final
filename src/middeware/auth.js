module.exports = (req, res, next) => {
    const apiKey = req.headers["x-api-key"];
    if (!apiKey || apiKey !== process.env.API_KEY) {
        return res.status(403).json({ message: "No autorizado. API Key inválida." });
    }
    next();
};
