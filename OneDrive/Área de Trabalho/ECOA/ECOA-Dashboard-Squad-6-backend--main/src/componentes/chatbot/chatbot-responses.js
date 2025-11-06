// Arquivo de respostas do chatbot - facilmente editável
// Cada resposta pode ser modificada sem alterar a lógica do componente

const chatbotResponses = {
  // Respostas de boas-vindas
  welcome: [
    "Olá! Sou o assistente virtual do ECOA. Como posso ajudar você hoje?",
    "Bem-vindo ao ECOA! Estou aqui para responder suas dúvidas. Em que posso ajudar?",
    "Olá! Sou o chatbot do ECOA. Estou aqui para auxiliar você. O que deseja saber?"
  ],
  
  // Respostas para quando o bot não entende a pergunta
  fallback: [
    "Desculpe, não entendi sua pergunta. Pode reformular?",
    "Não consegui compreender. Poderia explicar de outra forma?",
    "Hmm, não tenho certeza do que você está perguntando. Pode tentar novamente?"
  ],
  
  // Respostas para perguntas comuns
  faqs: {
    dashboard: "O Dashboard é a página principal do sistema, onde você pode visualizar todas as informações importantes e acessar as diferentes funcionalidades.",
    
    academy: "Na seção Academy você encontra cursos e treinamentos disponíveis para aprimorar suas habilidades e conhecimentos.",
    
    questionario: "O Questionário permite que você responda perguntas para avaliar diferentes aspectos do seu trabalho e da sua equipe.",
    
    plano_acao: "No Plano de Ação você pode criar, visualizar e gerenciar ações específicas para atingir objetivos e resolver problemas identificados.",
    
    relatorio: "A seção de Relatórios permite gerar e visualizar relatórios detalhados sobre diferentes métricas e indicadores.",
    
    config: "Nas Configurações você pode personalizar sua experiência no sistema, ajustando preferências e definições de conta."
  },
  
  // Respostas para saudações
  greetings: {
    ola: "Olá! Como posso ajudar você hoje?",
    oi: "Oi! Em que posso ser útil?",
    bom_dia: "Bom dia! Como posso ajudar?",
    boa_tarde: "Boa tarde! Precisa de alguma informação?",
    boa_noite: "Boa noite! Em que posso ajudar?"
  },
  
  // Respostas para agradecimentos
  thanks: [
    "De nada! Estou aqui para ajudar.",
    "Disponha! Se precisar de mais alguma coisa, é só perguntar.",
    "Por nada! Fico feliz em poder ajudar."
  ],
  
  // Respostas para despedidas
  goodbye: [
    "Até logo! Tenha um ótimo dia!",
    "Até mais! Estou aqui se precisar de algo.",
    "Tchau! Volte quando quiser."
  ]
};

export default chatbotResponses;
