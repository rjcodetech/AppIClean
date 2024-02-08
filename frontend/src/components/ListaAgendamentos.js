// src/components/ListaAgendamentos.js
import React from 'react';

function ListaAgendamentos({ agendamentos }) {
  return (
    <ul>
      {agendamentos.map((agendamento) => (
        <li key={agendamento.id}>
          <strong>{agendamento.nome_cliente}</strong> - {agendamento.descricao_servico}
        </li>
      ))}
    </ul>
  );
}

export default ListaAgendamentos;
