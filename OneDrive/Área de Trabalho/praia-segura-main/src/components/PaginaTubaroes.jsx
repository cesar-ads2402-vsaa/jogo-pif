import React from 'react';
import './PaginaTubaroes.css';
import tubaraoImagem from '../imgs/tubarao.jpeg';
import { useLanguageContext } from './Context';

function PaginaTubaroes() {
  const {data, setData} = useLanguageContext()
  let tituloTubaroes = ""
  let textoTubaroesComQuebraLinha =""
  let altText = ""
  let saibamais = ""

  if(data.lang=="br"){
    tituloTubaroes = 'Tubarões';
    textoTubaroesComQuebraLinha = `Segundo o Comitê Estadual de Monitoramento de Incidentes com Tubarões (Cemit), foram registrados 77 ocorrências de ataque de tubarão no estado de Pernambuco desde 1992, das quais 67 ocorreram no Recife e outras 10 no Arquipélago de Fernando de Noronha. O fluxo de embarcações em razão do porto de Suape, a presença de um canal marinho profundo e dos arrecifes são alguns dos fatores que contribuem para os animais na região. Dentre as espécies presentes podemos citar o tubarão lixa (Ginglymostoma cirratum), cabeça-chata (Carcharhinus leucas) e tubarão tigre (Galeocerdo cuvier).<br /><br />Diante desse cenário, diversas medidas de segurança e monitoramento foram implementadas ao longo dos anos. O Comitê Estadual de Monitoramento de Incidentes com Tubarões (CEMIT) desempenha um papel crucial na coleta de dados, pesquisa, sinalização de áreas de risco e na implementação de ações preventivas.`;
    altText = "Tubarões";
    saibamais = "Saiba mais";
  }

  if(data.lang=="us"){
    tituloTubaroes = 'Sharks';
    textoTubaroesComQuebraLinha = `According to the State Committee for Monitoring Shark Incident Cases (Cemit), 77 shark attack incidents have been recorded in the state of Pernambuco since 1992, of which 67 occurred on the mainland and another 10 in the Fernando de Noronha Archipelago. The flow of vessels due to the Suape port, the presence of a deep marine channel, and the reefs are some of the factors contributing to the presence of these animals in the region. Among the most common species, we can mention the nurse shark (Ginglymostoma cirratum), the bull shark (Carcharhinus leucas), and the tiger shark (Galeocerdo cuvier).
    <br /><br />Given this scenario, several safety and monitoring measures have been implemented over the years. The State Committee for Monitoring Shark Incidents (CEMIT) plays a crucial role in data collection, research, signaling risk areas, and implementing preventive actions.`;
    altText = "Sharks"
    saibamais = "Learn more";
  }

  return (
    <div className="pagina-tubaroes">
      <h1>{tituloTubaroes}</h1>
      <div className="secao-tubaroes">
        <div className="imagem-e-texto">
          <img src={tubaraoImagem} alt={altText} />
          <div className="texto-e-botao">
            <p dangerouslySetInnerHTML={{ __html: textoTubaroesComQuebraLinha }}></p>
            <a
              href="https://semas.pe.gov.br/cemit/"
              target="_blank"
              rel="noopener noreferrer"
              className="botao-abaixo-texto"
            >
              {saibamais}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaginaTubaroes;
