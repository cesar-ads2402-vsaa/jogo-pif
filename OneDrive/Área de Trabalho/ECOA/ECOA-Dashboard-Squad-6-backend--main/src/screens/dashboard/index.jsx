import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, Play, Accessibility, Bell, Mail, BarChart2, FileText, Users, Clipboard, Award, ChevronRight, CircleUserRound, GraduationCap, FilePenLine, Target, ClipboardList, Cog, LogOut } from "lucide-react";
import './dashboard.css';

function Dashboard() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSidebarExpanded, setSidebarExpanded] = useState(false);
  const [isSidebarHidden, setSidebarHidden] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

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

  // Fechar menu móvel quando a tela for redimensionada
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isMobileMenuOpen]);

  return (
    <div className="dashboard-background">
      <div className={`dashboard-container ${isSidebarHidden ? 'sidebar-hidden' : ''}`}>
        {/* Top Navigation Bar */}
        <header className="navbar w3-card">
          <div className="navbar-left">
          
            <div className="logo">
              <img src="../../assets/logo.png" alt="Logo" />
              <div className="logo-underline"></div>
            </div>
          </div>
          <div className="navbar-right">
            <button className="nav-icon w3-button">
              <Play size={20} />
            </button>
            <button className="nav-icon w3-button">
              <Accessibility size={20} />
            </button>
            <button className="nav-icon w3-button">
              <Bell size={20} />
            </button>
            <button className="nav-icon w3-button">
              <Mail size={20} />
            </button>
          </div>
        </header>

        {/* Botão Hambúrguer para o menu lateral */}
        <button
          className={`hamburger-btn ${isSidebarHidden ? "sidebar-hidden" : ""}`}
          onClick={toggleSidebar}
          aria-label="Alternar menu lateral"
        >
          {isSidebarHidden ? <ChevronRight size={24} /> : <Menu size={24} />}
        </button>

        {/* Vertical Sidebar */}
        <aside
          className={`sidebar ${isMobileMenuOpen ? "mobile-open" : ""} ${isSidebarHidden ? "sidebar-hidden" : ""} ${isSidebarExpanded ? "sidebar-expanded" : "sidebar-collapsed"}`}
          onMouseEnter={expandSidebar}
          onMouseLeave={collapseSidebar}
          style={{
            transform: isSidebarHidden ? "translateX(-100%)" : "translateX(0)",
            transition: "transform 0.3s ease"
          }}
        >
          <div className="sidebar-icons">
            <Link to="/minha-conta" className="sidebar-icon">
              <CircleUserRound size={30} />
              <span className="sidebar-icon-text">Minha Conta</span>
            </Link>
            <Link to="/dashboard" className="sidebar-icon active">
              <BarChart2 size={30} />
              <span className="sidebar-icon-text">Dashboard</span>
            </Link>
            <a href="https://intensegp.com.br/servicos/" className="sidebar-icon" target="_blank" rel="noopener noreferrer">
              <GraduationCap size={30} />
              <span className="sidebar-icon-text">Academy</span>
            </a>
            <Link to="/questionario" className="sidebar-icon">
              <FilePenLine size={30} />
              <span className="sidebar-icon-text">Questionário</span>
            </Link>
            <Link to="/plano-acao" className="sidebar-icon">
              <Target size={30} />
              <span className="sidebar-icon-text">Plan. Ação</span>
            </Link>
            <Link to="/relatorio" className="sidebar-icon">
              <ClipboardList size={30} />
              <span className="sidebar-icon-text">Relatório</span>
            </Link>
            <Link to="/config" className="sidebar-icon">
              <Cog size={30} />
              <span className="sidebar-icon-text">Config</span>
            </Link>
            <Link to="/sair" className="sidebar-icon">
              <LogOut size={30} />
              <span className="sidebar-icon-text">Sair</span>
            </Link>
          </div>
        </aside>

        {/* Main Content Area with Background Image */}

        <main className="main-content">
          <div className="content-overlay">
            <div className="content-container">
              <h1>Bem-vindo ao Dashboard ECOA</h1>
              <p>Acesse todas as suas ferramentas de negócios e análises em um só lugar</p>

              <div className="dashboard-cards">
                <div className="card w3-card">
                  <h3>Business Analytics</h3>
                  <p>Visualize métricas de desempenho e KPIs da sua empresa</p>
                  <Link to="/business-analytics">
                    <button className="card-button w3-button">Ver Análises</button>
                  </Link>
                </div>

                <div className="card w3-card">
                  <h3>Team Management</h3>
                  <p>Gerencie os membros da sua equipe e suas atribuições</p>
                  <Link to="/team-management">
                    <button className="card-button w3-button">Gerenciar Equipe</button>
                  </Link>
                </div>

                <div className="card w3-card">
                  <h3>Project Status</h3>
                  <p>Acompanhe o progresso dos seus projetos em andamento</p>
                  <Link to="/project-status">
                    <button className="card-button w3-button">Ver Projetos</button>
                  </Link>
                </div>
                
                <div className="card w3-card">
                  <h3>Dashboard Gráficos</h3>
                  <p>Visualize dados importantes em gráficos interativos</p>
                  <Link to="/dashboard-graphs">
                    <button className="card-button w3-button">Ver Gráficos</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
