Ter o xampp instalado e base de dados criada
Iniciar projeto Node.js: npm init -y
Instalar dependências (npm install nome_dependencia):
    express mysql2 body-parser: para comunicação com banco de dados
    jsonwebtoken express-jwt: para autenticação
    bcrypt (para encriptar senhas)
    dotenv: para variáveis de ambiente, não expondo chaves em arquivos js
    unidecoded: para converter textos em maiúsculas ou minúsculas
    moment: para verificar e validar datas
    cors: para permitir requisições de origem diferente
Criar o arquivo .env com as variáveis necessárias, como por exemplo a secretkey para autenticação
Criar o arquivo .gitignore e adicionar a linha ".env" para evitar que ele seja exposto publicamente
Criar o arquivo index.js
Criar a pasta routes com as rotas para cada módulo
Utilizar um arquivo de rota para cada módulo

Rotas
    /api/login
    /api/person
        /api/person/all
        /api/person/:id
        /api/person/new
        /api/person/update/:id
        /api/person/delete/:id
    /api/user
        /api/user/all
        /api/user/:id
        /api/user/new
        /api/user/update/:id
        /api/user/alterpass/:id
        /api/user/delete/:id

