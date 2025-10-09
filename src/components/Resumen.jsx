import React, { useState } from 'react';
import { exportarEvaluacionAExcel } from '../utils/exportToExcel';

const Resumen = ({ 
  total,
  totalRendimiento,
  totalGestionColectiva,
  totalFormacionProfesional,
  totalNormasDisciplinarias,
  totalAptitudesFisicas,
  totalIncentivos,
  aptitudesFisicas,
  indicadores,
  rendimientoIndividual,
  gestionColectiva,
  formacionProfesional,
  normasDisciplinarias,
  incentivos
}) => {
  const [mostrarResumen, setMostrarResumen] = useState(false);
  
  const totalResultadosGestion = total + totalRendimiento + totalGestionColectiva;
  const totalGeneral = totalResultadosGestion + totalFormacionProfesional + totalNormasDisciplinarias + totalAptitudesFisicas + totalIncentivos;
  const notaFinalCalculada = totalGeneral * 0.2;
  const notaFinal = Math.min(20, notaFinalCalculada).toFixed(2); // Límite máximo de 20 puntos

  // Función para determinar la categoría basada en la nota final
  // Escala: 0-20 puntos, clasificación según tabla oficial
  const determinarCategoria = (nota) => {
    const notaNum = parseFloat(nota);
    
    if (notaNum >= 18.0 && notaNum <= 20.0) {
      return { lista: "Lista 1", rango: "De 18.0 a 20.0", calificacion: "Excelente" };
    } else if (notaNum >= 16.0 && notaNum <= 17.99) {
      return { lista: "Lista 2", rango: "De 16.0 a 17.99", calificacion: "Muy bueno" };
    } else if (notaNum >= 14.0 && notaNum <= 15.99) {
      return { lista: "Lista 3", rango: "De 14.0 a 15.99", calificacion: "Bueno" };
    } else {
      return { lista: "Cuota de Eliminación", rango: "Menor a 14.0", calificacion: "Por debajo del estándar mínimo" };
    }
  };

  const categoriaFinal = determinarCategoria(notaFinal);

  const handleSimular = () => {
    setMostrarResumen(true);
  };

  const handleExportarExcel = () => {
    const datosExportacion = {
      indicadores,
      rendimientoIndividual,
      gestionColectiva,
      formacionProfesional,
      normasDisciplinarias,
      aptitudesFisicas,
      incentivos,
      totales: {
        responsabilidad: total,
        rendimiento: totalRendimiento,
        gestionColectiva: totalGestionColectiva,
        formacionProfesional: totalFormacionProfesional,
        normasDisciplinarias: totalNormasDisciplinarias,
        aptitudesFisicas: totalAptitudesFisicas,
        incentivos: totalIncentivos,
        totalGeneral: totalGeneral,
        notaFinal: notaFinal,
        clasificacion: categoriaFinal.lista
      }
    };
    
    exportarEvaluacionAExcel(datosExportacion);
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
              <div className="simulation-header-buttons">
                <button 
                  className="export-excel-button"
                  onClick={handleExportarExcel}
                >
                  📊 Descargar Excel
                </button>
                <button 
                  className="reset-button"
                  onClick={() => setMostrarResumen(false)}
                >
                  🔄 Nueva Simulación
                </button>
              </div>
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

        <div className="categorization-section">
          <h3>📊 CLASIFICACIÓN FINAL</h3>
          <div className="categorization-compact">
            <div className="classification-result">
              <span className="classification-label">Categoría:</span>
              <span className="classification-value">{categoriaFinal.lista}</span>
              <span className="classification-grade">({categoriaFinal.calificacion})</span>
            </div>
            
            <table className="reference-table-compact">
              <thead>
                <tr>
                  <th>Lista</th>
                  <th>Rango</th>
                  <th>Calificación</th>
                </tr>
              </thead>
              <tbody>
                <tr className={categoriaFinal.lista === "Lista 1" ? "highlighted" : ""}>
                  <td>Lista 1</td>
                  <td>18.0 - 20.0</td>
                  <td>Excelente</td>
                </tr>
                <tr className={categoriaFinal.lista === "Lista 2" ? "highlighted" : ""}>
                  <td>Lista 2</td>
                  <td>16.0 - 17.99</td>
                  <td>Muy bueno</td>
                </tr>
                <tr className={categoriaFinal.lista === "Lista 3" ? "highlighted" : ""}>
                  <td>Lista 3</td>
                  <td>14.0 - 15.99</td>
                  <td>Bueno</td>
                </tr>
                <tr className={`elimination-row ${categoriaFinal.lista === "Cuota de Eliminación" ? "highlighted" : ""}`}>
                  <td>Cuota de Eliminación</td>
                  <td>&lt; 14.0</td>
                  <td>Por debajo del estándar</td>
                </tr>
              </tbody>
            </table>
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
