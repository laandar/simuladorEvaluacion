import React from 'react';

const FormacionProfesional = ({ 
  formacionProfesional,
  handleFormacionProfesionalChange,
  totalFormacionProfesional
}) => {
  return (
    <div className="formulario-section">
      <h2 className="section-title">COMPONENTE DE CALIDAD DE SU FORMACIÓN PROFESIONAL E INTELECTUAL</h2>
      
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
            {formacionProfesional.map((item, index) => (
              <tr key={item.id} className={index % 2 === 0 ? 'even' : 'odd'}>
                {index === 0 && (
                  <td rowSpan={formacionProfesional.length} className="parametro-cell">
                    FORMACIÓN PROFESIONAL E INTELECTUAL
                  </td>
                )}
                <td className="indicador-cell">{item.indicador}</td>
                <td className="datos-cell">
                  <input
                    type="number"
                    value={item.datos}
                    onChange={(e) => handleFormacionProfesionalChange(item.id, 'datos', e.target.value)}
                    min="0"
                    step="0.01"
                  />
                </td>
                <td className="nota-cell">
                  {item.nota.toFixed(2)}
                </td>
                {index === 0 && (
                  <td rowSpan={formacionProfesional.length} className="total-cell">
                    {totalFormacionProfesional.toFixed(2)}
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

export default FormacionProfesional;
