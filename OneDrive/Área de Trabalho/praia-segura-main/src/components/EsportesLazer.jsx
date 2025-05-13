import React from 'react';
import InfoUtil from '../components/InfoUtil'; 
import lazerImagem from '../imgs/esportelazer.jpg'; 
import './EsportesLazer.css'; 

function EsportesLazer() {
  
  return (
    <div className="pagina-esportes-lazer">
      <h1>Esportes e Lazer</h1>
      <div className='conteudo'>
      <img src={lazerImagem} alt="Pessoas jogando vôlei de praia" id='imagem'/>
      <p className='texto'>A prática de surf é proibida na Região Metropolitana do Recife há mais de trinta anos, por razões de segurança. 
        Entretanto, muitas outras práticas esportivas podem ser desenvolvidas nas regiões de praia, como vôlei de praia, futevôlei, funcional e corridas. 
        A dica é aproveitar as inúmeras redes que estão dispostas (principalmente no Recife e Jaboatão dos Guararapes) e curtir uma boa partida. 
        A utilização dos espaços é gratuita e aberta a todo o público.
      </p>
      </div>
    </div>
  );
}

export default EsportesLazer;