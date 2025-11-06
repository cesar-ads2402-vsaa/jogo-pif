import React, { useState } from 'react';
import { FaBuilding, FaUser, FaEnvelope, FaLock } from 'react-icons/fa';

const CadastroEmpresa = () => {
  const [formData, setFormData] = useState({
    cnpj: '',
    email: '',
    nomeSocial: '',
    senha: '',
    confirmarSenha: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica de cadastro aqui
  };

  return (
    <div className="formulario-especifico">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <div className="input-with-icon">
            <FaBuilding className="input-icon" />
            <input
              type="text"
              name="cnpj"
              placeholder="CNPJ"
              className="login-input"
              value={formData.cnpj}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-with-icon">
            <FaEnvelope className="input-icon" />
            <input
              type="email"
              name="email"
              placeholder="E-mail Corporativo"
              className="login-input"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-with-icon">
            <FaUser className="input-icon" />
            <input
              type="text"
              name="nomeSocial"
              placeholder="Nome Social"
              className="login-input"
              value={formData.nomeSocial}
              onChange={handleChange}
              required
            />
          </div>

          <div className="campos-senha">
            <div className="input-with-icon">
              <FaLock className="input-icon" />
              <input
                type="password"
                name="senha"
                placeholder="Defina sua Senha"
                className="login-input"
                value={formData.senha}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-with-icon">
              <FaLock className="input-icon" />
              <input
                type="password"
                name="confirmarSenha"
                placeholder="Confirme sua Senha"
                className="login-input"
                value={formData.confirmarSenha}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>

        <button type="submit" className="botao-cadastrar">
          Cadastrar
        </button>
      </form>
    </div>
  );
};

export default CadastroEmpresa;