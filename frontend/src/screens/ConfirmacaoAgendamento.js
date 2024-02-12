import React from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const ConfirmacaoAgendamento = ({ dadosAgendamento, onConfirmar }) => {

  const handleConfirmar = async () => {
    try {
      console.log('Dados do agendamento:', dadosAgendamento);
      await axios.post('http://localhost:3001/agendamentos', dadosAgendamento);
      onConfirmar();
      Swal.fire({
        title: 'Agendamento Confirmado!',
        text: 'Seu agendamento foi confirmado com sucesso.',
        icon: 'success',
      }).then(() => {
        window.location.href = '/';
      });
    } catch (error) {
      console.error('Erro ao confirmar agendamento:', error);
      Swal.fire({
        title: 'Erro!',
        text: 'Ocorreu um erro ao confirmar o agendamento. Por favor, tente novamente.',
        icon: 'error',
      });
    }
  };

  const enderecoCompleto = `${dadosAgendamento.endereco}, ${dadosAgendamento.numero} ${dadosAgendamento.complemento}, ${dadosAgendamento.cidade} - ${dadosAgendamento.cep} - ${dadosAgendamento.estado}`;

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title">Dados do Agendamento</h2>
              <div className="mb-3">
                <strong>Nome:</strong> {dadosAgendamento.nome}
              </div>
              <div className="mb-3">
                <strong>Data:</strong> {dadosAgendamento.data}
              </div>
              <div className="mb-3">
                <strong>Hora:</strong> {dadosAgendamento.hora}
              </div>
              <div className="mb-3">
                <strong>Endereço:</strong> {enderecoCompleto}
              </div>
              <div className="mb-3">
                <strong>Serviço:</strong> {dadosAgendamento.servico}
              </div>
              <div className="mb-3">
                <strong>Observações:</strong> {dadosAgendamento.obs}
              </div>
              <button className="btn btn-primary" onClick={handleConfirmar}>Confirmar Agendamento</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmacaoAgendamento;
