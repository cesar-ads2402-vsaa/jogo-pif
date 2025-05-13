import React from 'react';
import './Ecossistema.css'; 
import coraisImagem from '../imgs/corais.JPG';
import tartarugaImagem from '../imgs/tartatuga.JPG';

function Ecossistema() {
  const tituloEcossistema = 'Ecossistema';
  
  const textoCorais = `Os recifes de corais na costa do Recife são formações naturais de grande beleza e importância ecológica. Eles atuam como barreiras naturais que reduzem a força das ondas, ajudando a proteger o litoral da erosão. Além disso, abrigam uma rica biodiversidade marinha, servindo de refúgio e alimentação para diversas espécies de peixes, crustáceos e outros organismos. Por tais motivos sua preservação é essencial.`;

  const textoTartarugas = `A região costeira da RMR abriga uma grande variedade de espécies marinhas, graças aos seus recifes, mangues e estuários. Dentre elas estão as tartarugas marinhas, que usam as praias da região para desova, especialmente entre os meses de setembro e março. Espécies como a tartaruga-de-pente e a tartaruga-verde são frequentemente vistas. Além das tartarugas, é possível encontrar cardumes de peixes coloridos, cavalos-marinhos, ouriços e estrelas-do-mar.`;

  return (
    <div className="pagina-ecossistema">
      <h1>{tituloEcossistema}</h1>

      <span className='centralize'>
      <div className="secao">
        <img src={coraisImagem} alt="Recife de Corais" />
        <p>{textoCorais}</p>
      </div>

      <div className="secao secao2">
        <img src={tartarugaImagem} alt="Tartaruga na Praia" />
        <p>{textoTartarugas}</p>
      </div>
      </span>
    </div>
  );
}

export default Ecossistema;
