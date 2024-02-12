import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FormularioCadastroLimpeza from './FormularioCadastroLimpeza';

const HorariosPage = ({ cidadeSelecionada, estadoSelecionado }) => {
  const [horariosDisponiveis, setHorariosDisponiveis] = useState([]);
  const [horarioSelecionado, setHorarioSelecionado] = useState(null);
  const [dadosAgendamento, setDadosAgendamento] = useState(null);

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
      {horarioSelecionado ? (
        <FormularioCadastroLimpeza dadosAgendamento={dadosAgendamento}/>
      ) : (
        <div>
          <h2 className="mt-3 mb-4">Horários Disponíveis para Agendamento</h2>
          <div className="card">
            <div className="card-body">
            {Object.keys(agruparHorariosPorUsuarioEData()).map((chaveUsuario, indexUsuario) => (
              <div className="card mb-3" key={indexUsuario}>
                <div className="card-body">
                  <h4 className="card-title">{chaveUsuario}</h4>
                  <div className="row">
                    {Object.keys(agruparHorariosPorUsuarioEData()[chaveUsuario]).map((chaveData, indexData) => (
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
