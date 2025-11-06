import React, { useState } from 'react';
import { Link } from "react-router-dom";
import "./stylecad.css";
import CadastroEmpresa from "./CadastroEmpresa";
import CadastroFuncionario from "./CadastroFuncionario";
import CadastroFilial from "./CadastroFilial";
import CadastroRepresentante from "./CadastroRepresentante";

function Cadastro() {
  const [tipoCadastro, setTipoCadastro] = useState('');
  
  const renderFormulario = () => {
    switch (tipoCadastro) {
      case 'empresa':
        return <CadastroEmpresa/>;
      case 'funcionario':
        return <CadastroFuncionario />; 
      case 'representante':
        return <CadastroRepresentante />;
      case 'filial':
        return <CadastroFilial />;
      default:
        return <p className="selecione-acima">Selecione o tipo de cadastro acima</p>;
    }
  };

  return (
    <div className="login-page">
      {/* Logo ECOA - igual ao login */}
      <img src="/assets/logo.png" alt="Logo ECOA" className="login-logo" />

      {/* Texto informativo - igual ao login */}
      <p className="login-info-text">
        Junte-se à nossa comunidade e<br />
        transforme inovação em impacto.
      </p>

      {/* Container do Formulário - igual ao login mas conteúdo diferente */}
      <div className="login-form-container">
        <h1 className="login-welcome-title">Seja Bem-Vindo!</h1>
        <p className="login-welcome-subtitle">Crie sua conta, leva menos de um minuto!</p>
        
        {/* Conteúdo específico do cadastro */}
        <div className="cadastro-content">
          {tipoCadastro === '' && (
            <div className="botoes-cadastro-container">
              <button className="botao-tipo-cadastro" onClick={() => setTipoCadastro('empresa')}>
                Sou Empresa
              </button>
              <button className="botao-tipo-cadastro" onClick={() => setTipoCadastro('funcionario')}>
                Sou Funcionário
              </button>
              <button className="botao-tipo-cadastro" onClick={() => setTipoCadastro('representante')}>
                Sou Representante
              </button>
              <button className="botao-tipo-cadastro" onClick={() => setTipoCadastro('filial')}>
                Sou Filial
              </button>
            </div>
          )}
          
          <div className="formulario-cadastro">
            {renderFormulario()}
          </div>

          {tipoCadastro !== '' && (
            <div className="voltar-container">
              <button 
                className="botao-voltar" 
                onClick={() => setTipoCadastro('')}
              >
                ← Voltar
              </button>
            </div>
          )}

          {/* Link para voltar ao login */}
          <div className="link-login-container">
            <Link to="/login" className="link-login">
              Já tem uma conta? Faça login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cadastro;