//Função para validar CPF
function validateCPF(cpf) {
    // Remover caracteres não numéricos do CPF
    cpf = cpf.replace(/[^\d]/g, '');
    // Verificar se o CPF tem 11 dígitos
    if (cpf.length !== 11) {
        return false;
    }
    // Verificar se todos os dígitos são iguais (caso comuns de CPFs inválidos)
    if (/^(\d)\1{10}$/.test(cpf)) {
        return false;
    }
    // Calcular o primeiro dígito verificador
    let sum = 0;
    for (let i = 0; i < 9; i++) {
        sum += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let digit1 = 11 - (sum % 11);
    if (digit1 >= 10) {
        digit1 = 0;
    }
    // Verificar o primeiro dígito verificador
    if (parseInt(cpf.charAt(9)) !== digit1) {
        return false;
    }
    // Calcular o segundo dígito verificador
    sum = 0;
    for (let i = 0; i < 10; i++) {
        sum += parseInt(cpf.charAt(i)) * (11 - i);
    }
    let digit2 = 11 - (sum % 11);
    if (digit2 >= 10) {
        digit2 = 0;
    }
    // Verificar o segundo dígito verificador
    if (parseInt(cpf.charAt(10)) !== digit2) {
        return false;
    }
    // CPF válido
    return true;
}

module.exports = { validateCPF };