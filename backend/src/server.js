const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const agendamentosRoutes = require('./routes/agendamentos');
const horariosRoutes = require('./routes/horarios');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Log para registrar as requisições recebidas
app.use((req, res, next) => {
  console.log(`Recebida requisição: ${req.method} ${req.url}`);
  next();
});

// Usar as rotas definidas em agendamentos.js
app.use('/', agendamentosRoutes);

// Usar as novas rotas definidas em horarios.js
app.use('/', horariosRoutes);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
