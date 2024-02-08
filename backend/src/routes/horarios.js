// src/routes/horarios.js
const express = require('express');
const db = require('../db/connection');

const router = express.Router();

// Rota para obter horários disponíveis com base em cidade e serviço
router.get('/horarios', (req, res) => {

  const { estado, cidade } = req.query;

  const sql = `
              SELECT
                usuarios.id AS usuario_id,
                usuarios.nome AS nome_usuario,
                horarios.id AS horario_id,
                DATE_FORMAT(horarios.data, '%d/%m/%Y') AS data,
                DATE_FORMAT(horarios.data, '%e %b') AS data_reduzida,
                DATE_FORMAT(horarios.hora, '%H:%i') AS hora,
                DAYNAME(horarios.data) dia_semana,
                CASE DAYNAME(horarios.data)
                  WHEN 'Sunday' THEN 'Dom'
                  WHEN 'Monday' THEN 'Seg'
                  WHEN 'Tuesday' THEN 'Ter'
                  WHEN 'Wednesday' THEN 'Qua'
                  WHEN 'Thursday' THEN 'Qui'
                  WHEN 'Friday' THEN 'Sex'
                  WHEN 'Saturday' THEN 'Sáb'
              END AS dia_da_semana_reduzido
              FROM
                usuarios
              JOIN
                horarios ON usuarios.id = horarios.usuario_id
              JOIN
                cidades ON usuarios.cidade_id = cidades.id
              JOIN
                estados ON cidades.estado_id = estados.id
              WHERE
                estados.ibge_id = ?
                AND cidades.ibge_id = ? `;

  db.query(sql, [estado, cidade], (err, result) => {
    if (err) {
      console.error('Erro ao obter horários do banco de dados:', err);
      res.status(500).send('Erro interno do servidor');
    } else {

      console.log('Horários disponíveis:', result);

      res.json(result);
    }
  });
});

module.exports = router;
