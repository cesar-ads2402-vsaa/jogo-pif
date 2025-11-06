import { useState, useEffect, useRef } from "react";
import { MessageSquare, Send, X, Minimize2, Maximize2 } from "lucide-react";
import chatbotResponses from "./chatbot-responses";
import "./chatbot.css";

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Inicializar o chatbot com uma mensagem de boas-vindas quando aberto pela primeira vez
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeResponses = chatbotResponses.welcome;
      const randomIndex = Math.floor(Math.random() * welcomeResponses.length);
      const welcomeMessage = welcomeResponses[randomIndex];
      
      setMessages([
        { text: welcomeMessage, sender: "bot" }
      ]);
    }
  }, [isOpen, messages.length]);

  // Rolar para a mensagem mais recente
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
    if (isCollapsed) {
      setIsCollapsed(false);
    }
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && inputValue.trim()) {
      sendMessage();
    }
  };

  const sendMessage = () => {
    if (!inputValue.trim()) return;

    // Função Adicionar mensagem do usuário
    const userMessage = { text: inputValue, sender: "user" };
    setMessages([...messages, userMessage]);
    setInputValue("");
    
    // Melhoria de Simular o bot digitando
    setIsTyping(true);
    
    // Caso de queda de conexão, Gerar resposta do bot após um pequeno atraso
    setTimeout(() => {
      const botResponse = generateResponse(inputValue);
      setMessages(prevMessages => [...prevMessages, { text: botResponse, sender: "bot" }]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000); // Atraso aleatório entre 1-2 segundos
  };

  const generateResponse = (userInput) => {
    const input = userInput.toLowerCase().trim();
    
    // Verificar saudações
    if (input === "oi" || input === "olá" || input === "ola") {
      return chatbotResponses.greetings.ola;
    }
    
    if (input.includes("bom dia")) {
      return chatbotResponses.greetings.bom_dia;
    }
    
    if (input.includes("boa tarde")) {
      return chatbotResponses.greetings.boa_tarde;
    }
    
    if (input.includes("boa noite")) {
      return chatbotResponses.greetings.boa_noite;
    }
    
    // Verificar agradecimentos
    if (input.includes("obrigado") || input.includes("obrigada") || input.includes("valeu")) {
      const thanksResponses = chatbotResponses.thanks;
      return thanksResponses[Math.floor(Math.random() * thanksResponses.length)];
    }
    
    // Verificar despedidas
    if (input.includes("tchau") || input.includes("até logo") || input.includes("adeus")) {
      const goodbyeResponses = chatbotResponses.goodbye;
      return goodbyeResponses[Math.floor(Math.random() * goodbyeResponses.length)];
    }
    
    // Verificar perguntas sobre funcionalidades
    if (input.includes("dashboard") || input.includes("página principal")) {
      return chatbotResponses.faqs.dashboard;
    }
    
    if (input.includes("academy") || input.includes("curso") || input.includes("treinamento")) {
      return chatbotResponses.faqs.academy;
    }
    
    if (input.includes("questionário") || input.includes("perguntas") || input.includes("avaliação")) {
      return chatbotResponses.faqs.questionario;
    }
    
    if (input.includes("plano") || input.includes("ação") || input.includes("plano de ação")) {
      return chatbotResponses.faqs.plano_acao;
    }
    
    if (input.includes("relatório") || input.includes("relatórios") || input.includes("report")) {
      return chatbotResponses.faqs.relatorio;
    }
    
    if (input.includes("config") || input.includes("configuração") || input.includes("configurações") || input.includes("ajustes")) {
      return chatbotResponses.faqs.config;
    }
    
    // Resposta padrão quando não entende a pergunta
    const fallbackResponses = chatbotResponses.fallback;
    return fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
  };

  if (!isOpen) {
    return (
      <div className="chatbot-button" onClick={toggleChatbot}>
        <MessageSquare size={24} />
      </div>
    );
  }

  return (
    <div className={`chatbot-container ${isCollapsed ? 'chatbot-collapsed' : ''}`}>
      <div className="chatbot-header" onClick={isCollapsed ? toggleChatbot : undefined}>
        <div className="chatbot-header-title">
          <MessageSquare size={20} />
          {!isCollapsed && <h3>Assistente ECOA</h3>}
        </div>
        <div>
          {!isCollapsed && (
            <button className="chatbot-toggle" onClick={toggleCollapse}>
              <Minimize2 size={18} />
            </button>
          )}
          {isCollapsed && (
            <button className="chatbot-toggle" onClick={toggleCollapse}>
              <Maximize2 size={18} />
            </button>
          )}
          {!isCollapsed && (
            <button className="chatbot-toggle" onClick={toggleChatbot}>
              <X size={18} />
            </button>
          )}
        </div>
      </div>
      
      {!isCollapsed && (
        <div className="chatbot-body">
          <div className="chatbot-messages">
            {messages.map((message, index) => (
              <div 
                key={index} 
                className={`message ${message.sender === 'bot' ? 'bot-message' : 'user-message'}`}
              >
                {message.text}
              </div>
            ))}
            
            {isTyping && (
              <div className="typing-indicator">
                <div className="typing-dot"></div>
                <div className="typing-dot"></div>
                <div className="typing-dot"></div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
          
          <div className="chatbot-input">
            <input
              type="text"
              placeholder="Digite sua mensagem..."
              value={inputValue}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              disabled={isTyping}
            />
            <button onClick={sendMessage} disabled={!inputValue.trim() || isTyping}>
              <Send size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Chatbot;
