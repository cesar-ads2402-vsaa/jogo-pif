import React, { useState } from 'react';
import { FaBuilding, FaEnvelope, FaLock, FaMapMarkerAlt, FaPhone, FaUser } from 'react-icons/fa';

const CadastroFilial = () => {
  const [formData, setFormData] = useState({
    nomeFilial: '',
    cnpj: '',
    email: '',
    telefone: '',
    endereco: '',
    responsavel: '',
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
              name="nomeFilial"
              placeholder="Nome da Filial"
              className="login-input"
              value={formData.nomeFilial}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-with-icon">
            <FaBuilding className="input-icon" />
            <input
              type="text"
              name="cnpj"
              placeholder="CNPJ da Filial"
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
              placeholder="E-mail da Filial"
              className="login-input"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-with-icon">
            <FaPhone className="input-icon" />
            <input
              type="tel"
              name="telefone"
              placeholder="Telefone da Filial"
              className="login-input"
              value={formData.telefone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-with-icon">
            <FaMapMarkerAlt className="input-icon" />
            <input
              type="text"
              name="endereco"
              placeholder="Endereço Completo"
              className="login-input"
              value={formData.endereco}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-with-icon">
            <FaUser className="input-icon" />
            <input
              type="text"
              name="responsavel"
              placeholder="Responsável pela Filial"
              className="login-input"
              value={formData.responsavel}
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

export default CadastroFilial;