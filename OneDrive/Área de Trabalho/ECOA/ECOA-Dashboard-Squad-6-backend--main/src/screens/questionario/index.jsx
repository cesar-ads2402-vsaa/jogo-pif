import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Users, Leaf, Building } from "lucide-react";
import './questionario.css';

function Questionario() {
  return (
    <div className="dashboard-background">
      <div className="questionario-container">
        <div className="questionario-header">
          <h1>QUESTIONÁRIO</h1>
        </div>

        <div className="questionario-content">
          <div className="questionario-categories">
            <Link to="/questionario/social" className="category-button">
              <div className="category-icon social-icon">
                <Users size={40} />
              </div>
              <span className="category-text">Social</span>
            </Link>
            
            <Link to="/questionario/meio-ambiente" className="category-button">
              <div className="category-icon environment-icon">
                <Leaf size={40} />
              </div>
              <span className="category-text">Meio Ambiente</span>
            </Link>
            
            <Link to="/questionario/governanca" className="category-button">
              <div className="category-icon governance-icon">
                <Building size={40} />
              </div>
              <span className="category-text">Governança</span>
            </Link>
          </div>

          <Link to="/dashboard" className="back-link">
            <ArrowLeft size={16} /> Voltar para o Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Questionario;
