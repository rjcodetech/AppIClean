import React from 'react';

const ConfirmacaoAgendamento = ({ dadosAgendamento, onConfirmar }) => {

  console.log('Dados do agendamento:', dadosAgendamento);
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title">Confirmação de Agendamento</h2>
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
                <strong>Serviço:</strong> {dadosAgendamento.servico}
              </div>
              <div className="mb-3">
                <strong>Observações:</strong> {dadosAgendamento.observacoes}
              </div>
              <button className="btn btn-primary" onClick={onConfirmar}>Confirmar Agendamento</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmacaoAgendamento;
