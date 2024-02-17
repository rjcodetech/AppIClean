import React, { useState, useRef } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import ConfirmacaoAgendamento from './ConfirmacaoAgendamento.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import InputMask from "react-input-mask";

const FormularioCadastroLimpeza = ({ dadosAgendamento }) => {
  const [formData, setFormData] = useState({
    nome: '',
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
  const [campoFocus, setCampoFocus] = useState(null);

  // Referências para os campos obrigatórios
  const nomeRef = useRef(null);
  const celularRef = useRef(null);
  const cepRef = useRef(null);
  const enderecoRef = useRef(null);
  const cidadeRef = useRef(null);
  const estadoRef = useRef(null);

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

    // Verificar se os campos obrigatórios estão preenchidos
    if (
      formData.nome === '' ||
      formData.celular === '' ||
      formData.cep === '' ||
      formData.endereco === '' ||
      formData.cidade === '' ||
      formData.estado === ''
    ) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Por favor, preencha todos os campos obrigatórios.',
      });

      // Encontrar e definir o primeiro campo obrigatório não preenchido como o foco
      if (formData.nome === '') {
        setCampoFocus(nomeRef);
      } else if (formData.celular === '') {
        setCampoFocus(celularRef);
      } else if (formData.cep === '') {
        setCampoFocus(cepRef);
      } else if (formData.endereco === '') {
        setCampoFocus(enderecoRef);
      } else if (formData.cidade === '') {
        setCampoFocus(cidadeRef);
      } else if (formData.estado === '') {
        setCampoFocus(estadoRef);
      }

      return;
    }

    try {
      setExibirConfirmacao(true);
    } catch (error) {
      console.error('Erro ao enviar dados do formulário:', error);
    }
  };

  const handleConfirmar = () => {
    console.log('Agendamento confirmado');
  };

  console.log("dadosAgendamento", dadosAgendamento);
  return (
    <div className="row">
      <div className="col-md-6">
        <div className="card">
          <div className="card-body">
            <h2 className="card-title">Marque sua limpeza</h2>
            {exibirConfirmacao ? (
              <ConfirmacaoAgendamento dadosAgendamento={formData} onConfirmar={handleConfirmar} />
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="section">
                  <h3>Informações Pessoais</h3>
                  <div className="mb-3">
                    <label htmlFor="nome" className="form-label">Nome Completo: <span class="text-danger">*</span></label>
                    <input type="text" id="nome" name="nome" className="form-control" value={formData.nome} onChange={handleChange} />
                    <div class="invalid-feedback">Campo obrigatório.</div>
                  </div>
                </div>

                <div className="section">
                  <h3>Informações de Contato</h3>
                  <div className="mb-3">
                    <label htmlFor="celular" className="form-label">Celular:</label>
                    <InputMask mask="(99) 99999-9999" id="celular" name="celular" className="form-control" value={formData.celular} onChange={handleChange} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email:</label>
                    <input type="email" id="email" name="email" className="form-control" value={formData.email} onChange={handleChange} />
                  </div>
                </div>

                <div className="section">
                  <h3>Informações do Local da Limpeza</h3>
                  <div className="mb-3">
                    <label htmlFor="cep" className="form-label">CEP:</label>
                    <InputMask mask="99999-999" id="cep" name="cep" className="form-control" value={formData.cep} onChange={handleChange} onBlur={buscarEnderecoPorCEP} />
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
                </div>

                <div className="section">
                  <h3>Informações Adicionais</h3>
                  <div className="mb-3">
                    <label htmlFor="obs" className="form-label">Observações:</label>
                    <input type="text" id="obs" name="obs" className="form-control" value={formData.obs} onChange={handleChange} />
                  </div>
                </div>
                <button type="submit" className="btn btn-primary">Marcar Limpeza <FontAwesomeIcon icon={faChevronRight} /></button>
              </form>
            )}
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <div className="card resumo-agendamento">
          <div className="card-body">
            <h5>Resumo do Agendamento</h5>
            <p><strong>Data:</strong> {dadosAgendamento.data}</p>
            <p><strong>Horário:</strong> {dadosAgendamento.hora}</p>
            <p><strong>Profissional:</strong> {dadosAgendamento.usuario}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormularioCadastroLimpeza;
