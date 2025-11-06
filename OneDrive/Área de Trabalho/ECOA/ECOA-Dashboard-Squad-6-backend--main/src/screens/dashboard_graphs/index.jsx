import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, BarChart2, PieChart, LineChart, BarChart, RefreshCw, Download, Filter } from "lucide-react";
import './dashboard_graphs.css';

function DashboardGraphs() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSidebarExpanded, setSidebarExpanded] = useState(false);
  const [isSidebarHidden, setSidebarHidden] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedDepartment, setSelectedDepartment] = useState('all');

  const toggleSidebar = () => {
    setSidebarHidden(!isSidebarHidden);
    setSidebarExpanded(false);
  };

  const expandSidebar = () => {
    setSidebarExpanded(true);
  };

  const collapseSidebar = () => {
    setSidebarExpanded(false);
  };

  return (
    <div className="dashboard-background">
      <div className={`dashboard-container ${isSidebarHidden ? 'sidebar-hidden' : ''}`}>
        {/* Top Navigation Bar */}
        <header className="navbar w3-card">
          <div className="navbar-left">
            <button className="menu-toggle w3-button" onClick={toggleSidebar}>
              <Filter size={40} />
            </button>
            <div className="logo">
              <img src="../../assets/logo.png" alt="Logo" />
              <div className="logo-underline"></div>
            </div>
          </div>
          <div className="navbar-right">
            <h2 className="w3-text-white">Dashboard Gráficos</h2>
          </div>
        </header>

        {/* Botão Hambúrguer para o menu lateral */}
        <button className="hamburger-btn" onClick={toggleSidebar}>
          <Filter size={24} />
        </button>

        {/* Main Content Area */}
        <main className="main-content">
          <div className="content-overlay">
            <div className="content-container">
              <div className="graphs-header">
                <div className="graphs-title">Visualização de Dados</div>
                <Link to="/dashboard">
                  <button className="back-button w3-button">
                    <ArrowLeft size={20} />
                    Voltar ao Dashboard
                  </button>
                </Link>
              </div>

              <div className="graph-filters w3-card">
                <div className="filter-item">
                  <span className="filter-label">Período:</span>
                  <select 
                    className="filter-select"
                    value={selectedPeriod}
                    onChange={(e) => setSelectedPeriod(e.target.value)}
                  >
                    <option value="day">Diário</option>
                    <option value="week">Semanal</option>
                    <option value="month">Mensal</option>
                    <option value="year">Anual</option>
                  </select>
                </div>
                <div className="filter-item">
                  <span className="filter-label">Departamento:</span>
                  <select 
                    className="filter-select"
                    value={selectedDepartment}
                    onChange={(e) => setSelectedDepartment(e.target.value)}
                  >
                    <option value="all">Todos</option>
                    <option value="sales">Vendas</option>
                    <option value="marketing">Marketing</option>
                    <option value="development">Desenvolvimento</option>
                    <option value="hr">Recursos Humanos</option>
                  </select>
                </div>
                <div className="filter-item">
                  <button className="graph-control-button">
                    <RefreshCw size={16} style={{ marginRight: '5px' }} />
                    Atualizar
                  </button>
                </div>
              </div>

              <div className="graphs-grid">
                <div className="graph-card w3-card">
                  <h3>Receita Mensal</h3>
                  <div className="graph-placeholder">
                    <BarChart2 size={100} color="#ffc107" />
                  </div>
                  <div className="graph-controls">
                    <button className="graph-control-button">
                      <Download size={16} style={{ marginRight: '5px' }} />
                      Exportar
                    </button>
                  </div>
                </div>

                <div className="graph-card w3-card">
                  <h3>Distribuição de Vendas</h3>
                  <div className="graph-placeholder">
                    <PieChart size={100} color="#ffc107" />
                  </div>
                  <div className="graph-controls">
                    <button className="graph-control-button">
                      <Download size={16} style={{ marginRight: '5px' }} />
                      Exportar
                    </button>
                  </div>
                </div>

                <div className="graph-card w3-card">
                  <h3>Desempenho da Equipe</h3>
                  <div className="graph-placeholder">
                    <BarChart size={100} color="#ffc107" />
                  </div>
                  <div className="graph-controls">
                    <button className="graph-control-button">
                      <Download size={16} style={{ marginRight: '5px' }} />
                      Exportar
                    </button>
                  </div>
                </div>

                <div className="graph-card w3-card">
                  <h3>Tendências de Crescimento</h3>
                  <div className="graph-placeholder">
                    <LineChart size={100} color="#ffc107" />
                  </div>
                  <div className="graph-controls">
                    <button className="graph-control-button">
                      <Download size={16} style={{ marginRight: '5px' }} />
                      Exportar
                    </button>
                  </div>
                </div>

                <div className="graph-card w3-card full-width-graph">
                  <h3>Análise Comparativa Anual</h3>
                  <div className="graph-placeholder">
                    <BarChart2 size={120} color="#ffc107" />
                  </div>
                  <div className="graph-controls">
                    <button className="graph-control-button">
                      <Download size={16} style={{ marginRight: '5px' }} />
                      Exportar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default DashboardGraphs;
