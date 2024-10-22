const express = require('express');
const router = express.Router();
const unidecode = require('unidecode');
const moment = require('moment');
const { validateNumericId } = require('../middlewares/validateNumericId');
const { validateNumId} = require('../functions/validateNumId');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const pool = require('../pool/pool');

//Função para validar campos
function validateFields({ id_person, user, status, expire, user_id }) {
    if (id_person === undefined || id_person === null) {
        return 'Id da pessoa é obrigatório!';
    }
    //Verificar se id_person é numérico
    const validationIdPersonError = validateNumId( id_person );
    if (validationIdPersonError) {
        return validationIdPersonError;
    }
    if (!user) {
        return 'O usuário é obrigatório!';
    }
    if (user.length < 3) {
        return 'O usuário deve ter pelo menos 3 caracteres!';
    }
    /**
    if (!password) {
        return 'A senha é obrigatória!';
    }
    if (password.length < 8) {
        return 'A senha deve ter pelo menos 8 caracteres!';
    }
    */
    if (status === undefined || status === null || !Number.isInteger(status) || (status !== 0 && status !== 1)) {
        return 'O status é obrigatório!';
    }
    if (!expire) {
        return 'A data de expiração é obrigatória!';
    }
    const expireDate = moment(expire, 'YYYY-MM-DD', true);
    if (!expireDate.isValid() || expireDate.isBefore(moment())) {
        return 'A data de expiração deve ser uma data válida e maior que a data atual!';
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

//Função para uppercase do usuário
function upperCaseUser(user) {
    // Transformar o campo user para letras maiúsculas e remover acentos
    const upperUser = unidecode(user).toUpperCase();
    return upperUser;
}

//Função para verificar se a pessoa informada existe na base de dados
async function findPerson(id_person) {
    const checkPersonSql = 'SELECT * FROM person WHERE id = ?';
    try {
        const [existingPerson] = await pool.query(checkPersonSql, [id_person]);
        if (existingPerson.length == 0) {
            return 'Id informado não existe no cadastro de pessoas!';
        }
        return null;
    } catch (error) {
        console.error(error);
        return 'Erro ao verificar a pessoa no banco de dados!';
    }
}

//Função para verificar se já existe o usuário
async function findUser(transformedUser) {
    const checkUserSql = 'SELECT * FROM user WHERE user = ?';
    try {
        const [existingUser] = await pool.query(checkUserSql, [transformedUser]);
        if (existingUser.length > 0) {
            return 'Usuário informado já está sendo utilizado!';
        }
        return null;
    } catch (error) {
        console.error(error);
        return 'Erro ao verificar o usuário no banco de dados!';
    }
}

//Função para verificar se o usuário já existe em outro cadastro
async function userExistsForAnotherUser(user, id) {
    try {
        const sql = 'SELECT COUNT(*) AS count FROM user WHERE user = ? AND id != ?';
        const [rows] = await pool.query(sql, [user, id]);
        const count = rows[0].count;
        return count > 0;
    } catch (error) {
        console.error('Erro ao verificar usuário:', error);
        throw error;
    }
}

//Rota para pesquisar todos os usuários com paginação
router.get('/user/all/:page', async (req, res) => {
    // Definindo valores padrão para página e limite
    const { page = 1, limit = 10 } = req.query;
    
    // Convertendo os valores de página e limite para inteiros
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);

    // Verificando se pageNumber ou limitNumber são NaN ou menores que 1
    if (isNaN(pageNumber) || pageNumber < 1 || isNaN(limitNumber) || limitNumber < 1) {
        return res.status(400).json({ message: 'Parâmetros de paginação inválidos.' });
    }
    const offset = (pageNumber - 1) * limitNumber;
    try {
        // Consulta para contar o total de registros
        const [countResults] = await pool.query('SELECT COUNT(*) as count FROM user');
        const totalRecords = countResults[0].count;
        // Consulta para buscar os registros com paginação
        const sql = 'SELECT id, id_person, user, status, expire FROM user LIMIT ? OFFSET ?';
        const [results] = await pool.query(sql, [limitNumber, offset]);
        if (results.length === 0) {
            return res.status(404).json({ message: 'Nenhum registro encontrado!' });
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

//Rota para consultar um usuário pelo ID
router.get('/user/:id', validateNumericId, async (req, res) => {
    const { numericId } = req;
    try {
        // Consulta SQL utilizando prepared statement
        const sql = 'SELECT id_person, user, status, expire FROM user WHERE id = ?';
        // Executa a consulta com o ID fornecido
        const [results] = await pool.query(sql, numericId);
        // Verifica se o array de resultados está vazio
        if (results.length === 0) {
            return res.status(404).json({ message: 'Usuário não encontrado!' });
        }
        // Retorna o resultado encontrado
        res.json(results[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro interno do servidor: ' + error.message });
    }
});

// Rota para cadastrar uma pessoa
router.post('/user/new', async (req, res) => {
    const { id_person, user, password, status, expire, user_id } = req.body;
    //Chamar função para validar os campos
    const validationError = validateFields({ id_person, user, password, status, expire, user_id });
    if (validationError) {
        return res.status(400).json({ message: validationError });
    }
    //Chamar função para uppercase do usuário
    const transformedUser = upperCaseUser(user);
    //Chamar função para verificar se existe a pessoa na base de dados
    const personError = await findPerson(id_person);
    if (personError) {
        return res.status(400).json({ message: personError });
    }
    // Verificar se já existe usuário para a pessoa informada
    const checkUserPerson = 'SELECT * FROM user WHERE id_person = ?';
    const [existingUserPerson] = await pool.query(checkUserPerson, [id_person]);
    if (existingUserPerson.length > 0) {
        return res.status(400).json({ message: 'Já existe usuário para a pessoa informada!' });
    }
    // Verificar se o usuário escolhido já existe na base de dados
    const userError = await findUser(transformedUser);
    if (userError) {
        return res.status(400).json({ message: userError });
    }
    try {
        // Criptografar a senha antes de salvar no banco de dados
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        // Prepared statement para inserir usuário
        const sql = 'INSERT INTO user (id_person, user, password, status, expire, user_id) VALUES (?, ?, ?, ?, ?, ?)';
        const values = [id_person, transformedUser, hashedPassword, status, expire, user_id];
        // Inserir o usuário no banco de dados
        const result = await pool.query(sql, values);
        res.json({ message: 'Usuário cadastrado com sucesso!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro interno do servidor: ' + error.message });
    }
});

//Rota para atualizar uma pessoa
router.put('/user/update/:id', validateNumericId, async (req, res) => {
    const { id_person, user, status, expire, user_id } = req.body;
    const { numericId } = req;
    //Chamar função para validar os campos
    const validationError = validateFields({ id_person, user, status, expire, user_id });
    if (validationError) {
        return res.status(400).json({ message: validationError });
    }
    //Chamar função para uppercase do usuário
    const transformedUser = upperCaseUser(user);
    //Chamar função para verificar se existe a pessoa na base de dados
    const personError = await findPerson(id_person);
    if (personError) {
        return res.status(400).json({ message: personError });
    }
    // Chamar função para verificar se o usuário já existe em outro cadastro
    const userAlreadyExists = await userExistsForAnotherUser(transformedUser, numericId);
    if (userAlreadyExists) {
        return res.status(400).json({ message: 'Já existe um cadastrado com esse usuário!' });
    }
    try {
        //Recuperar a senha antiga
        const getUserSql = 'SELECT password FROM user WHERE id = ?';
        const [userRows] = await pool.query(getUserSql, numericId);
        if (userRows.length === 0) {
            return res.status(404).json({ message: 'Usuário não encontrado!' });
        }
        
        // Preparar os valores para o prepared statement
        const values = [
            transformedUser,
            status,
            expire,
            user_id,
            numericId,
            id_person
        ];
        // Consulta SQL com placeholders (?)
        const sql = 'UPDATE user SET user=?, status=?, expire=?, user_id=? WHERE id=? AND id_person=?';
        // Executar a consulta usando prepared statement
        const result = await pool.query(sql, values);
        // Verificar se algum registro foi atualizado
        if (result[0].affectedRows === 0) {
            return res.status(404).json({ message: 'Usuário não encontrado!' });
        }
        // Retornar mensagem de sucesso
        res.json({ message: 'Usuário atualizado com sucesso!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro interno do servidor: ' + error.message });
    }
});

//Rota para o usuário trocar de senha
router.put('/user/alterpass/:id', validateNumericId, async (req, res) => {
    const { password, user_id } = req.body;
    const { numericId } = req;
    //Validar campos
    if (!password) {
        return res.status(400).json({ message: 'A senha é obrigatória!' });
    }
    if (password.length < 8) {
        return res.status(400).json({ message: 'A senha deve ter pelo menos 8 caracteres!' });
    }
    if (user_id === undefined || user_id === null) {
        return res.status(400).json({ message: 'Id do(a) responsável pelo cadastro é obrigatório!' });
    }
    if (!Number.isInteger(user_id)) {
        return res.status(400).json({ message: 'Id do(a) responsável pelo cadastro inválido!' });
    }

    try {
        //Recuperar a senha antiga
        const getUserSql = 'SELECT password FROM user WHERE id = ?';
        const [userRows] = await pool.query(getUserSql, numericId);
        if (userRows.length === 0) {
            return res.status(404).json({ message: 'Usuário não encontrado!' });
        }
        const oldPassword = userRows[0].password;
        // Armazenar a senha antiga na tabela old_passwords
        const storeOldPasswordSql = 'INSERT INTO old_pass (id_user, old_password) VALUES (?, ?)';
        await pool.query(storeOldPasswordSql, [numericId, oldPassword]);
        // Criptografar a senha antes de salvar no banco de dados, se estiver sendo atualizada
        let hashedPassword = password;
        if (password) {
            hashedPassword = await bcrypt.hash(password, saltRounds);
        }
        // Preparar os valores para o prepared statement
        const values = [
            hashedPassword,
            user_id,
            numericId
        ];
        // Consulta SQL com placeholders (?)
        const sql = 'UPDATE user SET password=?, user_id=? WHERE id=?';
        // Executar a consulta usando prepared statement
        const result = await pool.query(sql, values);
        // Verificar se algum registro foi atualizado
        if (result[0].affectedRows === 0) {
            return res.status(404).json({ message: 'Usuário não encontrado!' });
        }
        // Retornar mensagem de sucesso
        res.json({ message: 'Senha alterada com sucesso!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro interno do servidor: ' + error.message });
    }

});

//Rota para excluir uma pessoa
router.delete('/user/delete/:id', validateNumericId, async (req, res) => {
    const { numericId } = req;
    try {
        // Verificar se há usuários vinculados a esta pessoa
        const [oldPassResult] = await pool.query('SELECT * FROM user_old WHERE id = ?', numericId);
        if (oldPassResult.length > 0) {
            return res.status(404).json({ message: 'Não foi possível excluir! Existem dados vinculados a este cadastro!' });
        }
        // Consulta SQL com prepared statement e placeholders (?)
        const sql = 'DELETE FROM user WHERE id = ?';
        // Executar a consulta usando prepared statement
        const result = await pool.query(sql, numericId);
        // Verificar se algum registro foi deletado
        if (result[0].affectedRows === 0) {
            return res.status(404).json({ message: 'Usuário não encontrado!' });
        }
        // Retornar mensagem de sucesso
        res.json({ message: 'Usuário removido com sucesso!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro interno do servidor: ' + error.message });
    }
});

// Exportar o roteador
module.exports = router;