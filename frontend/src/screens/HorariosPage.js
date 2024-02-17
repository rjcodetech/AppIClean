import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FormularioCadastroLimpeza from './FormularioCadastroLimpeza';
import TopBar from '../components/TopBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';

const HorariosPage = ({ cidadeSelecionada, estadoSelecionado }) => {
  const [horariosDisponiveis, setHorariosDisponiveis] = useState([]);
  const [horarioSelecionado, setHorarioSelecionado] = useState(null);
  const [dadosAgendamento, setDadosAgendamento] = useState(null);
  const [indicesHorarios, setIndicesHorarios] = useState({});
  const [proximosClicados, setProximosClicados] = useState({});

  useEffect(() => {
    const carregarHorariosDisponiveis = async () => {
      try {
        const response = await axios.get('http://localhost:3001/horarios', {
          params: {
            estado: estadoSelecionado,
            cidade: cidadeSelecionada,
          },
        });
        setHorariosDisponiveis(response.data);
        const indicesInicializados = {};
        const proximosClicadosInicializados = {};
        response.data.forEach(horario => {
          if (!indicesInicializados[horario.nome_usuario]) {
            indicesInicializados[horario.nome_usuario] = 0;
          }
          if (!proximosClicadosInicializados[horario.nome_usuario]) {
            proximosClicadosInicializados[horario.nome_usuario] = false;
          }
        });
        setIndicesHorarios(indicesInicializados);
        setProximosClicados(proximosClicadosInicializados);
      } catch (error) {
        console.error('Erro ao carregar horários disponíveis:', error);
      }
    };

    if (cidadeSelecionada && estadoSelecionado) {
      carregarHorariosDisponiveis();
    } else {
      setHorariosDisponiveis([]);
    }
  }, [cidadeSelecionada, estadoSelecionado]);

  const handleHorarioClick = (horario) => {
    alert(`Horário ${horario.horario_id} selecionado`);
    setHorarioSelecionado(horario);
    setDadosAgendamento({
      data_reduzida: horario.data_reduzida,
      data: horario.data,
      hora: horario.hora,
      usuario: horario.nome_usuario,
      usuarioId: horario.usuario_id,
      horarioId: horario.horario_id,
    });
  };

  const proximosHorarios = (chaveUsuario) => {
    setIndicesHorarios(prevState => ({
      ...prevState,
      [chaveUsuario]: prevState[chaveUsuario] + 4,
    }));
    setProximosClicados(prevState => ({
      ...prevState,
      [chaveUsuario]: true,
    }));
  };

  const anteriorHorarios = (chaveUsuario) => {
    setIndicesHorarios(prevState => ({
      ...prevState,
      [chaveUsuario]: Math.max(0, prevState[chaveUsuario] - 4),
    }));
    setProximosClicados(prevState => ({
      ...prevState,
      [chaveUsuario]: false,
    }));
  };

  const agruparHorariosPorUsuarioEData = () => {
    const horariosAgrupados = {};
    horariosDisponiveis.forEach((horario) => {
      const chaveUsuario = horario.nome_usuario;
      const chaveData = horario.data;
      if (!horariosAgrupados[chaveUsuario]) {
        horariosAgrupados[chaveUsuario] = {};
      }
      if (!horariosAgrupados[chaveUsuario][chaveData]) {
        horariosAgrupados[chaveUsuario][chaveData] = [];
      }
      horariosAgrupados[chaveUsuario][chaveData].push(horario);
    });
    return horariosAgrupados;
  };

  return (
    <div>
      <TopBar />
      {horarioSelecionado ? (
        <FormularioCadastroLimpeza dadosAgendamento={dadosAgendamento} />
      ) : (
        <div>
          <h2 className="mt-3 mb-4">Horários Disponíveis para Agendamento</h2>
          <div className="card">
            <div className="card-body">
              {Object.keys(agruparHorariosPorUsuarioEData()).map((chaveUsuario, indexUsuario) => (
                <div className="card mb-3" key={indexUsuario}>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-6">
                        <h5>Profissional: {chaveUsuario}</h5>
                      </div>
                      <div className="col-md-6">
                        <div className="row">
                          {indicesHorarios[chaveUsuario] > 0 && (
                            <div className="col">
                              <button className="btn btn-link" onClick={() => anteriorHorarios(chaveUsuario)}>
                                <FontAwesomeIcon icon={faChevronLeft} />
                              </button>
                            </div>
                          )}
                          {Object.keys(agruparHorariosPorUsuarioEData()[chaveUsuario]).slice(indicesHorarios[chaveUsuario], indicesHorarios[chaveUsuario] + 4).map((chaveData, indexData) => (
                            <div className="col" key={indexData}>
                              <h6 className="card-subtitle mb-2 text-muted">{agruparHorariosPorUsuarioEData()[chaveUsuario][chaveData][0].dia_da_semana_reduzido}</h6>
                              <h6 className="card-subtitle mb-2 text-muted">{agruparHorariosPorUsuarioEData()[chaveUsuario][chaveData][0].data_reduzida}</h6>
                              {agruparHorariosPorUsuarioEData()[chaveUsuario][chaveData].map((horario, indexHorario) => (
                                <div key={indexHorario}>
                                  <button className="btn btn-primary mb-2" onClick={() => handleHorarioClick(horario)}>
                                    {horario.hora}
                                  </button>
                                </div>
                              ))}
                            </div>
                          ))}
                          <div className="col">
                            <button className="btn btn-link" onClick={() => proximosHorarios(chaveUsuario)}>
                              <FontAwesomeIcon icon={faChevronRight} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HorariosPage;
