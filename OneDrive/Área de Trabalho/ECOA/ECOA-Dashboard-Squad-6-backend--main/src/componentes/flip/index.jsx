import React, { useState } from "react";
import "./styleflip.css";
import Botao from "../botao/Botao";
import Login from "../../screens/login/Login";
import Cadastro from "../../screens/cadastro/Cadastro";

function Flip({ setIsAuthenticated }) {
  // Recebe a prop setIsAuthenticated
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className={`box ${isFlipped ? "flip" : ""}`}
      style={{ transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)" }}
    >
      <div className="front">
        <div className="text-boasvindas">
          <h1>Seja Bem Vindo ! </h1>
          <h3>Crie sua conta, leva menos de um minuto ! </h3>
        </div>

        {/* Passa setIsAuthenticated para o Login */}
        <Login setIsAuthenticated={setIsAuthenticated} />
        <div className="links">
          <div className="text-link" onClick={() => setIsFlipped(true)}>
            <Botao nome="Cadastrar-se" />
          </div>
        </div>
        <div className="links">
          <p> Faça login com </p>
          <a href="https://accounts.google.com/v3/signin/identifier?continue=https%3A%2F%2Fwww.google.com%2Fwebhp%3Fhl%3Dpt-BR%26sa%3DX%26ved%3D0ahUKEwjg2I3cotONAxXdExAIHXtONRoQPAgJ&ec=futura_exp_og_so_72776762_e&hl=pt-BR&ifkv=AdBytiP27OkCLHw4d-G9GZKVCqNXt5LBEk1yrsckBYHRPZbscAcmoomvU1K8mcrlCVlZ868CiVZy&passive=true&flowName=GlifWebSignIn&flowEntry=ServiceLogin&dsh=S2030322199%3A1748888327008065">
<img src="/assets/google.png" alt="" />
          </a>
        </div>
      </div>

      {/* back page removida para exibir apenas a face da frente */}
    </div>
  );
}

export default Flip;