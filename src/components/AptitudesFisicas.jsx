import React from 'react';

const AptitudesFisicas = ({ 
  aptitudesFisicas,
  handleAptitudesFisicasChange,
  totalAptitudesFisicas,
  opcionesEvaluacion
}) => {
  return (
    <div className="formulario-section">
      <h2 className="section-title">COMPONENTE DE APTITUDES FÍSICAS Y PERSONALES</h2>
      
      <div className="table-container">
        <table className="evaluation-table">
          <thead>
            <tr>
              <th className="parametro-col">PARÁMETRO</th>
              <th className="indicador-col">INDICADOR</th>
              <th className="datos-col">EVALUACIÓN</th>
              <th className="nota-col">PUNTUACIÓN</th>
              <th className="total-col">NOTA</th>
            </tr>
          </thead>
          <tbody>
            {aptitudesFisicas.map((item, index) => (
              <tr key={item.id} className={index % 2 === 0 ? 'even' : 'odd'}>
                {index === 0 && (
                  <td rowSpan={10} className="parametro-cell">
                    EVALUACIÓN DE COMPETENCIAS
                  </td>
                )}
                {index === 10 && (
                  <td rowSpan={1} className="parametro-cell">
                    EVALUACIÓN FISICA
                  </td>
                )}
                <td className="indicador-cell">{item.indicador}</td>
                {item.seccion === 'EVALUACIÓN DE COMPETENCIAS' ? (
                  <>
                    <td className="datos-cell">
                      <select
                        value={item.evaluacion}
                        onChange={(e) => handleAptitudesFisicasChange(item.id, 'evaluacion', e.target.value)}
                        className="evaluacion-select"
                      >
                        {opcionesEvaluacion.map(opcion => (
                          <option key={opcion.valor} value={opcion.valor}>
                            {opcion.valor}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="puntuacion-cell">
                      {item.puntuacion.toFixed(2)}
                    </td>
                  </>
                ) : (
                  <td className="datos-cell combined-cell" colSpan="2">
                    <input
                      type="number"
                      value={item.evaluacion}
                      onChange={(e) => handleAptitudesFisicasChange(item.id, 'evaluacion', e.target.value)}
                      min="0"
                      step="0.01"
                      placeholder="Evaluación"
                      className="single-input"
                    />
                  </td>
                )}
                {index === 0 && (
                  <td rowSpan={10} className="total-cell">
                    {aptitudesFisicas.filter(item => item.seccion === 'EVALUACIÓN DE COMPETENCIAS').reduce((sum, item) => sum + item.puntuacion, 0).toFixed(2)}
                  </td>
                )}
                {index === 10 && (
                  <td rowSpan={1} className="total-cell">
                    {item.puntuacion.toFixed(2)}
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

export default AptitudesFisicas;
