import { useState } from "react";
import { Link } from "react-router-dom";
import { Target, Calendar, Clock, ArrowLeft, Search, Filter, Plus, AlertTriangle } from "lucide-react";
import './plano_acao.css';

function PlanoAcao() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  
  const planos = [
    {
      id: 1,
      title: "Implementação de Metodologia Ágil",
      description: "Implementar Scrum em todos os times de desenvolvimento até o final do trimestre.",
      responsavel: "Carlos Silva",
      prazo: "30/06/2025",
      status: "em-andamento",
      progresso: 65
    },
    {
      id: 2,
      title: "Treinamento em Design Thinking",
      description: "Capacitar 100% dos líderes de produto em Design Thinking.",
      responsavel: "Ana Oliveira",
      prazo: "15/07/2025",
      status: "pendente",
      progresso: 0
    },
    {
      id: 3,
      title: "Otimização de Processos Internos",
      description: "Mapear e otimizar os principais gargalos nos processos de desenvolvimento.",
      responsavel: "Roberto Martins",
      prazo: "10/05/2025",
      status: "atrasado",
      progresso: 40
    },
    {
      id: 4,
      title: "Implementação de Feedback Contínuo",
      description: "Estabelecer sistema de feedback contínuo entre equipes e stakeholders.",
      responsavel: "Juliana Costa",
      prazo: "22/04/2025",
      status: "concluido",
      progresso: 100
    }
  ];

  const getStatusLabel = (status) => {
    switch(status) {
      case 'em-andamento': return 'Em Andamento';
      case 'pendente': return 'Pendente';
      case 'atrasado': return 'Atrasado';
      case 'concluido': return 'Concluído';
      default: return status;
    }
  };

  const filteredPlanos = planos.filter(plano => {
    const matchesSearch = plano.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         plano.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (statusFilter === "all") return matchesSearch;
    return matchesSearch && plano.status === statusFilter;
  });

  return (
    <div className="dashboard-background">
      <div className="plano-acao-container">
        <div className="plano-acao-header">
          <h1>Planos de Ação</h1>
          <p>Acompanhe e gerencie os planos de ação da sua equipe</p>
        </div>

        <div className="plano-acao-content">
          <button className="add-plano-button">
            <Plus size={16} /> Novo Plano de Ação
          </button>

          <div className="filters">
            <div className="search-bar">
              <input 
                type="text" 
                className="search-input" 
                placeholder="Buscar planos..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="filter-options">
              <select 
                className="filter-select"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">Todos os status</option>
                <option value="em-andamento">Em Andamento</option>
                <option value="pendente">Pendente</option>
                <option value="atrasado">Atrasado</option>
                <option value="concluido">Concluído</option>
              </select>
            </div>
          </div>

          <div className="planos-grid">
            {filteredPlanos.map(plano => (
              <div className="plano-card" key={plano.id}>
                <h3 className="plano-title">
                  <Target size={20} />
                  {plano.title}
                </h3>
                <p className="plano-description">{plano.description}</p>
                <div className="plano-meta">
                  <span>Responsável: {plano.responsavel}</span>
                  <span className={`status-badge status-${plano.status}`}>
                    {getStatusLabel(plano.status)}
                  </span>
                </div>
                <div className="plano-meta">
                  <span><Calendar size={14} /> Prazo: {plano.prazo}</span>
                  {plano.status === 'atrasado' && (
                    <span style={{ color: '#dc3545' }}>
                      <AlertTriangle size={14} /> Atrasado
                    </span>
                  )}
                </div>
                <div className="plano-progress">
                  <div className="progress-label">
                    <span>Progresso</span>
                    <span>{plano.progresso}%</span>
                  </div>
                  <div className="progress-bar-container">
                    <div 
                      className="progress-bar" 
                      style={{ width: `${plano.progresso}%` }}
                    ></div>
                  </div>
                </div>
                <Link to="#" className="plano-button">
                  Ver Detalhes
                </Link>
              </div>
            ))}
          </div>

          <Link to="/dashboard" className="back-link">
            <ArrowLeft size={16} /> Voltar para o Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PlanoAcao;
