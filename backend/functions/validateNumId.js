// Middleware para validar se o ID é um número
function validateNumId(id) {
    const numericId = Number(id);

    if (!Number.isInteger(numericId)) {
        return 'Id inválido!';
    }

    return null;
}

module.exports = { validateNumId };