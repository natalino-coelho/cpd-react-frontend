require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { expressjwt: expressJwt } = require('express-jwt');

//Secret Key JWT
const secretKey = process.env.SECRET_KEY;

//Middleware para proteger as rotas
//const auth = expressJwt({ secret: secretKey, algorithms: ['HS256'] });

// Middleware de erro para JWT
const handleJwtErrors = (err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({ message: 'Acesso Negado: Token Inválido!' });
  }
  next();
};

const app = express();
const port = 3003;

const login = require('./routes/login');
const person = require('./routes/person');
const user = require('./routes/user');

// Middleware para processar dados JSON
app.use(bodyParser.json());
//Middleware para aceitar requisições de origens diferentes
app.use(cors());

app.use('/api', login);
app.use('/api', /**auth,*/ person);
app.use('/api', /**auth,*/ user);

// Middleware para lidar com erros JWT
app.use(handleJwtErrors);

// Middleware para lidar com rotas não encontradas (404)
app.use((req, res, next) => {
  res.status(404).send('Página não encontrada!');
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});