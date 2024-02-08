// Agendamento.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FormularioCadastroLimpeza from './FormularioCadastroLimpeza';

const Agendamento = ({ cidadeSelecionada, servicoSelecionado }) => {
  const [horariosDisponiveis, setHorariosDisponiveis] = useState([]);

  useEffect(() => {
    const carregarHorariosDisponiveis = async () => {
      try {
        const response = await axios.get('http://localhost:3001/horarios', {
          params: {
            cidade: cidadeSelecionada,
            servico: servicoSelecionado,
          },
        });

        setHorariosDisponiveis(response.data);
      } catch (error) {
        console.error('Erro ao carregar horários disponíveis:', error);
      }
    };

    if (cidadeSelecionada && servicoSelecionado) {
      carregarHorariosDisponiveis();
    } else {
      setHorariosDisponiveis([]);
    }
  }, [cidadeSelecionada, servicoSelecionado]);

  return (
    <div>
      <h2>Serviço: {servicoSelecionado}</h2>
      <h2>Cidade: {cidadeSelecionada}</h2>

      <h3>Horários Disponíveis para Agendamento:</h3>
      <table>
        <thead>
          <tr>
            <th>Data</th>
            <th>Hora</th>
          </tr>
        </thead>
        <tbody>
          {horariosDisponiveis.map((horario, index) => (
            <tr key={index}>
              <td>{horario.data}</td>
              <td>{horario.hora}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <FormularioCadastroLimpeza horariosDisponiveis={horariosDisponiveis} />
    </div>
  );
};

export default Agendamento;
