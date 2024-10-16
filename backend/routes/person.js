const express = require('express');
const router = express.Router();
const moment = require('moment');
const { validateNumericId } = require('../middlewares/validateNumericId');
const { validateCPF } = require('../functions/validateCPF');
const { validateNumId} = require('../functions/validateNumId');

const pool = require('../pool/pool');

//Função para verificar se o CPF já está cadastrado
async function cpfExists(cpf) {
    try {
        const sql = 'SELECT COUNT(*) AS count FROM person WHERE cpf = ?';
        const [rows] = await pool.query(sql, [cpf]);
        const count = rows[0].count;
        return count > 0;
    } catch (error) {
        console.error('Erro ao verificar CPF:', error);
        throw error;
    }
}

//Função para validar campos
function validateFields({ name, cpf, birthday, mother, email, user_id }) {
    if (!name) {
        return 'O nome é obrigatório!';
    }
    if (!cpf) {
        return 'O CPF é obrigatório!';
    }
    // Validar o CPF
    if (!validateCPF(cpf)) {
        return 'CPF inválido!';
    }
    const dateBirthday = moment(birthday, 'YYYY-MM-DD', true);
    if (!dateBirthday.isValid()) {
        return 'Data de nascimento inválida!';
    }
    if (!mother) {
        return 'O nome da mãe é obrigatório!';
    }
    if (!email) {
        return 'O e-mail é obrigatório!';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return 'Formato de e-mail inválido!';
    }
    if (user_id === undefined || user_id === null) {
        return 'Id do(a) responsável pelo cadastro é obrigatório!';
    }
    //Verificar se user_id é numérico
    const validationUserIdError = validateNumId( user_id );
    if (validationUserIdError) {
        return validationUserIdError;
    }
    
    return null;
}

//Função para verificar se a pessoa já está cadastrada
async function findExistingPerson(name, cpf, mother) {
    const sql = 'SELECT * FROM person WHERE name = ? AND cpf = ? AND mother = ?';
    const [existingPerson] = await pool.query(sql, [name, cpf, mother]);
    return existingPerson.length > 0;
}

//Função para verificar se o CPF já existe para outra pessoa
async function cpfExistsForAnotherUser(cpf, id) {
    try {
        const sql = 'SELECT COUNT(*) AS count FROM person WHERE cpf = ? AND id != ?';
        const [rows] = await pool.query(sql, [cpf, id]);
        const count = rows[0].count;
        return count > 0;
    } catch (error) {
        console.error('Erro ao verificar CPF:', error);
        throw error;
    }
}

