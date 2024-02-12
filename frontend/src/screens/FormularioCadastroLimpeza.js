import React, { useState } from 'react';
import axios from 'axios';
import ConfirmacaoAgendamento from './ConfirmacaoAgendamento.js';

const FormularioCadastroLimpeza = ({ dadosAgendamento }) => {
  const [formData, setFormData] = useState({
    nome: '',
    cpf: '',
    celular: '',
    email: '',
    cep: '',
    endereco: '',
    numero: '',
    complemento: '',
    cidade: '',
    estado: '',
    hora: dadosAgendamento.hora,
    horarioId: dadosAgendamento.horarioId,
    data: dadosAgendamento.data,
    usuarioId: dadosAgendamento.usuarioId,
    servico: '',
    });

  const [exibirConfirmacao, setExibirConfirmacao] = useState(false);

  const buscarEnderecoPorCEP = async () => {
    try {
      const response = await axios.get(`https://viacep.com.br/ws/${formData.cep}/json/`);
      const { logradouro, complemento, localidade, uf } = response.data;
      setFormData({
        ...formData,
        endereco: logradouro,
        complemento,
        cidade: localidade,
        estado: uf
      });
    } catch (error) {
      console.error('Erro ao buscar endereço por CEP:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleBlurCEP = () => {
    if (formData.cep.length === 8) {
      buscarEnderecoPorCEP();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setExibirConfirmacao(true);
    } catch (error) {
      console.error('Erro ao enviar dados do formulário:', error);
    }
  };

  const handleConfirmar = () => {
    // Aqui você pode adicionar lógica para confirmar o agendamento
    console.log('Agendamento confirmado');
  };

  console.log("dadosAgendamento", dadosAgendamento);

  return (
    <div className="card">
      <div className="card-body">
        <h2 className="card-title">Marque sua limpeza</h2>
        {exibirConfirmacao ? (
          <ConfirmacaoAgendamento dadosAgendamento={formData} onConfirmar={handleConfirmar} />
        ) : (
        <form onSubmit={handleSubmit}>

          <input type="hidden" id="hora" name="hora" value={dadosAgendamento.hora} />
          <input type="hidden" id="horarioId" name="horarioId" value={dadosAgendamento.horarioId} />
          <input type="hidden" id="data" name="data" value={dadosAgendamento.data} />

          <div className="mb-3">
            <label htmlFor="nome" className="form-label">Nome:</label>
            <input type="text" id="nome" name="nome" className="form-control" value={formData.nome} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="cpf" className="form-label">CPF:</label>
            <input type="text" id="cpf" name="cpf" className="form-control" value={formData.cpf} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="celular" className="form-label">Celular:</label>
            <input type="text" id="celular" name="celular" className="form-control" value={formData.celular} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email:</label>
            <input type="email" id="email" name="email" className="form-control" value={formData.email} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="cep" className="form-label">CEP:</label>
            <input type="text" id="cep" name="cep" className="form-control" value={formData.cep} onChange={handleChange} onBlur={handleBlurCEP} />
          </div>
          <div className="mb-3">
            <label htmlFor="endereco" className="form-label">Endereço:</label>
            <input type="text" id="endereco" name="endereco" className="form-control" value={formData.endereco} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="numero" className="form-label">Número:</label>
            <input type="text" id="numero" name="numero" className="form-control" value={formData.numero} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="complemento" className="form-label">Complemento:</label>
            <input type="text" id="complemento" name="complemento" className="form-control" value={formData.complemento} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="cidade" className="form-label">Cidade:</label>
            <input type="text" id="cidade" name="cidade" className="form-control" value={formData.cidade} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="estado" className="form-label">Estado:</label>
            <input type="text" id="estado" name="estado" className="form-control" value={formData.estado} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="servico" className="form-label">Serviço:</label>
            <input type="text" id="servico" name="servico" className="form-control" value={formData.servico} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="servico" className="form-label">Observações:</label>
            <input type="text" id="obs" name="obs" className="form-control" value={formData.obs} onChange={handleChange} />
          </div>
          <button type="submit" className="btn btn-primary">Enviar</button>
        </form>
        )}
      </div>
    </div>
  );
};

export default FormularioCadastroLimpeza;
