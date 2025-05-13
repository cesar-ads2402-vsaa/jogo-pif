import React from 'react';
import InfoUtil from '../components/InfoUtil';
import EcoturismoImagem from '../imgs/ecoturismo.jpg'; 
import './PaginaEcoturismo.css'; 

function PaginaEcoturismo() {
  return (
    <div className="pagina-ecoturismo">
      <h1>Ecoturismo</h1>
      <div className='conteudo'><img src={EcoturismoImagem} alt="Naufrágio" id='imagem'/>
      <span className='texto'><p>Recife é considerada a capital dos naufrágios no Brasil, devido à grande quantidade de navios naufragados e à intensa atividade de mergulho desenvolvida. Os mergulhos são desenvolvidos de forma sustentável. Existem naufrágios que também podem ser explorados na costa de Porto de Galinhas.</p>
      <p>Vejamos a lista de algumas atrações disponíveis:</p>
      <ul>
      <li>SERVERMAR I</li>
      <li>PIRAPAMA</li>
      <li>FLORIDA</li>
      <li>ALVARENGA</li>
      <li>DENTRE OUTROS!</li>
      </ul>
      <p><strong>Atenção:</strong> Somente realize tais atividades por meio de empresas habilitadas e cadastradas.</p>
      </span>
      </div>
      </div>
  );
}

export default PaginaEcoturismo;