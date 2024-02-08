// src/components/AgendamentoForm.js
import React, { useState } from 'react';
import axios from 'axios';

function AgendamentoForm({ loadAgendamentos }) {
  const [nomeCliente, setNomeCliente] = useState('');
  const [descricaoServico, setDescricaoServico] = useState('');

  const handleAgendamentoSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/agendamentos', {
        nome_cliente: nomeCliente,
        descricao_servico: descricaoServico,
      });
      // Atualizar a lista de agendamentos após adicionar um novo
      loadAgendamentos();
      // Limpar campos do formulário
      setNomeCliente('');
      setDescricaoServico('');
    } catch (error) {
      console.error('Erro ao adicionar agendamento:', error);
    }
  };

  return (
    <form onSubmit={handleAgendamentoSubmit}>
      <label>Nome do Cliente:</label>
      <input
        type="text"
        value={nomeCliente}
        onChange={(e) => setNomeCliente(e.target.value)}
      />
      <br />
      <label>Descrição do Serviço:</label>
      <textarea
        value={descricaoServico}
        onChange={(e) => setDescricaoServico(e.target.value)}
      ></textarea>
      <br />
      <button type="submit">Agendar</button>
    </form>
  );
}

export default AgendamentoForm;
