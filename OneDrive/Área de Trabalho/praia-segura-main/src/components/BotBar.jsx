
import React, { useState } from 'react';
import './BotBar.css';
import ouvidoriaIcon from '../imgs/icon-ouvidoria.jpg'; 
import ouvidoriaIconEng from '../imgs/icon-ouvidoria-eng.PNG';
import { Link } from 'react-router-dom';
import { useLanguageContext } from './Context';

function BotBar() {
  const {data, setData}=useLanguageContext()

  const [dropdownVisible, setDropdownVisible] = useState(false);

  const handleMouseEnter = () => {
    setDropdownVisible(true);
  };

  const handleMouseLeave = () => {
    setDropdownVisible(false);
  };

  if(data.lang=="br"){
  return (
    <div id='botbar'>
      <span className='center-buttons'>
        <Link to="/" className='buttons'>INÍCIO</Link>
        <Link to="/AreaDeRisco" className='buttons'>ÁREA DE RISCO</Link>
        <Link to="/ClimaEMare" className='buttons'>CLIMA E MARÉ</Link>
        <div
          className="dropdown-container"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <span className="buttons dropdown-toggle">INFORMAÇÕES ÚTEIS</span>
          {dropdownVisible && (
            <ul className="dropdown-menu">
              <li><Link to="/Ecossistema">Ecossistema</Link></li>
              <li><Link to="/Tubaroes">Tubarões</Link></li>
              <li><Link to="/ComoCurtir">Como Curtir</Link></li>
              <li><Link to="/Ecoturismo">Ecoturismo</Link></li>
              <li><Link to="/EsportesLazer">Esportes e Lazer</Link></li>
              <li><Link to="/PergFreq">Peguntas frequentes</Link></li>
            
            </ul>
          )}
        </div>
        <Link to="/Emergencia" className='buttons'>EMERGÊNCIA</Link>
      </span>
      <Link to="/ouvidoria" className='ouvidoria-button'>
        <img src={ouvidoriaIcon} alt="Ouvidoria" className="ouvidoria-image" />
      </Link>
    </div>
  );}

  if(data.lang=="us"){
    return (
      <div id='botbar'>
        <span className='center-buttons'>
          <Link to="/" className='buttons'>HOME</Link>
          <Link to="/AreaDeRisco" className='buttons'>DANGER ZONES</Link>
          <Link to="/ClimaEMare" className='buttons'>WEATHER AND TIDE</Link>
          <div
            className="dropdown-container"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <span className="buttons dropdown-toggle">USEFUL INFORMATION</span>
            {dropdownVisible && (
              <ul className="dropdown-menu">
                <li><Link to="/Ecossistema">Ecosystem</Link></li>
                <li><Link to="/Tubaroes">Sharks</Link></li>
                <li><Link to="/ComoCurtir">How To Enjoy</Link></li>
                <li><Link to="/Ecoturismo">Ecoturism</Link></li>
                <li><Link to="/EsportesLazer">Sports And Leisure</Link></li>
                <li><Link to="/PergFreq">FAQ</Link></li>
              
              </ul>
            )}
          </div>
          <Link to="/Emergencia" className='buttons'>DISTRESS CALL</Link>
        </span>
        <Link to="/ouvidoria" className='ouvidoria-button'>
          <img src={ouvidoriaIconEng} alt="Contact Us" className="ouvidoria-image" />
        </Link>
      </div>
    );}
  
}

export default BotBar;