import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";
import { FaUser, FaLock, FaBuilding } from "react-icons/fa";
import { authenticate } from "./auth";
import {useUser} from "../../context";
import logo from "../../assets/logo.png";
import backgroundImage from "../../assets/background.png";

const Login = ({ setIsAuthenticated }) => {
  const [credentials, setCredentials] = useState({
    email: "",
    cnpj: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {login} = useUser();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validação básica
    if (!credentials.email || !credentials.password || !credentials.cnpj) {
      setError("Por favor, preencha todos os campos");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const authResult = await authenticate(
        credentials.email,
        credentials.cnpj,
        credentials.password
      );
      if (authResult.success) {
        setIsAuthenticated(true); // Atualiza o estado no App
        login(authResult.user);
        navigate("/dashboard", { replace: true }); // Redireciona para o dashboard
      } else {
        setError(authResult.message || "Credenciais inválidas. Por favor, tente novamente.");
      }
    } catch (err) {
      setError(err.message || "Ocorreu um erro. Por favor, tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      {/* Background (usado via CSS em .login-page) */}

      {/* Logo ECOA */}
      <img src={logo} alt="Logo ECOA" className="login-logo" />

      {/* Texto informativo */}
      <p className="login-info-text">
        Acesse sua conta e junte-se a<br />
        uma comunidade que transforma<br />
        inovação em impacto.
      </p>

      {/* Container do Formulário de Login */}
      <div className="login-form-container">
          <h1 className="login-welcome-title">Seja Bem Vindo!</h1>
          <p className="login-welcome-subtitle">Crie sua conta, leva menos de um minuto!</p>
          
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="input-container">
            <div className="input-with-icon">
              <FaUser className="input-icon" />
              <input
                type="email"
                name="email"
                placeholder="E-mail corporativo"
                className="login-input"
                required
                value={credentials.email}
                onChange={handleChange}
              />
            </div>

              <div className="input-with-icon">
                <FaBuilding className="input-icon" />
                <input
                  type="text"
                  name="cnpj"
                  placeholder="CNPJ"
                  className="login-input"
                  required
                  value={credentials.cnpj}
                  onChange={handleChange}
                />
              </div>

            <div className="input-with-icon">
              <FaLock className="input-icon" />
              <input
                type="password"
                name="password"
                placeholder="Senha"
                className="login-input"
                required
                value={credentials.password}
                onChange={handleChange}
              />
            </div>

            {error && <div className="error-message">{error}</div>}

            {/* BOTÃO ENTRAR - ÚNICO QUE FAZ SUBMIT */}
            <button
              type="submit"
              className="login-button-yellow"
              disabled={loading}
            >
              {loading ? "CARREGANDO..." : "ENTRAR"}
            </button>

            <div className="linkforgetpassword">
              <a href="#recover" className="link-forget-password">
                Esqueceu a senha?
              </a>
            </div>

            {/* BOTÃO CADASTRE-SE - SEPARADO DO FORM */}
            <Link to="/cadastro" className="login-button-yellow-link">
              <button
                type="button"
                className="login-button-yellow"
              >
                CADASTRE-SE
              </button>
            </Link>

            <div className="login-google-container">
              <p className="login-google-text">Faça login com</p>
              <a 
                href="https://accounts.google.com/v3/signin/identifier?continue=https%3A%2F%2Fwww.google.com%2Fwebhp%3Fhl%3Dpt-BR%26sa%3DX%26ved%3D0ahUKEwjg2I3cotONAxXdExAIHXtONRoQPAgJ&ec=futura_exp_og_so_72776762_e&hl=pt-BR&ifkv=AdBytiP27OkCLHw4d-G9GZKVCqNXt5LBEk1yrsckBYHRPZbscAcmoomvU1K8mcrlCVlZ868CiVZy&passive=true&flowName=GlifWebSignIn&flowEntry=ServiceLogin&dsh=S2030322199%3A1748888327008065"
                className="login-google-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src="/assets/google.png" alt="Google Login" className="login-google-icon" />
              </a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;