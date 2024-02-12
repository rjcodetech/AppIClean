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
  const { data, hora, usuarioId, solicitante_id, servico, endereco, obs } = req.body;
  console.log('Dados do agendamento:', req.body);
  const sql = 'INSERT INTO agendamentos (data_agendamento, hora_agendamento, cliente_id, solicitante_id, descricao_servico, endereco, obs) VALUES (?, ?, ?, ?, ?, ?, ?)';
  db.query(sql, [data, hora, usuarioId, solicitante_id, servico, endereco, obs], (err, result) => {
    if (err) throw err;
    res.json({ message: 'Agendamento adicionado com sucesso!' });
  });
});

module.exports = router;
