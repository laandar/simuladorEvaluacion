import React from 'react';

const ResultadosGestion = ({ 
  indicadores, 
  handleDatosChange, 
  total,
  rendimientoIndividual,
  handleEvaluacionChange,
  totalRendimiento,
  gestionColectiva,
  handleGestionColectivaChange,
  totalGestionColectiva,
  opcionesEvaluacion
}) => {
  return (
    <div className="formulario-section">
      <h2 className="section-title">COMPONENTE DE RESULTADOS DE SU GESTIÓN</h2>
      
      {/* Responsabilidad Profesional */}
      <div className="subsection">
        <h3 className="subsection-title">Responsabilidad Profesional y Personal / Código de Ética</h3>
        <div className="table-container">
          <table className="evaluation-table">
            <thead>
              <tr>
                <th className="parametro-col">PARÁMETRO</th>
                <th className="indicador-col">INDICADOR</th>
                <th className="datos-col">DATOS</th>
                <th className="nota-col">NOTA</th>
                <th className="total-col">TOTAL</th>
              </tr>
            </thead>
            <tbody>
              {indicadores.map((indicador, index) => (
                <tr key={indicador.id} className={index % 2 === 0 ? 'even' : 'odd'}>
                  {index === 0 && (
                    <td rowSpan={indicadores.length} className="parametro-cell">
                      RESPONSABILIDAD PROFESIONAL Y PERSONAL / CÓDIGO DE ÉTICA
                    </td>
                  )}
                  <td className="indicador-cell">{indicador.nombre}</td>
                  <td className="datos-cell">
                    <input
                      type="number"
                      value={indicador.datos || ''}
                      onChange={(e) => handleDatosChange(indicador.id, e.target.value)}
                      min="0"
                    />
                  </td>
                  <td className="nota-cell">{indicador.nota.toFixed(2)}</td>
                  {index === 0 && (
                    <td rowSpan={indicadores.length} className="total-cell">
                      {total.toFixed(2)}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Rendimiento Individual */}
      <div className="subsection">
        <h3 className="subsection-title">Rendimiento Individual</h3>
        <div className="table-container">
          <table className="evaluation-table rendimiento-table">
            <thead>
              <tr>
                <th className="parametro-col">PARÁMETRO</th>
                <th className="criterio-col">CRITERIO</th>
                <th className="semestre-col" colSpan="2">SEGUNDO SEMESTRE</th>
                <th className="total-col" rowSpan="2">TOTAL</th>
              </tr>
            </thead>
            <tbody>
              {rendimientoIndividual.map((item, index) => (
                <tr key={item.id} className={index % 2 === 0 ? 'even' : 'odd'}>
                  {index === 0 && (
                    <td rowSpan={rendimientoIndividual.length} className="parametro-cell">
                      RENDIMIENTO INDIVIDUAL
                    </td>
                  )}
                  <td className="criterio-cell">{item.criterio}</td>
                  <td className="evaluacion-cell">
                    <select
                      value={item.evaluacion}
                      onChange={(e) => handleEvaluacionChange(item.id, e.target.value)}
                      className="evaluacion-select"
                    >
                      <option value="">Seleccione una opción</option>
                      {opcionesEvaluacion.map(opcion => (
                        <option key={opcion.valor} value={opcion.valor}>
                          {opcion.valor}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="puntuacion-cell">{item.puntuacion.toFixed(2)}</td>
                  {index === 0 && (
                    <td rowSpan={rendimientoIndividual.length} className="total-cell">
                      {totalRendimiento.toFixed(2)}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Gestión Colectiva */}
      <div className="subsection">
        <h3 className="subsection-title">Gestión Colectiva</h3>
        <div className="table-container">
          <table className="evaluation-table">
            <thead>
              <tr>
                <th className="parametro-col">PARÁMETRO</th>
                <th className="indicador-col">INDICADOR</th>
                <th className="datos-col">DATOS</th>
                <th className="nota-col">NOTA</th>
                <th className="total-col">TOTAL</th>
              </tr>
            </thead>
            <tbody>
              {gestionColectiva.map((item, index) => (
                <tr key={item.id} className={index % 2 === 0 ? 'even' : 'odd'}>
                  {index === 0 && (
                    <td rowSpan={gestionColectiva.length} className="parametro-cell">
                      GESTIÓN COLECTIVA
                    </td>
                  )}
                  <td className="indicador-cell">{item.indicador}</td>
                  <td className="datos-cell">
                    <input
                      type="number"
                      value={item.datos || ''}
                      onChange={(e) => handleGestionColectivaChange(item.id, 'datos', e.target.value)}
                      min="0"
                      step="0.01"
                    />
                  </td>
                  <td className="nota-cell">
                    {item.nota.toFixed(2)}
                  </td>
                  {index === 0 && (
                    <td rowSpan={gestionColectiva.length} className="total-cell">
                      {totalGestionColectiva.toFixed(2)}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ResultadosGestion;