//Rota para pesquisar pessoas com paginação
router.get('/person/all/:page', async (req, res) => {
    const { page, limit = 10 } = req.query; // Definindo valores padrão para página e limite
    // Convertendo os valores de página e limite para inteiros
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);
    const offset = (pageNumber - 1) * limitNumber; // Calculando o offset para a consulta
    try {
        // Consulta para contar o total de registros
        const [countResults] = await pool.query('SELECT COUNT(*) as count FROM person');
        const totalRecords = countResults[0].count;
        // Consulta SQL utilizando prepared statement com limite e offset
        const sql = 'SELECT * FROM person LIMIT ? OFFSET ?';
        // Executa a consulta com limite e offset
        const [results] = await pool.query(sql, [limitNumber, offset]);
        // Verifica se o array de resultados está vazio
        if (results.length === 0) {
            return res.status(404).json({ message: 'Nenhum registro encontrado.' });
        }
        // Retorna os resultados encontrados com informações de paginação
        res.json({
            totalRecords,
            currentPage: pageNumber,
            totalPages: Math.ceil(totalRecords / limitNumber),
            data: results
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro interno do servidor: ' + error.message });
    }
});

//Rota para consultar uma pessoa pelo ID
router.get('/person/:id', validateNumericId, async (req, res) => {
    const { numericId } = req;
    try {
        // Consulta SQL utilizando prepared statement
        const sql = 'SELECT * FROM person WHERE id = ?';
        // Executa a consulta com o ID fornecido
        const [results] = await pool.query(sql, [numericId]);
        // Verifica se o array de resultados está vazio
        if (results.length === 0) {
            return res.status(404).json({ message: 'Pessoa não encontrada!' });
        }
        // Retorna o resultado encontrado
        res.json(results[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro interno do servidor: ' + error.message });
    }
});

// Rota para cadastrar uma pessoa
router.post('/person/new', async (req, res) => {
    const { name, cpf: originalCpf, birthday, mother, email, email_valid, user_id } = req.body;
    // Remover caracteres não numéricos do CPF
    const cpf = originalCpf.replace(/[^\d]/g, '');
    //Chamar função para validar os campos
    const validationError = validateFields({ name, cpf, birthday, mother, email, user_id });
    if (validationError) {
        return res.status(400).json({ message: validationError });
    }
    try {
        // Verificar se o CPF já está cadastrado
        const cpfAlreadyExists = await cpfExists(cpf);
        if (cpfAlreadyExists) {
            return res.status(400).json({ message: 'CPF já existe na base de dados!' });
        }
        // Verificar se já existe uma pessoa com os mesmos dados
        const personExists = await findExistingPerson(name, cpf, mother);
        if (personExists) {
            return res.status(400).json({ message: 'Já existe uma pessoa cadastrada com esses dados!' });
        }
        // Consulta SQL com prepared statement
        const sql = 'INSERT INTO person SET ?';
        const values = { name, cpf, birthday, mother, email, email_valid, user_id };
        // Executar a consulta usando prepared statement
        const results = await pool.query(sql, values);
        res.json({ message: 'Dados cadastrados com sucesso!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro interno do servidor: ' + error.message });
    }
});

//Rota para atualizar uma pessoa
router.put('/person/update/:id', validateNumericId, async (req, res) => {
    const { numericId } = req;
    const { name, cpf: originalCpf, birthday, mother, email, email_valid, user_id } = req.body;
    // Verificar se id do cadastro foi fornecido
    if (numericId === undefined || numericId === null) {
        return res.status(400).json({ message: 'O id do cadastro é obrigatório!' });
    }
    // Remover caracteres não numéricos do CPF
    const cpf = originalCpf.replace(/[^\d]/g, '');
    const values = [name, cpf, birthday, mother, email, email_valid, user_id, numericId];
    // Chamar função para validar os campos
    const validationError = validateFields({ name, cpf, birthday, mother, email, user_id });
    if (validationError) {
        return res.status(400).json({ message: validationError });
    }
    try {
        // Verificar se o CPF já está cadastrado para outro usuário
        const cpfAlreadyExists = await cpfExistsForAnotherUser(cpf, numericId);
        if (cpfAlreadyExists) {
            return res.status(400).json({ message: 'Já existe uma pessoa cadastrada com esse CPF!' });
        }
        // Consulta SQL com prepared statement
        const sql = 'UPDATE person SET name=?, cpf=?, birthday=?, mother=?, email=?, email_valid=?, user_id=? WHERE id=?';
        // Executar a consulta usando prepared statement
        const [results] = await pool.query(sql, values);
        // Verificar se algum registro foi atualizado
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Dados não encontrados!' });
        }
        // Retornar mensagem de sucesso
        res.json({ message: 'Dados atualizados com sucesso!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro interno do servidor: ' + error.message });
    }
});

// Rota para excluir uma pessoa
router.delete('/person/delete/:id', validateNumericId, async (req, res) => {
    const { numericId } = req;
    try {
        // Verificar se há usuários vinculados a esta pessoa
        const [userResult] = await pool.query('SELECT * FROM user WHERE id_person = ?', [numericId]);
        if (userResult.length > 0) {
            return res.status(404).json({ message: 'Não foi possível excluir! Existe um usuário vinculado a este cadastro!' });
        }
        // Sql com prepared statement e placeholders (?)
        const sql = 'DELETE FROM person WHERE id = ?';
        // Executar a consulta usando prepared statement
        const result = await pool.query(sql, [numericId]);
        if (result[0].affectedRows === 0) {
            return res.status(404).json({ message: 'Dados não encontrados!' });
        }
        // Retornar mensagem de sucesso
        res.json({ message: 'Dados removidos com sucesso!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro interno do servidor: ' + error.message });
    }
});

// Exportar o roteador
module.exports = router;
