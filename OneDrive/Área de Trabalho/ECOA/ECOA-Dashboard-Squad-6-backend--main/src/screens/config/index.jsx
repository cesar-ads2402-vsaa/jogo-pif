import { useState } from "react";
import { Link } from "react-router-dom";
import { Cog, User, Bell, Shield, Palette, ArrowLeft, Monitor, Globe, Moon } from "lucide-react";
import './config.css';

function Config() {
  const [activeTab, setActiveTab] = useState("geral");
  const [configData, setConfigData] = useState({
    idioma: "pt-BR",
    tema: "escuro",
    notificacoes: true,
    emailNotificacoes: true,
    modoCompacto: false,
    autoSave: true,
    timeZone: "America/Sao_Paulo"
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setConfigData({
      ...configData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Configurações salvas com sucesso!");
  };

  return (
    <div className="dashboard-background">
      <div className="config-container">
        <div className="config-header">
          <h1>Configurações</h1>
          <p>Personalize sua experiência no dashboard</p>
        </div>

        <div className="config-content">
          <div className="config-tabs">
            <div 
              className={`config-tab ${activeTab === 'geral' ? 'active' : ''}`}
              onClick={() => setActiveTab('geral')}
            >
              <Cog size={18} /> Geral
            </div>
            <div 
              className={`config-tab ${activeTab === 'perfil' ? 'active' : ''}`}
              onClick={() => setActiveTab('perfil')}
            >
              <User size={18} /> Perfil
            </div>
            <div 
              className={`config-tab ${activeTab === 'notificacoes' ? 'active' : ''}`}
              onClick={() => setActiveTab('notificacoes')}
            >
              <Bell size={18} /> Notificações
            </div>
            <div 
              className={`config-tab ${activeTab === 'aparencia' ? 'active' : ''}`}
              onClick={() => setActiveTab('aparencia')}
            >
              <Palette size={18} /> Aparência
            </div>
            <div 
              className={`config-tab ${activeTab === 'privacidade' ? 'active' : ''}`}
              onClick={() => setActiveTab('privacidade')}
            >
              <Shield size={18} /> Privacidade
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {activeTab === 'geral' && (
              <div className="config-section">
                <h3 className="config-section-title">
                  <Cog size={20} /> Configurações Gerais
                </h3>
                <div className="config-form">
                  <div className="config-field">
                    <label htmlFor="idioma">Idioma</label>
                    <select 
                      id="idioma" 
                      name="idioma" 
                      value={configData.idioma} 
                      onChange={handleChange}
                    >
                      <option value="pt-BR">Português (Brasil)</option>
                      <option value="en-US">English (United States)</option>
                      <option value="es">Español</option>
                    </select>
                  </div>

                  <div className="config-field">
                    <label htmlFor="timeZone">Fuso Horário</label>
                    <select 
                      id="timeZone" 
                      name="timeZone" 
                      value={configData.timeZone} 
                      onChange={handleChange}
                    >
                      <option value="America/Sao_Paulo">Brasília (GMT-3)</option>
                      <option value="America/New_York">New York (GMT-4)</option>
                      <option value="Europe/London">London (GMT+1)</option>
                      <option value="Asia/Tokyo">Tokyo (GMT+9)</option>
                    </select>
                  </div>

                  <div className="toggle-option">
                    <span className="toggle-label">Salvamento Automático</span>
                    <label className="toggle-switch">
                      <input 
                        type="checkbox" 
                        name="autoSave" 
                        checked={configData.autoSave} 
                        onChange={handleChange}
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>

                  <div className="toggle-option">
                    <span className="toggle-label">Modo Compacto</span>
                    <label className="toggle-switch">
                      <input 
                        type="checkbox" 
                        name="modoCompacto" 
                        checked={configData.modoCompacto} 
                        onChange={handleChange}
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'aparencia' && (
              <div className="config-section">
                <h3 className="config-section-title">
                  <Palette size={20} /> Aparência
                </h3>
                <div className="config-form">
                  <div className="config-field">
                    <label htmlFor="tema">Tema</label>
                    <select 
                      id="tema" 
                      name="tema" 
                      value={configData.tema} 
                      onChange={handleChange}
                    >
                      <option value="claro">Claro</option>
                      <option value="escuro">Escuro</option>
                      <option value="sistema">Seguir Sistema</option>
                    </select>
                  </div>

                  <div className="toggle-option">
                    <span className="toggle-label">Modo Noturno Automático</span>
                    <label className="toggle-switch">
                      <input 
                        type="checkbox" 
                        name="modoNoturno" 
                        checked={configData.modoNoturno} 
                        onChange={handleChange}
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'notificacoes' && (
              <div className="config-section">
                <h3 className="config-section-title">
                  <Bell size={20} /> Notificações
                </h3>
                <div className="config-form">
                  <div className="toggle-option">
                    <span className="toggle-label">Notificações no Navegador</span>
                    <label className="toggle-switch">
                      <input 
                        type="checkbox" 
                        name="notificacoes" 
                        checked={configData.notificacoes} 
                        onChange={handleChange}
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>

                  <div className="toggle-option">
                    <span className="toggle-label">Notificações por E-mail</span>
                    <label className="toggle-switch">
                      <input 
                        type="checkbox" 
                        name="emailNotificacoes" 
                        checked={configData.emailNotificacoes} 
                        onChange={handleChange}
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                </div>
              </div>
            )}

            <div className="action-buttons">
              <Link to="/dashboard">
                <button type="button" className="action-button cancel-button">
                  Cancelar
                </button>
              </Link>
              <button type="submit" className="action-button">
                Salvar Alterações
              </button>
            </div>
          </form>

          <Link to="/dashboard" className="back-link">
            <ArrowLeft size={16} /> Voltar para o Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Config;
