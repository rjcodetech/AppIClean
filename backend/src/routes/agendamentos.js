// src/routes/agendamentos.js
const express = require('express');
const db = require('../db/connection');

const router = express.Router();

// Rota para obter todos os agendamentos
router.get('/agendamentos', (req, res) => {
  const sql = 'SELECT * FROM agendamentos';
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

// Rota para adicionar um novo agendamento
router.post('/agendamentos', (req, res) => {
  const { nome_cliente, descricao_servico } = req.body;
  const sql = 'INSERT INTO agendamentos (nome_cliente, descricao_servico) VALUES (?, ?)';
  db.query(sql, [nome_cliente, descricao_servico], (err, result) => {
    if (err) throw err;
    res.json({ message: 'Agendamento adicionado com sucesso!' });
  });
});

module.exports = router;
