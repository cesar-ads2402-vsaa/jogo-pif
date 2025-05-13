import React from 'react';
import './PaginaInformacoesUteis.css'; 

function PaginaInformacoesUteis() {
  return (
    <div className="pagina-informacoes-uteis">
      
      <section className="perguntas-frequentes">
        <h2>PERGUNTAS FREQUENTES</h2>
        <div className="pergunta-resposta">
          <h3>Nunca é possível tomar banho de mar na área de risco?</h3>
          <p>O banho de mar pode ocorrer nas regiões de piscinas, que são formadas na maré baixa e são encontradas, principalmente, na praia de Boa Viagem. Popularmente, é um banho seguro, procure as piscinas naturais formadas na maré baixa. Recomendamos o monitoramento da maré por aqui.</p>
        </div>
        <div className="pergunta-resposta">
          <h3>Em quais condições devemos evitar completamente o banho de mar?</h3>
          <p>Algumas circunstâncias são completamente desfavoráveis, se levarmos em conta a sua segurança. São elas: dias chuvosos, dias com água turva, na maré alta, em todos os trechos com a presença de arrecifes (mesmo na maré baixa, pois pode haver animais peçonhentos), em locais próximos à foz de rios, em áreas de formação de trombas d’água e nos horários finais da tarde, se você estiver com algum ferimento ou sangramento, se estiver consumindo bebida alcoólica, se estiver sozinho e se estiver usando objetos brilhantes. Em tais ocasiões e locais o risco de ataque de tubarão é maior, portanto, evite.</p>
        </div>
        <div className="pergunta-resposta">
          <h3>O perigo é o mesmo em todo o trecho da área de risco? Existem áreas proibidas?</h3>
          <p>Não. Embora o banho de mar em toda a área de risco, que vai da Praia do Farol em Olinda até a praia de Itapuama no Cabo de Santo Agostinho, seja desencorajado (com exceção das piscinas naturais formadas na maré baixa), existe uma área que tem concentrado, historicamente, mais ataques e por isso o banho está PROIBIDO por decreto municipal: trecho entre a Igreja de Boa Viagem e o Hotel Atlante Plaza, localizado ao lado do Hospital da Aeronáutica.</p>
        </div>
        <div className="pergunta-resposta">
          <h3>O que devo fazer em hipótese de ataque?</h3>
          <p>Apesar de tudo, tente ao máximo não entrar em pânico. Nade lentamente para longe dele, movimentando o mínimo de água. Afaste-se de frente e lentamente, sem bater braços e pernas. Grite para solicitar ajuda, principalmente dos salva-vidas que estão estrategicamente posicionados. Assim que possível, saia da água e procure os serviços de primeiros socorros.</p>
        </div>
      </section>
     
    </div>
  );
}

export default PaginaInformacoesUteis;