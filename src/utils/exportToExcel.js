import * as XLSX from 'xlsx';

export const exportarEvaluacionAExcel = (data) => {
  const {
    indicadores,
    rendimientoIndividual,
    gestionColectiva,
    formacionProfesional,
    normasDisciplinarias,
    aptitudesFisicas,
    incentivos,
    totales
  } = data;

  // Crear un nuevo libro de trabajo
  const workbook = XLSX.utils.book_new();

  // 1. Hoja de Responsabilidad Profesional
  const responsabilidadData = [
    ['RESPONSABILIDAD PROFESIONAL Y PERSONAL / CÓDIGO DE ÉTICA'],
    ['Indicador', 'Datos', 'Nota'],
    ...indicadores.map(ind => [ind.nombre, ind.datos || '', ind.nota.toFixed(2)]),
    [],
    ['TOTAL', '', totales.responsabilidad.toFixed(2)]
  ];
  const wsResponsabilidad = XLSX.utils.aoa_to_sheet(responsabilidadData);
  XLSX.utils.book_append_sheet(workbook, wsResponsabilidad, 'Responsabilidad');

  // 2. Hoja de Rendimiento Individual
  const rendimientoData = [
    ['RENDIMIENTO INDIVIDUAL'],
    ['Criterio', 'Evaluación', 'Puntuación'],
    ...rendimientoIndividual.map(item => [item.criterio, item.evaluacion || '', item.puntuacion.toFixed(2)]),
    [],
    ['TOTAL', '', totales.rendimiento.toFixed(2)]
  ];
  const wsRendimiento = XLSX.utils.aoa_to_sheet(rendimientoData);
  XLSX.utils.book_append_sheet(workbook, wsRendimiento, 'Rendimiento Individual');

  // 3. Hoja de Gestión Colectiva
  const gestionData = [
    ['GESTIÓN COLECTIVA'],
    ['Indicador', 'Datos', 'Nota'],
    ...gestionColectiva.map(item => [item.indicador, item.datos || '', item.nota.toFixed(2)]),
    [],
    ['TOTAL', '', totales.gestionColectiva.toFixed(2)]
  ];
  const wsGestion = XLSX.utils.aoa_to_sheet(gestionData);
  XLSX.utils.book_append_sheet(workbook, wsGestion, 'Gestión Colectiva');

  // 4. Hoja de Formación Profesional
  const formacionData = [
    ['FORMACIÓN PROFESIONAL E INTELECTUAL'],
    ['Indicador', 'Datos', 'Nota'],
    ...formacionProfesional.map(item => [item.indicador, item.datos || '', item.nota.toFixed(2)]),
    [],
    ['TOTAL', '', totales.formacionProfesional.toFixed(2)]
  ];
  const wsFormacion = XLSX.utils.aoa_to_sheet(formacionData);
  XLSX.utils.book_append_sheet(workbook, wsFormacion, 'Formación Profesional');

  // 5. Hoja de Normas Disciplinarias
  const normasData = [
    ['CONDUCTA POLICIAL - NORMAS DISCIPLINARIAS'],
    ['Sanción', 'Datos', 'Nota'],
    ...normasDisciplinarias.map(item => [item.indicador, item.datos || '', item.nota.toFixed(2)]),
    [],
    ['TOTAL', '', totales.normasDisciplinarias.toFixed(2)]
  ];
  const wsNormas = XLSX.utils.aoa_to_sheet(normasData);
  XLSX.utils.book_append_sheet(workbook, wsNormas, 'Normas Disciplinarias');

  // 6. Hoja de Aptitudes Físicas
  const competencias = aptitudesFisicas.filter(item => item.seccion === 'EVALUACIÓN DE COMPETENCIAS');
  const fisica = aptitudesFisicas.find(item => item.seccion === 'EVALUACIÓN FISICA');
  
  const aptitudesData = [
    ['APTITUDES FÍSICAS Y PERSONALES'],
    [],
    ['EVALUACIÓN DE COMPETENCIAS'],
    ['Indicador', 'Evaluación', 'Puntuación'],
    ...competencias.map(item => [item.indicador, item.evaluacion || '', item.puntuacion.toFixed(2)]),
    [],
    ['EVALUACIÓN FÍSICA'],
    ['Pruebas Físicas', fisica?.evaluacion || '', fisica?.puntuacion.toFixed(2) || '0.00'],
    [],
    ['TOTAL', '', totales.aptitudesFisicas.toFixed(2)]
  ];
  const wsAptitudes = XLSX.utils.aoa_to_sheet(aptitudesData);
  XLSX.utils.book_append_sheet(workbook, wsAptitudes, 'Aptitudes Físicas');

  // 7. Hoja de Incentivos
  const incentivosData = [
    ['INCENTIVOS'],
    ['Indicador', 'Cantidad', 'Puntuación'],
    ...incentivos.map(item => [item.indicador, item.cantidad || '', item.puntuacion.toFixed(2)]),
    [],
    ['TOTAL', '', totales.incentivos.toFixed(2)]
  ];
  const wsIncentivos = XLSX.utils.aoa_to_sheet(incentivosData);
  XLSX.utils.book_append_sheet(workbook, wsIncentivos, 'Incentivos');

  // 8. Hoja Resumen
  const resumenData = [
    ['RESUMEN DE EVALUACIÓN'],
    [],
    ['Componente', 'Total'],
    ['Responsabilidad Profesional', totales.responsabilidad.toFixed(2)],
    ['Rendimiento Individual', totales.rendimiento.toFixed(2)],
    ['Gestión Colectiva', totales.gestionColectiva.toFixed(2)],
    ['Formación Profesional', totales.formacionProfesional.toFixed(2)],
    ['Normas Disciplinarias', totales.normasDisciplinarias.toFixed(2)],
    ['Aptitudes Físicas', totales.aptitudesFisicas.toFixed(2)],
    ['Incentivos', totales.incentivos.toFixed(2)],
    [],
    ['TOTAL GENERAL', totales.totalGeneral.toFixed(2)],
    ['NOTA FINAL (sobre 20)', totales.notaFinal],
    [],
    ['CLASIFICACIÓN', totales.clasificacion]
  ];
  const wsResumen = XLSX.utils.aoa_to_sheet(resumenData);
  XLSX.utils.book_append_sheet(workbook, wsResumen, 'Resumen');

  // Generar el archivo
  const fechaActual = new Date().toISOString().split('T')[0];
  const nombreArchivo = `Evaluacion_Policial_${fechaActual}.xlsx`;
  
  XLSX.writeFile(workbook, nombreArchivo);
};

