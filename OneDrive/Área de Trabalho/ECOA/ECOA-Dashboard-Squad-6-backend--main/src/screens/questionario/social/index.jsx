import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Check, HelpCircle } from "lucide-react";
import '../questionario.css';
import './social.css';

function QuestionarioSocial() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  
  const questions = [
    {
      id: 1,
      type: "multiple",
      question: "A empresa possui políticas de direitos humanos que mitigam os riscos para o negócio e estão em conformidade com os Princípios Orientadores da ONU sobre Empresas e Direitos Humanos?",
      options: [
        "SIM",
        "NÃO"
      ]
    },
    {
      id: 2,
      type: "multiple",
      question: "A empresa possui um programa de diversidade e inclusão com metas específicas?",
      options: [
        "SIM",
        "NÃO"
      ]
    },
    {
      id: 3,
      type: "multiple",
      question: "A empresa realiza avaliações de impacto social em suas operações e cadeia de fornecimento?",
      options: [
        "SIM",
        "NÃO"
      ]
    }
  ];

  const handleAnswerChange = (questionId, answer) => {
    setAnswers({
      ...answers,
      [questionId]: answer
    });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = () => {
    alert("Questionário Social enviado com sucesso!");
    // Aqui você poderia enviar as respostas para um servidor
    console.log(answers);
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const currentQuestionData = questions[currentQuestion];

  return (
    <div className="dashboard-background">
      <div className="questionario-container">
        <div className="questionario-header">
          <h1>Social</h1>
          <p>Avaliação de práticas sociais e direitos humanos</p>
        </div>

        <div className="questionario-content">
          <div className="progress-bar-container">
            <div className="progress-bar" style={{ width: `${progress}%` }}></div>
          </div>
          
          <p className="question-counter">{currentQuestion + 1}/{questions.length}</p>

          <div className="questionario-form">
            <div className="question-card social-question">
              <h3 className="question-title">{currentQuestionData.question}</h3>
              
              {currentQuestionData.type === "multiple" && (
                <div className="question-options social-options">
                  {currentQuestionData.options.map((option, index) => (
                    <div className="option-item" key={index}>
                      <input 
                        type="radio" 
                        id={`option-${index}`} 
                        name={`question-${currentQuestionData.id}`}
                        checked={answers[currentQuestionData.id] === option}
                        onChange={() => handleAnswerChange(currentQuestionData.id, option)}
                      />
                      <label htmlFor={`option-${index}`}>{option}</label>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="navigation-buttons">
              <button 
                className="nav-button back-button"
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
              >
                <ArrowLeft size={16} /> Anterior
              </button>
              
              {currentQuestion < questions.length - 1 ? (
                <button 
                  className="nav-button next-button"
                  onClick={handleNext}
                >
                  Próxima <ArrowRight size={16} />
                </button>
              ) : (
                <button 
                  className="nav-button submit-button"
                  onClick={handleSubmit}
                >
                  Continuar <ArrowRight size={16} />
                </button>
              )}
            </div>
          </div>

          <Link to="/questionario" className="back-link">
            <ArrowLeft size={16} /> Voltar para o Questionário
          </Link>
        </div>
      </div>
    </div>
  );
}

export default QuestionarioSocial;
