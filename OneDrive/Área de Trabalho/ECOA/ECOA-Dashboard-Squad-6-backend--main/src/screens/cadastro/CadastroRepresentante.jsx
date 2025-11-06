import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaLock, FaIdCard, FaBuilding, FaHandshake } from 'react-icons/fa';

const CadastroRepresentante = () => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    cpf: '',
    empresa: '',
    cargo: '',
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
            <FaUser className="input-icon" />
            <input
              type="text"
              name="nome"
              placeholder="Nome Completo"
              className="login-input"
              value={formData.nome}
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
            <FaIdCard className="input-icon" />
            <input
              type="text"
              name="cpf"
              placeholder="CPF"
              className="login-input"
              value={formData.cpf}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-with-icon">
            <FaBuilding className="input-icon" />
            <input
              type="text"
              name="empresa"
              placeholder="Empresa que Representa"
              className="login-input"
              value={formData.empresa}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-with-icon">
            <FaHandshake className="input-icon" />
            <input
              type="text"
              name="cargo"
              placeholder="Cargo na Empresa"
              className="login-input"
              value={formData.cargo}
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

export default CadastroRepresentante;