import React from 'react';
import './PaginaInicial.css'; 
import background from '../imgs/background-inicio.png'
import {useLanguageContext}  from './Context';

function PaginaInicial() {
  const{data, setData} = useLanguageContext();
  
  if(data.lang=="br"){
  return (
    <div className="paginainicial-container" style={{ backgroundImage: `url(${background})` }}>
        <h1 className='branco'>BEM VINDO À TERRA DOS ALTOS COQUEIROS</h1>
    </div>
  );}
  if(data.lang=="us"){
    return (
      <div className="paginainicial-container" style={{ backgroundImage: `url(${background})` }}>
          <h1 className='branco'>WELCOME TO THE LAND OF TALL PALMS</h1>
      </div>
  );}
}

export default PaginaInicial;