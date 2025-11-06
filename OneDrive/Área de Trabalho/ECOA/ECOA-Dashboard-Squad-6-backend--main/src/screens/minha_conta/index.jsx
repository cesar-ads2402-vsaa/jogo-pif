import { useState } from "react";
import { Link } from "react-router-dom";
import { User, ArrowLeft } from "lucide-react";
import { useUser } from "../../context";
import './minha_conta.css';

function MinhaConta() {
  const {user} = useUser();
  
  const [userData, setUserData] = useState({
    nome: user.nome,
    email: user.email,
    cargo: user.cargo,
    departamento: user.departamento,
    telefone: user.telefone
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Perfil atualizado com sucesso!");
  };

  return (
    <div className="dashboard-background">
      <div className="minha-conta-container">
        <div className="minha-conta-header">
          <h1>Minha Conta</h1>
          <p>Gerencie suas informações pessoais</p>
        </div>

        <div className="minha-conta-content">
          <div className="profile-section">
            <div className="profile-image">
              <User size={80} />
            </div>
            <h2>{userData.nome}</h2>
            <p>
              {userData.cargo} - {userData.departamento}
            </p>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="profile-details">
              <div className="profile-field">
                <label htmlFor="nome">Nome Completo</label>
                <input
                  type="text"
                  id="nome"
                  name="nome"
                  value={userData.nome}
                  onChange={handleChange}
                />
              </div>

              <div className="profile-field">
                <label htmlFor="email">E-mail</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={userData.email}
                  onChange={handleChange}
                />
              </div>

              <div className="profile-field">
                <label htmlFor="cargo">Cargo</label>
                <input
                  type="text"
                  id="cargo"
                  name="cargo"
                  value={userData.cargo}
                  onChange={handleChange}
                />
              </div>

              <div className="profile-field">
                <label htmlFor="departamento">Departamento</label>
                <input
                  type="text"
                  id="departamento"
                  name="departamento"
                  value={userData.departamento}
                  onChange={handleChange}
                />
              </div>

              <div className="profile-field">
                <label htmlFor="telefone">Telefone</label>
                <input
                  type="tel"
                  id="telefone"
                  name="telefone"
                  value={userData.telefone}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="action-buttons">
              <Link to="/dashboard">
                <button type="button" className="action-button back-button">
                  <ArrowLeft size={16} /> Voltar
                </button>
              </Link>
              <button type="submit" className="action-button">
                Salvar Alterações
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default MinhaConta;
