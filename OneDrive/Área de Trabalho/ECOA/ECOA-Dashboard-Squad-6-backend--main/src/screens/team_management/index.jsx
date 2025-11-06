import { useState } from "react";
import { ArrowLeft, Users, UserPlus, Mail, Phone, Award } from "lucide-react";
import { Link } from "react-router-dom";
import './team_management.css';

function TeamManagement() {
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
            <h2 className="w3-text-white">Team Management</h2>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="main-content">
          <div className="content-overlay">
            <div className="content-container">
              <div className="team-header">
                <div className="team-title">Gerenciamento de Equipe</div>
                <Link to="/dashboard">
                  <button className="back-button w3-button">
                    <ArrowLeft size={20} />
                    Voltar ao Dashboard
                  </button>
                </Link>
              </div>

              <div className="team-grid">
                <div className="team-card w3-card">
                  <div className="team-member-avatar">
                    <Users size={50} color="#ffc107" />
                  </div>
                  <div className="team-member-info">
                    <div className="team-member-name">Ana Silva</div>
                    <div className="team-member-role">Gerente de Projetos</div>
                    <div className="w3-light-grey w3-round-xlarge">
                      <div className="w3-container w3-round-xlarge" style={{ width: '90%', backgroundColor: '#ffc107' }}>90%</div>
                    </div>
                    <p>Desempenho</p>
                  </div>
                  <div className="team-actions">
                    <button className="team-action-button w3-button">Perfil</button>
                    <button className="team-action-button w3-button">Mensagem</button>
                  </div>
                </div>

                <div className="team-card w3-card">
                  <div className="team-member-avatar">
                    <Users size={50} color="#ffc107" />
                  </div>
                  <div className="team-member-info">
                    <div className="team-member-name">Carlos Mendes</div>
                    <div className="team-member-role">Desenvolvedor Sênior</div>
                    <div className="w3-light-grey w3-round-xlarge">
                      <div className="w3-container w3-round-xlarge" style={{ width: '85%', backgroundColor: '#ffc107' }}>85%</div>
                    </div>
                    <p>Desempenho</p>
                  </div>
                  <div className="team-actions">
                    <button className="team-action-button w3-button">Perfil</button>
                    <button className="team-action-button w3-button">Mensagem</button>
                  </div>
                </div>

                <div className="team-card w3-card">
                  <div className="team-member-avatar">
                    <Users size={50} color="#ffc107" />
                  </div>
                  <div className="team-member-info">
                    <div className="team-member-name">Juliana Costa</div>
                    <div className="team-member-role">Designer UX/UI</div>
                    <div className="w3-light-grey w3-round-xlarge">
                      <div className="w3-container w3-round-xlarge" style={{ width: '95%', backgroundColor: '#ffc107' }}>95%</div>
                    </div>
                    <p>Desempenho</p>
                  </div>
                  <div className="team-actions">
                    <button className="team-action-button w3-button">Perfil</button>
                    <button className="team-action-button w3-button">Mensagem</button>
                  </div>
                </div>
              </div>

              <div className="w3-card w3-container" style={{ marginBottom: '30px', backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>
                <h3>Membros da Equipe</h3>
                <table className="w3-table w3-striped w3-hoverable">
                  <thead>
                    <tr>
                      <th>Nome</th>
                      <th>Cargo</th>
                      <th>Email</th>
                      <th>Telefone</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Ana Silva</td>
                      <td>Gerente de Projetos</td>
                      <td>ana.silva@empresa.com</td>
                      <td>(11) 98765-4321</td>
                      <td><span className="w3-badge">Ativo</span></td>
                    </tr>
                    <tr>
                      <td>Carlos Mendes</td>
                      <td>Desenvolvedor Sênior</td>
                      <td>carlos.mendes@empresa.com</td>
                      <td>(11) 91234-5678</td>
                      <td><span className="w3-badge">Ativo</span></td>
                    </tr>
                    <tr>
                      <td>Juliana Costa</td>
                      <td>Designer UX/UI</td>
                      <td>juliana.costa@empresa.com</td>
                      <td>(11) 99876-5432</td>
                      <td><span className="w3-badge">Ativo</span></td>
                    </tr>
                    <tr>
                      <td>Roberto Almeida</td>
                      <td>Analista de Dados</td>
                      <td>roberto.almeida@empresa.com</td>
                      <td>(11) 95555-4444</td>
                      <td><span className="w3-badge" style={{ backgroundColor: '#ccc', color: '#333' }}>Férias</span></td>
                    </tr>
                    <tr>
                      <td>Fernanda Lima</td>
                      <td>Desenvolvedora Frontend</td>
                      <td>fernanda.lima@empresa.com</td>
                      <td>(11) 94444-3333</td>
                      <td><span className="w3-badge">Ativo</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="w3-card w3-container" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>
                <h3>Adicionar Novo Membro</h3>
                <form className="w3-container">
                  <div className="w3-row-padding" style={{ margin: '8px -16px' }}>
                    <div className="w3-half">
                      <input className="w3-input w3-border" type="text" placeholder="Nome" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', color: 'white', border: '1px solid rgba(255, 255, 255, 0.2)' }} />
                    </div>
                    <div className="w3-half">
                      <input className="w3-input w3-border" type="text" placeholder="Cargo" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', color: 'white', border: '1px solid rgba(255, 255, 255, 0.2)' }} />
                    </div>
                  </div>
                  <div className="w3-row-padding" style={{ margin: '8px -16px' }}>
                    <div className="w3-half">
                      <input className="w3-input w3-border" type="email" placeholder="Email" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', color: 'white', border: '1px solid rgba(255, 255, 255, 0.2)' }} />
                    </div>
                    <div className="w3-half">
                      <input className="w3-input w3-border" type="tel" placeholder="Telefone" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', color: 'white', border: '1px solid rgba(255, 255, 255, 0.2)' }} />
                    </div>
                  </div>
                  <button className="w3-button w3-block" style={{ backgroundColor: '#ffc107', color: '#1e2d56', marginTop: '16px' }}>
                    <UserPlus size={16} style={{ marginRight: '8px' }} />
                    Adicionar Membro
                  </button>
                </form>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default TeamManagement;
