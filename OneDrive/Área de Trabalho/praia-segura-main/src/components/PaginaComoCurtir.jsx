import React from 'react';
import InfoUtil from '../components/InfoUtil';
import ComoCurtirImagem from '../imgs/ComoCurtir.jpeg'; 
import './PaginaComoCurtir.css'; 

function PaginaComoCurtir() {
  

  return (
    <div className="pagina-como-curtir">
      <h1>Como Curtir</h1>
      <div className='conteudo'>
      <img src={ComoCurtirImagem} alt="Praia com pessoas" id='imagem'/>
      <p className="texto">Algumas condutas devem ser adotadas para que você aproveite com segurança e responsabilidade as praias da RMR:<br /><br />

      Não entre no mar em áreas PROIBIDAS;<br /><br />

      Nas ÁREAS DE RISCO apenas tome banho nas formações de piscinas naturais (maré baixa);<br /><br />

      Não manuseie animais e/ou algas e corais;<br /><br />

      Não descarte lixos e dejetos na areia ou na água. Faça-o nos locais adequados;<br /><br />

      Respeite as orientações dos salva-vidas que estão estrategicamente posicionados. Eles zelam pelo seu bem.<br /><br />

      O descumprimento das normas pode acarretar em penalidades.
      </p>
      </div>
    </div>
  );
}

export default PaginaComoCurtir;