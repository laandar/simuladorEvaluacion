import React from 'react';

const Normativa = ({ linkNormativa }) => {
  const handleOpenNormativa = () => {
    window.open(linkNormativa, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="normativa-container">
      <div className="normativa-content-compact">
        <div className="normativa-header-compact">
          <span className="normativa-icon-compact">📚</span>
          <h3>Normativa y Efectos de la Evaluación Anual</h3>
        </div>
        
        <p className="normativa-text">
          CONSULTA LA NORMATIVA DEL REGLAMENTO DE CARRERA SOBRE LA EVALUACIÓN ANUAL DE 
          DESEMPEÑO Y GESTIÓN POR COMPETENCIAS.
        </p>

        <button 
          className="normativa-button-compact"
          onClick={handleOpenNormativa}
        >
          🔗 Ver Normativa  →
        </button>
      </div>
    </div>
  );
};

export default Normativa;

