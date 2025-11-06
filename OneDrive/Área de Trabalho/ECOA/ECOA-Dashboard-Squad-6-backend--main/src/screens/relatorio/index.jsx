import { useState } from "react";
import { Link } from "react-router-dom";
import { FileText, Calendar, Download, ArrowLeft, Search, Filter, PieChart, BarChart2 } from "lucide-react";
import './relatorio.css';

function Relatorio() {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  
  const relatorios = [
    {
      id: 1,
      title: "Relatório de Desempenho Mensal",
      description: "Análise detalhada dos KPIs e métricas de desempenho do último mês.",
      data: "01/05/2025",
      tipo: "mensal",
      formato: "PDF"
    },
    {
      id: 2,
      title: "Relatório Trimestral de Inovação",
      description: "Resumo das iniciativas de inovação e resultados do último trimestre.",
      data: "15/04/2025",
      tipo: "trimestral",
      formato: "XLSX"
    },
    {
      id: 3,
      title: "Análise Anual de Projetos",
      description: "Visão geral do desempenho de todos os projetos no último ano fiscal.",
      data: "10/01/2025",
      tipo: "anual",
      formato: "PDF"
    },
    {
      id: 4,
      title: "Relatório de Eficiência de Equipes",
      description: "Análise personalizada da eficiência das equipes nos últimos 6 meses.",
      data: "22/03/2025",
      tipo: "personalizado",
      formato: "PPTX"
    }
  ];

  const getTypeLabel = (tipo) => {
    switch(tipo) {
      case 'mensal': return 'Mensal';
      case 'trimestral': return 'Trimestral';
      case 'anual': return 'Anual';
      case 'personalizado': return 'Personalizado';
      default: return tipo;
    }
  };

  const getIconByType = (tipo) => {
    switch(tipo) {
      case 'mensal': return <BarChart2 size={20} />;
      case 'trimestral': return <PieChart size={20} />;
      case 'anual': return <FileText size={20} />;
      case 'personalizado': return <FileText size={20} />;
      default: return <FileText size={20} />;
    }
  };

  const filteredRelatorios = relatorios.filter(relatorio => {
    const matchesSearch = relatorio.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         relatorio.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (typeFilter === "all") return matchesSearch;
    return matchesSearch && relatorio.tipo === typeFilter;
  });

  return (
    <div className="dashboard-background">
      <div className="relatorio-container">
        <div className="relatorio-header">
          <h1>Relatórios</h1>
          <p>Acesse e baixe relatórios detalhados sobre o desempenho da sua empresa</p>
        </div>

        <div className="relatorio-content">
          <button className="generate-button">
            <FileText size={16} /> Gerar Novo Relatório
          </button>

          <div className="filters">
            <div className="search-bar">
              <input 
                type="text" 
                className="search-input" 
                placeholder="Buscar relatórios..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="filter-options">
              <select 
                className="filter-select"
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
              >
                <option value="all">Todos os tipos</option>
                <option value="mensal">Mensal</option>
                <option value="trimestral">Trimestral</option>
                <option value="anual">Anual</option>
                <option value="personalizado">Personalizado</option>
              </select>
            </div>
          </div>

          <div className="relatorios-grid">
            {filteredRelatorios.map(relatorio => (
              <div className="relatorio-card" key={relatorio.id}>
                <h3 className="relatorio-title">
                  {getIconByType(relatorio.tipo)}
                  {relatorio.title}
                </h3>
                <p className="relatorio-description">{relatorio.description}</p>
                <div className="relatorio-meta">
                  <span><Calendar size={14} /> {relatorio.data}</span>
                  <span className={`type-badge type-${relatorio.tipo}`}>
                    {getTypeLabel(relatorio.tipo)}
                  </span>
                </div>
                <div className="relatorio-meta">
                  <span>Formato: {relatorio.formato}</span>
                </div>
                <Link to="#" className="relatorio-button">
                  <Download size={16} /> Baixar Relatório
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

export default Relatorio;
