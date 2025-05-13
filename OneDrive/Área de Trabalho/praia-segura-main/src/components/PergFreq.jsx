import React from 'react';
import './PergFreq.css'; 
import { useLanguageContext } from './Context';

const PergFreq = () => {
  const{data, setData} = useLanguageContext();
  
  if(data.lang=="br"){
  return (
    <div className="perguntas-frequentes-container">
      <h1 >Perguntas Frequentes</h1>

      <div className="pergunta">
        <h2>Nunca é possível tomar banho de mar na área de risco?</h2>
        <p>
          O banho de mar pode ocorrer nas regiões de piscinas, que são formadas na maré baixa e são encontradas,
          principalmente, na praia de Boa Viagem. A condição necessária é a formação de piscinas na maré baixa, não o
          simples fato de estar em maré baixa. Portanto, para um banho seguro, procure as piscinas naturais formadas na
          maré baixa. Recomendamos o monitoramento da maré por aqui.
        </p>
      </div>

      <div className="pergunta">
        <h2>Em quais condições devo evitar completamente o banho de mar?</h2>
        <p>
          Algumas circunstâncias são completamente desfavoráveis, se levarmos em conta a sua segurança. São elas: dias
          chuvosos, dias com água mais turva, na maré alta, em todos os locais sem a presença de arrecifes (mesmo na maré
          baixa, pois não são formadas piscinas), em locais próximos ao encontro com rios, nos primeiros horários da manhã
          e nos horários finais da tarde, se você estiver com algum ferimento ou sangramento, se estiver consumindo bebida
          alcoólica, se estiver sozinho e se estiver usando objetos brilhantes. Em tais ocasiões e locais o risco de ataque
          de tubarão aumenta significativamente.
        </p>
      </div>

      <div className="pergunta">
        <h2>O perigo é o mesmo em todo o trecho de risco? Existem áreas proibidas?</h2>
        <p>
          Não. Embora o banho de mar em toda a área de risco, que vai da praia do Farol em Olinda até praia de Itapuama no
          Cabo de Santo Agostinho, seja desencorajado (com exceção das piscinas naturais formadas na maré baixa), existe
          uma área que tem concentrado, historicamente, mais ataques e por isso o banho está PROIBIDO por decreto
          municipal: o trecho entre a Igrejinha de Piedade e o Hotel Barramares, localizado ao lado do Hospital da Aeronáutica.
        </p>
      </div>

      <div className="pergunta">
        <h2>O que devo fazer na hipótese de ataque?</h2>
        <p>
          Apesar de tudo, tente ao máximo não entrar em pânico. Nade lentamente para longe dele, movimentando o mínimo
          de água. Afaste-se de frente e lentamente, sem bater braços e pernas. Grite para solicitar ajuda, principalmente dos
          salva-vidas que estão estrategicamente posicionados. Assim que possível, saia da água e procure os serviços de
          primeiros socorros.
        </p>
      </div>
    </div>
  );}
  
  if(data.lang=="us"){
    return (
      <div className="perguntas-frequentes-container">
        <h1 >FREQUENTLY ASKED QUESTIONS</h1>
  
        <div className="pergunta">
          <h2>Is it never possible to swim in the sea in the risk area?</h2>
          <p>
          Swimming in the sea can occur in the pool regions, which are formed at low tide and are mainly found at Boa Viagem beach. 
          The formation of pools at low tide is required, not only the tide being low. Therefore, for a safe swim, look for the natural pools formed at low tide.
          We recommend monitoring the tide on this website.
          </p>
        </div>
  
        <div className="pergunta">
          <h2>When should I completely avoid swimming in the sea?</h2>
          <p>
          Placing your safety first, some circumstances are entirely unfavorable , such as: rainy days, days with murkier water, high tide, all locations without reefs 
          (even at low tide, as pools are not formed), areas near river mouths, early morning hours, late afternoon hours, if you have any injuries or bleeding, 
          if you are under the influence of alcohol, alone, or wearing shiny objects. In such situations and locations, the risk of a shark attack significantly increases.

          </p>
        </div>
  
        <div className="pergunta">
          <h2>Is it equally dangerous throughout the entire risk area? Are there prohibited areas?</h2>
          <p>
          No. Although swimming in the sea throughout the entire risk area, which stretches from Farol beach in Olinda to Itapuama beach in Cabo de Santo Agostinho, 
          is discouraged (except in the natural pools formed at low tide), there is one area that consistently does have more attacks and, therefore, swimming is PROHIBITED 
          by municipal decree: the stretch between Igrejinha de Piedade and Hotel Barramares, located next to the Air Force Hospital.
          </p>
        </div>
  
        <div className="pergunta">
          <h2>What should I do in the event of a shark attack?</h2>
          <p>
          Despite everything, try your best not to panic. Swim slowly away from it, moving the water as little as possible. 
          Move slowly away, facing it and without thrashing your arms and legs. Shout for help, especially for the lifeguards who are strategically positioned. 
          As soon as possible, get out of the water and seek first aid services.
          </p>
        </div>
      </div>
    );}
};

export default PergFreq;