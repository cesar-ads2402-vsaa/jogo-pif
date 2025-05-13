import React from 'react';
import './InfoUtil.css'; 

function InfoUtil({ titulo, imagemSrc, texto }) {
  return (
    <div className="info-util-container">
      <h2>{titulo}</h2>
      {imagemSrc && (
        <img src={imagemSrc} alt={titulo} className="info-util-image" />
      )}
      <p className="info-util-texto" >{texto}</p>
    </div>
  );
}

export default InfoUtil;