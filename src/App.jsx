import { useState } from 'react'
import './App.css'
import ResultadosGestion from './components/ResultadosGestion'
import FormacionProfesional from './components/FormacionProfesional'
import NormasDisciplinarias from './components/NormasDisciplinarias'
import AptitudesFisicas from './components/AptitudesFisicas'
import Incentivos from './components/Incentivos'
import Resumen from './components/Resumen'
import { calcularNotasResponsabilidad, calcularTotalResponsabilidad, calcularPuntuacionRendimiento, calcularNotasGestionColectiva, calcularNotasFormacionProfesional, calcularNotaIndividualConducta, calcularTotalConductaPolicialConFormula, calcularPuntuacionCompetencias, calcularPuntuacionFisica, calcularPuntuacionIncentivo, calcularTotalIncentivosComplejo } from './utils/calculosResponsabilidad'

function App() {
  const [pasoActual, setPasoActual] = useState(1);
  const [indicadores, setIndicadores] = useState([
    { id: 1, nombre: 'Abandono de servicio sin autorización', datos: 0, nota: 0 },
    { id: 2, nombre: 'Acuerdo conciliatorio', datos: 0, nota: 0 },
    { id: 3, nombre: 'Acuerdo conciliatorio no cumplido', datos: 0, nota: 0 },
    { id: 4, nombre: 'Agresiones a servidores policiales (autor)', datos: 0, nota: 0 },
    { id: 5, nombre: 'Aprehensión', datos: 0, nota: 0 },
    { id: 6, nombre: 'Ausencia injustificada', datos: 0, nota: 0 },
    { id: 7, nombre: 'Consumo de bebidas alcohólicas', datos: 0, nota: 0 },
    { id: 8, nombre: 'Contravención de tránsito con vehículo policial asignado', datos: 0, nota: 0 },
    { id: 9, nombre: 'Control y cuidado de equipo en dotación', datos: 0, nota: 0 },
    { id: 10, nombre: 'Control y cuidado de infraestructura policial', datos: 0, nota: 0 },
    { id: 11, nombre: 'Cumplimiento de actividad des en el siipne', datos: 0, nota: 0 },
    { id: 12, nombre: 'Detención', datos: 0, nota: 0 },
    { id: 13, nombre: 'Días laborados (365-)', datos: 0, nota: 0 },
    { id: 14, nombre: 'Impedimento de ejercicio profesional', datos: 0, nota: 0 },
    { id: 15, nombre: 'Imposibilidad de acuerdo', datos: 0, nota: 0 },
    { id: 16, nombre: 'Imposibilidad de acuerdos documento', datos: 0, nota: 0 },
    { id: 17, nombre: 'Incumplimiento de horario de trabajo', datos: 0, nota: 0 },
    { id: 18, nombre: 'Manejo responsable de redes sociales', datos: 0, nota: 0 },
    { id: 19, nombre: 'Medida cautelar', datos: 0, nota: 0 },
    { id: 20, nombre: 'Medida especial administrativa', datos: 0, nota: 0 },
    { id: 21, nombre: 'Medidas de protección', datos: 0, nota: 0 },
    { id: 22, nombre: 'Permisos', datos: 0, nota: 0 },
    { id: 23, nombre: 'Violencia intrafamiliar', datos: 0, nota: 0 }
  ]);

  const [rendimientoIndividual, setRendimientoIndividual] = useState([
    { id: 1, criterio: 'Cumple sus tareas con precisión y calidad.', evaluacion: '', puntuacion: 0 },
    { id: 2, criterio: 'Conoce los métodos y procedimientos necesarios para el cumplimiento de su servicio', evaluacion: '', puntuacion: 0 },
    { id: 3, criterio: 'Utiliza adecuadamente los recursos asignados para el cumplimiento de sus tareas.', evaluacion: '', puntuacion: 0 },
    { id: 4, criterio: 'Cumple las tareas dentro del tiempo establecido.', evaluacion: '', puntuacion: 0 },
    { id: 5, criterio: 'Genera ideas o alternativas de resolución de problemas que benefician al servicio.', evaluacion: '', puntuacion: 0 }
  ]);

  const [gestionColectiva, setGestionColectiva] = useState([
    { id: 1, indicador: 'SPR - Gestión de la unidad', datos: 0, nota: 0 },
    { id: 2, indicador: 'SPR - Gestión de la información', datos: 0, nota: 0 }
  ]);

  const [formacionProfesional, setFormacionProfesional] = useState([
    { id: 1, indicador: 'PCIC', datos: 0, nota: 0 }
  ]);

  const [normasDisciplinarias, setNormasDisciplinarias] = useState([
    { id: 1, indicador: 'Amonestación verbal', datos: 0, nota: 0 },
    { id: 2, indicador: 'Amonestación escrita', datos: 0, nota: 0 },
    { id: 3, indicador: 'Sanción pecuniaria menor', datos: 0, nota: 0 },
    { id: 4, indicador: 'Sanción pecuniaria mayor', datos: 0, nota: 0 },
    { id: 5, indicador: 'Suspensión de funciones', datos: 0, nota: 0 }
  ]);

  const [aptitudesFisicas, setAptitudesFisicas] = useState([
    // Evaluación de Competencias
    { id: 1, seccion: 'EVALUACIÓN DE COMPETENCIAS', indicador: 'Autocontrol', evaluacion: '', puntuacion: 0 },
    { id: 2, seccion: 'EVALUACIÓN DE COMPETENCIAS', indicador: 'Orientación al logro', evaluacion: '', puntuacion: 0 },
    { id: 3, seccion: 'EVALUACIÓN DE COMPETENCIAS', indicador: 'Trabajo en equipo', evaluacion: '', puntuacion: 0 },
    { id: 4, seccion: 'EVALUACIÓN DE COMPETENCIAS', indicador: 'Manejo de recursos materiales', evaluacion: '', puntuacion: 0 },
    { id: 5, seccion: 'EVALUACIÓN DE COMPETENCIAS', indicador: 'Responsabilidad', evaluacion: '', puntuacion: 0 },
    { id: 6, seccion: 'EVALUACIÓN DE COMPETENCIAS', indicador: 'Dirección de personas', evaluacion: '', puntuacion: 0 },
    { id: 7, seccion: 'EVALUACIÓN DE COMPETENCIAS', indicador: 'Proactividad', evaluacion: '', puntuacion: 0 },
    { id: 8, seccion: 'EVALUACIÓN DE COMPETENCIAS', indicador: 'Identificación de problemas', evaluacion: '', puntuacion: 0 },
    { id: 9, seccion: 'EVALUACIÓN DE COMPETENCIAS', indicador: 'Juicio y toma de decisiones', evaluacion: '', puntuacion: 0 },
    { id: 10, seccion: 'EVALUACIÓN DE COMPETENCIAS', indicador: 'Mediación', evaluacion: '', puntuacion: 0 },
    // Evaluación Física
    { id: 11, seccion: 'EVALUACIÓN FISICA', indicador: 'Pruebas fisicas', evaluacion: '', puntuacion: 0 }
  ]);

  const [incentivos, setIncentivos] = useState([
    { id: 1, indicador: 'Actuaciones relevantes', cantidad: 0, puntuacion: 0 },
    { id: 2, indicador: 'Condecoraciones', cantidad: 0, puntuacion: 0 },
    { id: 3, indicador: 'Felicitaciones', cantidad: 0, puntuacion: 0 },
    { id: 4, indicador: 'Territorios priorizados', cantidad: 0, puntuacion: 0 },
    { id: 5, indicador: 'Titulos', cantidad: 0, puntuacion: 0 },
    { id: 6, indicador: 'Unidades de contingencia fronteriza', cantidad: 0, puntuacion: 0 },
    { id: 7, indicador: 'Unidades de contingencia penitenciaria', cantidad: 0, puntuacion: 0 },
    { id: 8, indicador: 'Zonas de dificil acceso', cantidad: 0, puntuacion: 0 }
  ]);

  const opcionesEvaluacion = [
    { valor: 'SIEMPRE', puntuacion: 3 },
    { valor: 'FRECUENTEMENTE', puntuacion: 2.5 },
    { valor: 'OCASIONALMENTE', puntuacion: 2 },
    { valor: 'CASI NUNCA', puntuacion: 1.13 },
    { valor: 'NUNCA', puntuacion: 0 }
  ];


  const handleDatosChange = (id, value) => {
    const newIndicadores = indicadores.map(ind => {
      if (ind.id === id) {
        const datos = parseInt(value) || 0;
        const nota = calcularNotasResponsabilidad(id, datos, indicadores);
        return { ...ind, datos, nota };
      }
      return ind;
    });
    
    // Si se cambió el valor de infraestructura policial (id: 10), recalcular equipo en dotación (id: 9)
    if (id === 10) {
      const updatedIndicadores = newIndicadores.map(ind => {
        if (ind.id === 9) {
          const infraestructuraValue = parseInt(value) || 0;
          const nota = calcularNotasResponsabilidad(9, infraestructuraValue, newIndicadores);
          return { ...ind, nota };
        }
        return ind;
      });
      setIndicadores(updatedIndicadores);
    } else {
    setIndicadores(newIndicadores);
    }
  };

  const handleEvaluacionChange = (id, evaluacion) => {
    const puntuacion = calcularPuntuacionRendimiento(evaluacion);
    
    const newRendimiento = rendimientoIndividual.map(item => {
      if (item.id === id) {
        return { ...item, evaluacion, puntuacion };
      }
      return item;
    });
    setRendimientoIndividual(newRendimiento);
  };

  const handleGestionColectivaChange = (id, field, value) => {
    const newGestion = gestionColectiva.map(item => {
      if (item.id === id) {
        const valor = parseFloat(value) || 0;
        let nota = valor;
        
        // Calcular nota basada en el tipo de gestión
        if (field === 'datos' && item.indicador) {
          nota = calcularNotasGestionColectiva(item.indicador, valor);
        }
        
        return { ...item, [field]: valor, nota };
      }
      return item;
    });
    setGestionColectiva(newGestion);
  };

  const handleFormacionProfesionalChange = (id, field, value) => {
    const newFormacion = formacionProfesional.map(item => {
      if (item.id === id) {
        const datos = parseFloat(value) || 0;
        let nota = datos;
        
        // Calcular nota basada en la fórmula: (datos*10)/20
        if (field === 'datos') {
          nota = calcularNotasFormacionProfesional(datos);
        }
        
        return { ...item, [field]: datos, nota };
      }
      return item;
    });
    setFormacionProfesional(newFormacion);
  };

  const handleNormasDisciplinariasChange = (id, field, value) => {
    const newNormas = normasDisciplinarias.map(item => {
      if (item.id === id) {
        if (field === 'datos') {
          const datos = parseFloat(value) || 0;
          const nota = calcularNotaIndividualConducta(item.indicador, datos);
          return { ...item, datos, nota };
        }
        return { ...item, [field]: parseFloat(value) || 0 };
      }
      return item;
    });
    setNormasDisciplinarias(newNormas);
  };

  const handleAptitudesFisicasChange = (id, field, value) => {
    const newAptitudes = aptitudesFisicas.map(item => {
      if (item.id === id) {
        if (field === 'evaluacion') {
          if (item.seccion === 'EVALUACIÓN DE COMPETENCIAS') {
            // Para competencias, usar la función de cálculo específica
            const puntuacion = calcularPuntuacionCompetencias(value);
            return { ...item, evaluacion: value, puntuacion };
          } else if (item.seccion === 'EVALUACIÓN FISICA') {
            // Para pruebas físicas, usar la fórmula: (valor*10)/20
            const puntuacion = calcularPuntuacionFisica(value);
            return { ...item, evaluacion: value, puntuacion };
          }
        } else if (field === 'puntuacion' && item.seccion === 'EVALUACIÓN DE COMPETENCIAS') {
          // Solo permitir editar puntuación para competencias
          return { ...item, puntuacion: parseFloat(value) || 0 };
        }
        return { ...item, [field]: value };
      }
      return item;
    });
    setAptitudesFisicas(newAptitudes);
  };

  const handleIncentivosChange = (id, field, value) => {
    const newIncentivos = incentivos.map(item => {
      if (item.id === id) {
        if (field === 'cantidad') {
          const cantidad = parseFloat(value) || 0;
          // Calcular puntuación usando la función específica para cada tipo de incentivo
          const puntuacion = calcularPuntuacionIncentivo(item.indicador, cantidad);
          return { ...item, cantidad, puntuacion };
        } else if (field === 'puntuacion') {
          return { ...item, puntuacion: parseFloat(value) || 0 };
        }
        return { ...item, [field]: value };
      }
      return item;
    });
    setIncentivos(newIncentivos);
  };

  const totalSinFormula = indicadores.reduce((sum, ind) => sum + ind.nota, 0);
  const total = calcularTotalResponsabilidad(totalSinFormula);
  const totalRendimiento = rendimientoIndividual.reduce((sum, item) => sum + item.puntuacion, 0);
  const totalGestionColectiva = gestionColectiva.reduce((sum, item) => sum + item.nota, 0);
  const totalFormacionProfesional = formacionProfesional.reduce((sum, item) => sum + item.nota, 0);
  const totalNormasDisciplinarias = calcularTotalConductaPolicialConFormula(normasDisciplinarias);
  const sumaDatosConductaPolicial = normasDisciplinarias.reduce((sum, item) => sum + item.datos, 0);
  const totalAptitudesFisicas = aptitudesFisicas.reduce((sum, item) => sum + item.puntuacion, 0);
  const totalIncentivos = calcularTotalIncentivosComplejo(incentivos, sumaDatosConductaPolicial);

  const pasos = [
    { id: 1, titulo: 'Resultados de su Gestión', descripcion: 'Responsabilidad, Rendimiento y Gestión' },
    { id: 2, titulo: 'Formación Profesional', descripcion: 'PCIC - Calidad' },
    { id: 3, titulo: 'Normas Disciplinarias', descripcion: 'Conducta Policial' },
    { id: 4, titulo: 'Aptitudes Físicas', descripcion: 'Competencias y Físicas' },
    { id: 5, titulo: 'Incentivos', descripcion: 'Reconocimientos y Logros' },
    { id: 6, titulo: 'Resumen', descripcion: 'Revisión Final' }
  ];

  const siguientePaso = () => {
    if (pasoActual < pasos.length) {
      setPasoActual(pasoActual + 1);
    }
  };

  const anteriorPaso = () => {
    if (pasoActual > 1) {
      setPasoActual(pasoActual - 1);
    }
  };

  const irAPaso = (paso) => {
    setPasoActual(paso);
  };

  const renderPaso = () => {
    switch (pasoActual) {
      case 1:
        return (
          <ResultadosGestion
            indicadores={indicadores}
            handleDatosChange={handleDatosChange}
            total={total}
            rendimientoIndividual={rendimientoIndividual}
            handleEvaluacionChange={handleEvaluacionChange}
            totalRendimiento={totalRendimiento}
            gestionColectiva={gestionColectiva}
            handleGestionColectivaChange={handleGestionColectivaChange}
            totalGestionColectiva={totalGestionColectiva}
            opcionesEvaluacion={opcionesEvaluacion}
          />
        );
      case 2:
        return (
          <FormacionProfesional
            formacionProfesional={formacionProfesional}
            handleFormacionProfesionalChange={handleFormacionProfesionalChange}
            totalFormacionProfesional={totalFormacionProfesional}
          />
        );
      case 3:
        return (
          <NormasDisciplinarias
            normasDisciplinarias={normasDisciplinarias}
            handleNormasDisciplinariasChange={handleNormasDisciplinariasChange}
            totalNormasDisciplinarias={totalNormasDisciplinarias}
          />
        );
      case 4:
        return (
          <AptitudesFisicas
            aptitudesFisicas={aptitudesFisicas}
            handleAptitudesFisicasChange={handleAptitudesFisicasChange}
            totalAptitudesFisicas={totalAptitudesFisicas}
            opcionesEvaluacion={opcionesEvaluacion}
          />
        );
      case 5:
        return (
          <Incentivos
            incentivos={incentivos}
            handleIncentivosChange={handleIncentivosChange}
            totalIncentivos={totalIncentivos}
          />
        );
      case 6:
        return (
          <Resumen
            total={total}
            totalRendimiento={totalRendimiento}
            totalGestionColectiva={totalGestionColectiva}
            totalFormacionProfesional={totalFormacionProfesional}
            totalNormasDisciplinarias={totalNormasDisciplinarias}
            totalAptitudesFisicas={totalAptitudesFisicas}
            totalIncentivos={totalIncentivos}
            aptitudesFisicas={aptitudesFisicas}
          />
        );
      default:
        return (
          <ResultadosGestion
            indicadores={indicadores}
            handleDatosChange={handleDatosChange}
            total={total}
            rendimientoIndividual={rendimientoIndividual}
            handleEvaluacionChange={handleEvaluacionChange}
            totalRendimiento={totalRendimiento}
            gestionColectiva={gestionColectiva}
            handleGestionColectivaChange={handleGestionColectivaChange}
            totalGestionColectiva={totalGestionColectiva}
            opcionesEvaluacion={opcionesEvaluacion}
          />
        );
    }
  };

  return (
    <div className="app">
      <div className="institutional-header">
        <div className="header-content">
          <div className="logo-section">
            <img src="/logo.png" alt="Logo Policía Nacional del Ecuador" className="institutional-logo" />
          </div>
          <div className="institutional-info">
            <h1>POLICÍA NACIONAL DEL ECUADOR</h1>
            <h2>DIRECCIÓN NACIONAL DE ADMINISTRACIÓN DE TALENTO HUMANO</h2>
            <h3>SIMULADOR DEL FORMULARIO DE EVALUACIÓN DE DESEMPEÑO Y GESTIÓN POR COMPETENCIAS</h3>
            <h4>ROL DE COORDINACIÓN OPERATIVA, SUPERVISIÓN OPERATIVA Y EJECUCIÓN OPERATIVA - ANUAL</h4>
          </div>
        </div>
      </div>
      
      <div className="main-content">
        <div className="content-layout">
          {/* Navegación del Wizard - Lado Izquierdo */}
          <div className="wizard-sidebar">
            <h2>Progreso de Evaluación</h2>
            <div className="wizard-navigation">
        {pasos.map((paso) => (
          <div
            key={paso.id}
            className={`wizard-step ${pasoActual === paso.id ? 'active' : ''} ${pasoActual > paso.id ? 'completed' : ''}`}
            onClick={() => irAPaso(paso.id)}
          >
            <div className="step-number">{paso.id}</div>
            <div className="step-content">
              <div className="step-title">{paso.titulo}</div>
              <div className="step-description">{paso.descripcion}</div>
            </div>
          </div>
        ))}
            </div>
          </div>
          
          {/* Contenido Principal - Lado Derecho */}
          <div className="main-form-content">
            

            {/* Contenido del paso actual */}
            <div className="wizard-content">
              {renderPaso()}
            </div>

            {/* Navegación inferior */}
            <div className="wizard-controls">
              <button 
                className="btn btn-secondary" 
                onClick={anteriorPaso}
                disabled={pasoActual === 1}
              >
                ← Anterior
              </button>
              
              <div className="wizard-progress">
                Paso {pasoActual} de {pasos.length}
              </div>
              
              {pasoActual < pasos.length ? (
                <button className="btn btn-primary" onClick={siguientePaso}>
                  Siguiente →
                </button>
              ) : (
                <button className="btn btn-success">
                  Finalizar Evaluación
        </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App