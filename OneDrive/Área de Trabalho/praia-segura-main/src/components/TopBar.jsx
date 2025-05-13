import './TopBar.css';
import React from 'react';
import { Link } from 'react-router-dom';
import {useLanguageContext}  from './Context';
import gov from '../imgs/govpe.png';
import logo from '../imgs/pslogo.png';
import brasil from '../imgs/brasil.png';
import eua from '../imgs/eua.png';

const TopBar = () => {
  const{data, setData} = useLanguageContext();
  
  const langBR = () =>{
    setData({...data, lang:"br"})
    console.log('brazilian');
  }

  const langUS = () => {
    setData({...data, lang:"us"})
    console.log('united states');
  }
  return (
    <div id="topbar">
      <img src={gov} className="topimg" id="gov" alt="Governo de PE" />
      
      <div id="logo-container">
        <Link to="/">
            <img src={logo} className="topimg" id="logo" alt="Praia Segura" />
        </Link>
      </div>

      <span className="langs">
        <img src={brasil} className="topimg" alt="Português" onClick={langBR}/>
        <img src={eua} className="topimg" alt="Inglês" onClick={langUS}/>
      </span>
    </div>
  );
};

export default TopBar;