import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Cadastro from "../src/screens/cadastro/Cadastro"; 
import logo from "./assets/logo.png";
import Login from "../src/screens/login/Login"; 
import Dashboard from "../src/screens/dashboard";
import BusinessAnalytics from "../src/screens/business_analytics";
import TeamManagement from "../src/screens/team_management";
import ProjectStatus from "../src/screens/project_status";
import DashboardGraphs from "../src/screens/dashboard_graphs";
import MinhaConta from "../src/screens/minha_conta";
// Academy page removed as requested
import Questionario from "../src/screens/questionario";
import QuestionarioSocial from "../src/screens/questionario/social";
import QuestionarioMeioAmbiente from "../src/screens/questionario/meio-ambiente";
import QuestionarioGovernanca from "../src/screens/questionario/governanca";
import PlanoAcao from "../src/screens/plano_acao";
import Relatorio from "../src/screens/relatorio";
import Config from "../src/screens/config";
import Sair from "../src/screens/sair";
import Chatbot from "../src/componentes/chatbot";
import { UserProvider } from "./context";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <UserProvider>
    <div className="app-background">
      <div className="app-content">
        <Router>
          {isAuthenticated && <Chatbot />}
          <Routes>
             <Route path="/cadastro" element={<Cadastro />} />
            <Route
              path="/"
              element={<Login setIsAuthenticated={setIsAuthenticated} />}
            />

            <Route
              path="/login"
              element={
                isAuthenticated ? (
                  <Navigate to="/dashboard" replace />
                ) : (
                  <Login setIsAuthenticated={setIsAuthenticated} />
                )
              }
            />

            <Route
              path="/dashboard"
              element={
                isAuthenticated ? <Dashboard /> : <Navigate to="/login" replace />
              }
            />

            <Route
              path="/business-analytics"
              element={
                isAuthenticated ? <BusinessAnalytics /> : <Navigate to="/login" replace />
              }
            />

            <Route
              path="/team-management"
              element={
                isAuthenticated ? <TeamManagement /> : <Navigate to="/login" replace />
              }
            />

            <Route
              path="/project-status"
              element={
                isAuthenticated ? <ProjectStatus /> : <Navigate to="/login" replace />
              }
            />
            
            <Route
              path="/dashboard-graphs"
              element={
                isAuthenticated ? <DashboardGraphs /> : <Navigate to="/login" replace />
              }
            />
            
            <Route
              path="/minha-conta"
              element={
                isAuthenticated ? <MinhaConta /> : <Navigate to="/login" replace />
              }
            />
            
            {/* Academy route removed and replaced with external link in dashboard navigation */}
            
            <Route
              path="/questionario"
              element={
                isAuthenticated ? <Questionario /> : <Navigate to="/login" replace />
              }
            />
            
            <Route
              path="/questionario/social"
              element={
                isAuthenticated ? <QuestionarioSocial /> : <Navigate to="/login" replace />
              }
            />
            
            <Route
              path="/questionario/meio-ambiente"
              element={
                isAuthenticated ? <QuestionarioMeioAmbiente /> : <Navigate to="/login" replace />
              }
            />
            
            <Route
              path="/questionario/governanca"
              element={
                isAuthenticated ? <QuestionarioGovernanca /> : <Navigate to="/login" replace />
              }
            />
            
            <Route
              path="/plano-acao"
              element={
                isAuthenticated ? <PlanoAcao /> : <Navigate to="/login" replace />
              }
            />
            
            <Route
              path="/relatorio"
              element={
                isAuthenticated ? <Relatorio /> : <Navigate to="/login" replace />
              }
            />
            
            <Route
              path="/config"
              element={
                isAuthenticated ? <Config /> : <Navigate to="/login" replace />
              }
            />
            
            <Route
              path="/sair"
              element={
                isAuthenticated ? <Sair /> : <Navigate to="/login" replace />
              }
            />
          </Routes>
        </Router>
      </div>
    </div>
  </UserProvider>
  );
}

export default App;
