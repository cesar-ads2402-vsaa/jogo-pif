import { useState } from "react";
import { ArrowLeft, BarChart2, PieChart, TrendingUp, DollarSign } from "lucide-react";
import { Link } from "react-router-dom";
import './business_analytics.css';

function BusinessAnalytics() {
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
            <h2 className="w3-text-white">Business Analytics</h2>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="main-content">
          <div className="content-overlay">
            <div className="content-container">
              <div className="analytics-header">
                <div className="analytics-title">Performance Metrics</div>
                <Link to="/dashboard">
                  <button className="back-button w3-button">
                    <ArrowLeft size={20} />
                    Voltar ao Dashboard
                  </button>
                </Link>
              </div>

              <div className="analytics-grid">
                <div className="analytics-card w3-card">
                  <h3>Receita Mensal</h3>
                  <div className="analytics-value">R$ 125.430</div>
                  <p>Aumento de 12% em relação ao mês anterior</p>
                  <div className="w3-light-grey w3-round-xlarge">
                    <div className="w3-container w3-round-xlarge" style={{ width: '70%', backgroundColor: '#ffc107' }}>70%</div>
                  </div>
                </div>

                <div className="analytics-card w3-card">
                  <h3>Novos Clientes</h3>
                  <div className="analytics-value">48</div>
                  <p>Aumento de 8% em relação ao mês anterior</p>
                  <div className="w3-light-grey w3-round-xlarge">
                    <div className="w3-container w3-round-xlarge" style={{ width: '60%', backgroundColor: '#ffc107' }}>60%</div>
                  </div>
                </div>

                <div className="analytics-card w3-card">
                  <h3>Taxa de Conversão</h3>
                  <div className="analytics-value">23.5%</div>
                  <p>Aumento de 5% em relação ao mês anterior</p>
                  <div className="w3-light-grey w3-round-xlarge">
                    <div className="w3-container w3-round-xlarge" style={{ width: '80%', backgroundColor: '#ffc107' }}>80%</div>
                  </div>
                </div>
              </div>

              <div className="analytics-chart w3-card">
                <h3>Desempenho Anual</h3>
                <div className="chart-placeholder">
                  <BarChart2 size={100} color="#ffc107" />
                </div>
              </div>

              <div className="analytics-grid">
                <div className="analytics-card w3-card">
                  <h3>Produtos Mais Vendidos</h3>
                  <div className="w3-container">
                    <p>Produto A - 45%</p>
                    <div className="w3-light-grey w3-round-xlarge">
                      <div className="w3-container w3-round-xlarge" style={{ width: '45%', backgroundColor: '#ffc107' }}>45%</div>
                    </div>
                    <p>Produto B - 30%</p>
                    <div className="w3-light-grey w3-round-xlarge">
                      <div className="w3-container w3-round-xlarge" style={{ width: '30%', backgroundColor: '#ffc107' }}>30%</div>
                    </div>
                    <p>Produto C - 25%</p>
                    <div className="w3-light-grey w3-round-xlarge">
                      <div className="w3-container w3-round-xlarge" style={{ width: '25%', backgroundColor: '#ffc107' }}>25%</div>
                    </div>
                  </div>
                </div>

                <div className="analytics-card w3-card">
                  <h3>Regiões de Vendas</h3>
                  <div className="w3-container">
                    <p>Sudeste - 55%</p>
                    <div className="w3-light-grey w3-round-xlarge">
                      <div className="w3-container w3-round-xlarge" style={{ width: '55%', backgroundColor: '#ffc107' }}>55%</div>
                    </div>
                    <p>Nordeste - 25%</p>
                    <div className="w3-light-grey w3-round-xlarge">
                      <div className="w3-container w3-round-xlarge" style={{ width: '25%', backgroundColor: '#ffc107' }}>25%</div>
                    </div>
                    <p>Sul - 20%</p>
                    <div className="w3-light-grey w3-round-xlarge">
                      <div className="w3-container w3-round-xlarge" style={{ width: '20%', backgroundColor: '#ffc107' }}>20%</div>
                    </div>
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

export default BusinessAnalytics;
