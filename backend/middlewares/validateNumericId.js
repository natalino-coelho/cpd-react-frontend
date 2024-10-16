// Middleware para validar se o ID é um número
function validateNumericId(req, res, next) {
    const { id } = req.params;
    const numericId = Number(id);

    if (!Number.isInteger(numericId)) {
        return res.status(400).json({ message: 'Id inválido!' });
    }

    // Adiciona o id numérico à requisição para uso posterior, se necessário
    req.numericId = numericId;

    next();
}

module.exports = { validateNumericId };
