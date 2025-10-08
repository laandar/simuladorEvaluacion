import React, { useState } from 'react';

const Resumen = ({ 
  total,
  totalRendimiento,
  totalGestionColectiva,
  totalFormacionProfesional,
  totalNormasDisciplinarias,
  totalAptitudesFisicas,
  totalIncentivos,
  aptitudesFisicas
}) => {
  const [mostrarResumen, setMostrarResumen] = useState(false);
  
  const totalResultadosGestion = total + totalRendimiento + totalGestionColectiva;
  const totalGeneral = totalResultadosGestion + totalFormacionProfesional + totalNormasDisciplinarias + totalAptitudesFisicas + totalIncentivos;
  const notaFinal = (totalGeneral * 0.2).toFixed(2); // 20% del total general

  const handleSimular = () => {
    setMostrarResumen(true);
  };

  return (
    <div className="executive-report">
      <div className="report-content">
        {!mostrarResumen ? (
          <div className="simulation-panel">
            <div className="simulation-content">
              <h2>🎯 Simulador de Evaluación Policial</h2>
              <p>Has completado todos los formularios de evaluación. Presiona el botón "Simular" para generar tu reporte de evaluación final.</p>
              <button 
                className="simulate-button"
                onClick={handleSimular}
              >
                📊 Simular Evaluación
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="simulation-header">
              <h2>📋 Reporte de Evaluación Generado</h2>
              <button 
                className="reset-button"
                onClick={() => setMostrarResumen(false)}
              >
                🔄 Nueva Simulación
              </button>
            </div>
            <div className="executive-summary">
          <h3>📊 RESUMEN EJECUTIVO</h3>
          <div className="summary-grid">
            <div className="summary-card primary">
              <div className="card-icon">🎯</div>
              <div className="card-content">
                <h4>Total General</h4>
                <div className="card-value">{totalGeneral.toFixed(2)}</div>
                <p>Puntos Obtenidos</p>
              </div>
            </div>
            <div className="summary-card success">
              <div className="card-icon">⭐</div>
              <div className="card-content">
                <h4>Nota Final</h4>
                <div className="card-value">{notaFinal}</div>
                <p>Calificación Final</p>
              </div>
            </div>
            <div className="summary-card info">
              <div className="card-icon">📈</div>
              <div className="card-content">
                <h4>Rendimiento</h4>
                <div className="card-value">{((totalGeneral / 100) * 100).toFixed(1)}%</div>
                <p>Porcentaje de Cumplimiento</p>
              </div>
            </div>
          </div>
        </div>

        <div className="components-analysis">
          <h3>🔍 ANÁLISIS POR COMPONENTES</h3>
          <div className="components-grid">
            <div className="component-section">
              <div className="section-header">
                <div className="section-icon">👮‍♂️</div>
                <div className="section-info">
                  <h4>Resultados de Gestión</h4>
                  <p>Evaluación del desempeño operativo</p>
                </div>
                <div className="section-score">{totalResultadosGestion.toFixed(2)}</div>
              </div>
              <div className="section-breakdown">
                <div className="breakdown-item">
                  <span>Responsabilidad Profesional</span>
                  <span>{total.toFixed(2)}</span>
                </div>
                <div className="breakdown-item">
                  <span>Rendimiento Individual</span>
                  <span>{totalRendimiento.toFixed(2)}</span>
                </div>
                <div className="breakdown-item">
                  <span>Gestión Colectiva</span>
                  <span>{totalGestionColectiva.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="component-section">
              <div className="section-header">
                <div className="section-icon">🎓</div>
                <div className="section-info">
                  <h4>Formación Profesional</h4>
                  <p>Desarrollo intelectual y académico</p>
                </div>
                <div className="section-score">{totalFormacionProfesional.toFixed(2)}</div>
              </div>
              <div className="section-breakdown">
                <div className="breakdown-item">
                  <span>Calidad Intelectual</span>
                  <span>{totalFormacionProfesional.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="component-section">
              <div className="section-header">
                <div className="section-icon">⚖️</div>
                <div className="section-info">
                  <h4>Normas Disciplinarias</h4>
                  <p>Cumplimiento de regulaciones</p>
                </div>
                <div className="section-score">{totalNormasDisciplinarias.toFixed(2)}</div>
              </div>
              <div className="section-breakdown">
                <div className="breakdown-item">
                  <span>Conducta Policial</span>
                  <span>{totalNormasDisciplinarias.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="component-section">
              <div className="section-header">
                <div className="section-icon">💪</div>
                <div className="section-info">
                  <h4>Aptitudes Físicas</h4>
                  <p>Competencias físicas y personales</p>
                </div>
                <div className="section-score">{totalAptitudesFisicas.toFixed(2)}</div>
              </div>
              <div className="section-breakdown">
                <div className="breakdown-item">
                  <span>Competencias Personales</span>
                  <span>{aptitudesFisicas.filter(item => item.seccion === 'EVALUACIÓN DE COMPETENCIAS').reduce((sum, item) => sum + item.puntuacion, 0).toFixed(2)}</span>
                </div>
                <div className="breakdown-item">
                  <span>Evaluación Física</span>
                  <span>{aptitudesFisicas.find(item => item.seccion === 'EVALUACIÓN FISICA')?.puntuacion.toFixed(2) || '0.00'}</span>
                </div>
              </div>
            </div>

            <div className="component-section">
              <div className="section-header">
                <div className="section-icon">🏆</div>
                <div className="section-info">
                  <h4>Incentivos</h4>
                  <p>Reconocimientos y logros</p>
                </div>
                <div className="section-score">{totalIncentivos.toFixed(2)}</div>
              </div>
              <div className="section-breakdown">
                <div className="breakdown-item">
                  <span>Reconocimientos</span>
                  <span>{totalIncentivos.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="performance-chart">
          <h3>📈 GRÁFICO DE RENDIMIENTO</h3>
          <div className="chart-container">
            <div className="chart-bars">
              <div className="chart-bar">
                <div className="bar-label">Gestión</div>
                <div className="bar-container">
                  <div className="bar-fill" style={{width: `${(totalResultadosGestion / 30) * 100}%`}}></div>
                  <span className="bar-value">{totalResultadosGestion.toFixed(1)}</span>
                </div>
              </div>
              <div className="chart-bar">
                <div className="bar-label">Formación</div>
                <div className="bar-container">
                  <div className="bar-fill" style={{width: `${(totalFormacionProfesional / 10) * 100}%`}}></div>
                  <span className="bar-value">{totalFormacionProfesional.toFixed(1)}</span>
                </div>
              </div>
              <div className="chart-bar">
                <div className="bar-label">Disciplina</div>
                <div className="bar-container">
                  <div className="bar-fill" style={{width: `${(totalNormasDisciplinarias / 30) * 100}%`}}></div>
                  <span className="bar-value">{totalNormasDisciplinarias.toFixed(1)}</span>
                </div>
              </div>
              <div className="chart-bar">
                <div className="bar-label">Físicas</div>
                <div className="bar-container">
                  <div className="bar-fill" style={{width: `${(totalAptitudesFisicas / 15) * 100}%`}}></div>
                  <span className="bar-value">{totalAptitudesFisicas.toFixed(1)}</span>
                </div>
              </div>
              <div className="chart-bar">
                <div className="bar-label">Incentivos</div>
                <div className="bar-container">
                  <div className="bar-fill" style={{width: `${(totalIncentivos / 15) * 100}%`}}></div>
                  <span className="bar-value">{totalIncentivos.toFixed(1)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Resumen;
