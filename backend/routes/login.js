const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

//Secret Key JWT
const secretKey = 'P@$$w0rd';

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  //Usuário fictício
  const user = { id: 1, username: 'user', password: 'password' };
  if (username === user.username && password === user.password) {
    const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: '5h' });
    res.json({ token });
  } else {
    res.status(401).send('Credenciais inválidas!');
  }
});

// Exportar o Router
module.exports = router;