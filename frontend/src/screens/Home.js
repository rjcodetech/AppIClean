import React, { useState, useEffect } from 'react';
import axios from 'axios';
import debounce from 'lodash.debounce';
import 'bootstrap/dist/css/bootstrap.min.css';
import HorariosPage from './HorariosPage';

const Home = () => {
  const [estados, setEstados] = useState([]);
  const [estadoSelecionado, setEstadoSelecionado] = useState('');
  const [cidadeDigitada, setCidadeDigitada] = useState('');
  const [cidadeSelecionada, setCidadeSelecionada] = useState('');
  const [distritosEncontrados, setDistritosEncontrados] = useState([]);
  const [mostrarHorario, setMostrarHorario] = useState(false);

  useEffect(() => {
    const carregarEstados = async () => {
      try {
        const response = await axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados');
        setEstados(response.data);
      } catch (error) {
        console.error('Erro ao carregar estados:', error);
      }
    };

    carregarEstados();
  }, []);

  const buscarDistritos = async () => {
    try {
      if (estadoSelecionado.trim() !== '' && cidadeDigitada.trim() !== '') {
        const response = await axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estadoSelecionado}/distritos`);

        const distritos = response.data
          .filter((distrito) => distrito.nome.toLowerCase().includes(cidadeDigitada.toLowerCase()))
          .map((distrito) => ({
            id: distrito.id,
            nome: distrito.nome,
          }));

        setDistritosEncontrados(distritos);
      } else {
        setDistritosEncontrados([]);
      }
    } catch (error) {
      console.error('Erro ao buscar distritos:', error);
    }
  };

  const buscarDistritosDebounced = debounce(buscarDistritos, 300);

  useEffect(() => {
    buscarDistritosDebounced();
  }, [estadoSelecionado, cidadeDigitada]);

  const selecionarCidade = (cidade) => {
    setCidadeDigitada(cidade.nome);
    setCidadeSelecionada(cidade.id);
    setDistritosEncontrados([]);
  };

  const handlePesquisarClick = () => {
    setMostrarHorario(true);
  };

  return (
    <div className="container">
      {mostrarHorario ? (
        <HorariosPage
          cidadeSelecionada={cidadeSelecionada}
          estadoSelecionado={estadoSelecionado}
        />
      ) : (
        <div className="row mt-5">
          <div className="col-md-6 offset-md-3">
            <div className="card">
              <div className="card-body">
                <h2 className="card-title text-center mb-4">Pesquisar Horários</h2>
                <div className="form-group">
                  <select
                    className="form-control"
                    value={estadoSelecionado}
                    onChange={(e) => setEstadoSelecionado(e.target.value)}
                  >
                    <option value="">Selecione o Estado</option>
                    {estados.map((estado) => (
                      <option key={estado.id} value={estado.id}>
                        {estado.sigla} - {estado.nome}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Nome da Cidade"
                    value={cidadeDigitada}
                    onChange={(e) => setCidadeDigitada(e.target.value)}
                  />
                </div>
                <ul className="list-group mb-3">
                  {distritosEncontrados.map((distrito, index) => (
                    <li key={index} className="list-group-item" onClick={() => selecionarCidade(distrito)}>
                      {distrito.nome}
                    </li>
                  ))}
                </ul>
                <button
                  className="btn btn-primary btn-block"
                  onClick={handlePesquisarClick}
                  disabled={!cidadeSelecionada}
                >
                  Pesquisar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
