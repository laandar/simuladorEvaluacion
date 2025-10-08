import React from 'react';

const Incentivos = ({ 
  incentivos,
  handleIncentivosChange,
  totalIncentivos
}) => {
  return (
    <div className="formulario-section">
      <h2 className="section-title">COMPONENTE DE INCENTIVOS</h2>
      
      <div className="table-container">
        <table className="evaluation-table">
          <thead>
            <tr>
              <th className="parametro-col">PARÁMETRO</th>
              <th className="indicador-col">INDICADOR</th>
              <th className="datos-col">CANTIDAD</th>
              <th className="nota-col">PUNTUACIÓN</th>
              <th className="total-col">TOTAL</th>
            </tr>
          </thead>
          <tbody>
            {incentivos.map((item, index) => (
              <tr key={item.id} className={index % 2 === 0 ? 'even' : 'odd'}>
                {index === 0 && (
                  <td rowSpan={incentivos.length} className="parametro-cell">
                    INCENTIVOS
                  </td>
                )}
                <td className="indicador-cell">{item.indicador}</td>
                <td className="datos-cell">
                  <input
                    type="number"
                    value={item.cantidad}
                    onChange={(e) => handleIncentivosChange(item.id, 'cantidad', e.target.value)}
                    min="0"
                    step="1"
                  />
                </td>
                <td className="puntuacion-cell">
                  {item.puntuacion.toFixed(2)}
                </td>
                {index === 0 && (
                  <td rowSpan={incentivos.length} className="total-cell">
                    {totalIncentivos.toFixed(2)}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Incentivos;
