import { useState } from "react";
import { ArrowLeft, Clipboard, Clock, Calendar, Users, CheckCircle, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import './project_status.css';

function ProjectStatus() {
  return (
    <div className="dashboard-background">
      <div className="dashboard-container">
        {/* Top Navigation Bar */}
        <header className="navbar w3-card">
          <div className="navbar-left">
            <div className="logo">
              <img src="../../assets/logo.png" alt="Logo" />
              <div className="logo-underline"></div>
            </div>
          </div>
          <div className="navbar-right">
            <h2 className="w3-text-white">Project Status</h2>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="main-content">
          <div className="content-overlay">
            <div className="content-container">
              <div className="project-header">
                <div className="project-title">Status dos Projetos</div>
                <Link to="/dashboard">
                  <button className="back-button w3-button">
                    <ArrowLeft size={20} />
                    Voltar ao Dashboard
                  </button>
                </Link>
              </div>

              <div className="project-grid">
                <div className="project-card w3-card">
                  <h3>Redesign do Portal</h3>
                  <div className="project-status">
                    <span className="status-badge in-progress">Em Progresso</span>
                    <span>75% Completo</span>
                  </div>
                  <div className="project-progress w3-light-grey w3-round-xlarge">
                    <div className="w3-container w3-round-xlarge" style={{ width: '75%', backgroundColor: '#ffc107' }}>75%</div>
                  </div>
                  <p>Redesign completo do portal corporativo com foco em experiência do usuário e acessibilidade.</p>
                  <div className="project-details">
                    <span><Clock size={16} style={{ verticalAlign: 'middle', marginRight: '5px' }} /> Prazo: 15/06/2025</span>
                    <span><Users size={16} style={{ verticalAlign: 'middle', marginRight: '5px' }} /> Equipe: 5 pessoas</span>
                  </div>
                </div>

                <div className="project-card w3-card">
                  <h3>Aplicativo Mobile</h3>
                  <div className="project-status">
                    <span className="status-badge in-progress">Em Progresso</span>
                    <span>40% Completo</span>
                  </div>
                  <div className="project-progress w3-light-grey w3-round-xlarge">
                    <div className="w3-container w3-round-xlarge" style={{ width: '40%', backgroundColor: '#ffc107' }}>40%</div>
                  </div>
                  <p>Desenvolvimento de aplicativo mobile para iOS e Android com funcionalidades de gestão de projetos.</p>
                  <div className="project-details">
                    <span><Clock size={16} style={{ verticalAlign: 'middle', marginRight: '5px' }} /> Prazo: 30/07/2025</span>
                    <span><Users size={16} style={{ verticalAlign: 'middle', marginRight: '5px' }} /> Equipe: 4 pessoas</span>
                  </div>
                </div>

                <div className="project-card w3-card">
                  <h3>Integração API</h3>
                  <div className="project-status">
                    <span className="status-badge completed">Concluído</span>
                    <span>100% Completo</span>
                  </div>
                  <div className="project-progress w3-light-grey w3-round-xlarge">
                    <div className="w3-container w3-round-xlarge" style={{ width: '100%', backgroundColor: '#4caf50' }}>100%</div>
                  </div>
                  <p>Integração de APIs de terceiros para automatização de processos de pagamento e faturamento.</p>
                  <div className="project-details">
                    <span><Clock size={16} style={{ verticalAlign: 'middle', marginRight: '5px' }} /> Concluído: 10/05/2025</span>
                    <span><Users size={16} style={{ verticalAlign: 'middle', marginRight: '5px' }} /> Equipe: 3 pessoas</span>
                  </div>
                </div>
              </div>

              <div className="project-timeline w3-card">
                <h3>Linha do Tempo do Projeto</h3>
                
                <div className="timeline-item">
                  <div className="timeline-date">10/05/2025</div>
                  <div className="timeline-title">Integração API Concluída</div>
                  <div className="timeline-description">Todas as integrações de API foram finalizadas e testadas com sucesso.</div>
                </div>
                
                <div className="timeline-item">
                  <div className="timeline-date">01/05/2025</div>
                  <div className="timeline-title">Fase de Testes do Redesign</div>
                  <div className="timeline-description">Iniciada a fase de testes de usabilidade do novo design do portal.</div>
                </div>
                
                <div className="timeline-item">
                  <div className="timeline-date">15/04/2025</div>
                  <div className="timeline-title">Protótipo do App Mobile</div>
                  <div className="timeline-description">Protótipo funcional do aplicativo mobile aprovado pela diretoria.</div>
                </div>
                
                <div className="timeline-item">
                  <div className="timeline-date">01/04/2025</div>
                  <div className="timeline-title">Início do Projeto de Redesign</div>
                  <div className="timeline-description">Kickoff do projeto de redesign do portal corporativo.</div>
                </div>
              </div>

              <div className="w3-card w3-container" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>
                <h3>Resumo dos Projetos</h3>
                <table className="w3-table w3-striped w3-hoverable">
                  <thead>
                    <tr>
                      <th>Projeto</th>
                      <th>Status</th>
                      <th>Progresso</th>
                      <th>Prazo</th>
                      <th>Responsável</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Redesign do Portal</td>
                      <td><span className="status-badge in-progress">Em Progresso</span></td>
                      <td>
                        <div className="w3-light-grey w3-round-xlarge">
                          <div className="w3-container w3-round-xlarge" style={{ width: '75%', backgroundColor: '#ffc107' }}>75%</div>
                        </div>
                      </td>
                      <td>15/06/2025</td>
                      <td>Juliana Costa</td>
                    </tr>
                    <tr>
                      <td>Aplicativo Mobile</td>
                      <td><span className="status-badge in-progress">Em Progresso</span></td>
                      <td>
                        <div className="w3-light-grey w3-round-xlarge">
                          <div className="w3-container w3-round-xlarge" style={{ width: '40%', backgroundColor: '#ffc107' }}>40%</div>
                        </div>
                      </td>
                      <td>30/07/2025</td>
                      <td>Carlos Mendes</td>
                    </tr>
                    <tr>
                      <td>Integração API</td>
                      <td><span className="status-badge completed">Concluído</span></td>
                      <td>
                        <div className="w3-light-grey w3-round-xlarge">
                          <div className="w3-container w3-round-xlarge" style={{ width: '100%', backgroundColor: '#4caf50' }}>100%</div>
                        </div>
                      </td>
                      <td>10/05/2025</td>
                      <td>Roberto Almeida</td>
                    </tr>
                    <tr>
                      <td>Migração de Dados</td>
                      <td><span className="status-badge pending">Pendente</span></td>
                      <td>
                        <div className="w3-light-grey w3-round-xlarge">
                          <div className="w3-container w3-round-xlarge" style={{ width: '0%', backgroundColor: '#f44336' }}>0%</div>
                        </div>
                      </td>
                      <td>15/08/2025</td>
                      <td>Fernanda Lima</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default ProjectStatus;
