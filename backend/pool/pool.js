const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root', // Se o seu usuário do MySQL for diferente, modifique aqui
  password: '', // Insira sua senha do MySQL aqui
  database: 'cpd', // Nome do banco de dados que você criou
  waitForConnections: true, // Esperar por conexões disponíveis se todas estiverem em uso
  connectionLimit: 10, // Limite máximo de conexões no pool
  queueLimit: 0 // Número máximo de conexões enfileiradas (0 significa sem limite)
});

module.exports = pool;