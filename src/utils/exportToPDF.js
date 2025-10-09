import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export const exportarEvaluacionAPDF = async (data) => {
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

  // Crear nuevo documento PDF en formato A4
  const doc = new jsPDF();
  let yPos = 15;

  // Configuración de colores
  const colorPrimario = [30, 64, 175]; // #1e40af
  const colorSecundario = [59, 130, 246]; // #3b82f6

  // Intentar cargar el logo
  let logoImg = null;
  try {
    const img = new Image();
    img.src = '/logo.png';
    logoImg = await new Promise((resolve) => {
      img.onload = () => resolve(img);
      img.onerror = () => resolve(null);
    });
  } catch (error) {
    logoImg = null;
  }

  // Función para agregar marca de agua en cada página
  const agregarMarcaDeAgua = (pageNum, logoImg = null) => {
    // Guardar el estado actual
    const currentPage = doc.internal.getCurrentPageInfo().pageNumber;
    doc.setPage(pageNum);

    // Logo como marca de agua en el centro (si está disponible)
    if (logoImg) {
      doc.saveGraphicsState();
      doc.setGState(new doc.GState({ opacity: 0.08 }));
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const logoSize = 60;
      doc.addImage(logoImg, 'PNG', 
        (pageWidth - logoSize) / 2, 
        (pageHeight - logoSize) / 2, 
        logoSize, logoSize
      );
      doc.restoreGraphicsState();
    }

    // Texto de marca de agua - SIMULADOR
    doc.saveGraphicsState();
    doc.setGState(new doc.GState({ opacity: 0.1 }));
    doc.setTextColor(220, 38, 38); // Rojo
    doc.setFontSize(80);
    doc.setFont('helvetica', 'bold');
    
    // Rotar y centrar el texto
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    
    doc.text('SIMULADOR', pageWidth / 2, pageHeight / 2 + 30, {
      angle: 45,
      align: 'center'
    });
    
    doc.restoreGraphicsState();

    // Volver a la página actual
    doc.setPage(currentPage);
  };

  // Encabezado principal con fondo blanco
  doc.setFillColor(255, 255, 255);
  doc.rect(0, 0, 210, 40, 'F');
  
  // Borde inferior del encabezado
  doc.setDrawColor(...colorPrimario);
  doc.setLineWidth(0.5);
  doc.line(10, 40, 200, 40);
  
  // Agregar logo en el encabezado si está disponible
  if (logoImg) {
    doc.addImage(logoImg, 'PNG', 15, 8, 25, 25);
  }
  
  // Textos del encabezado
  doc.setTextColor(...colorPrimario);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('POLICIA NACIONAL DEL ECUADOR', logoImg ? 110 : 105, 12, { align: logoImg ? 'center' : 'center' });
  
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.text('EVALUACION DE DESEMPENO Y GESTION POR COMPETENCIAS', logoImg ? 110 : 105, 20, { align: logoImg ? 'center' : 'center' });
  
  // Marca de SIMULADOR en el header
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(220, 38, 38); // Rojo
  doc.text('DOCUMENTO DE SIMULACION - NO OFICIAL', logoImg ? 110 : 105, 28, { align: logoImg ? 'center' : 'center' });
  
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100, 100, 100);
  const fechaActual = new Date().toLocaleDateString('es-EC');
  doc.text(`Fecha: ${fechaActual}`, logoImg ? 110 : 105, 35, { align: logoImg ? 'center' : 'center' });

  yPos = 45;

  // Función auxiliar para agregar tabla
  const agregarTabla = (titulo, headers, rows, startY) => {
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text(titulo, 14, startY);
    
    autoTable(doc, {
      startY: startY + 5,
      head: [headers],
      body: rows,
      theme: 'striped',
      headStyles: { fillColor: colorPrimario, textColor: 255, fontStyle: 'bold' },
      styles: { fontSize: 9, cellPadding: 2 },
      alternateRowStyles: { fillColor: [248, 250, 252] },
      margin: { left: 14, right: 14 }
    });
    
    return doc.lastAutoTable.finalY + 10;
  };

  // 1. Responsabilidad Profesional
  const responsabilidadRows = indicadores.map(ind => [
    ind.nombre,
    ind.datos || '-',
    ind.nota.toFixed(2)
  ]);
  responsabilidadRows.push(['TOTAL', '', totales.responsabilidad.toFixed(2)]);
  
  yPos = agregarTabla(
    '1. RESPONSABILIDAD PROFESIONAL Y PERSONAL',
    ['Indicador', 'Datos', 'Nota'],
    responsabilidadRows,
    yPos
  );

  // Nueva página si es necesario
  if (yPos > 250) {
    doc.addPage();
    yPos = 15;
  }

  // 2. Rendimiento Individual
  const rendimientoRows = rendimientoIndividual.map(item => [
    item.criterio,
    item.evaluacion || '-',
    item.puntuacion.toFixed(2)
  ]);
  rendimientoRows.push(['TOTAL', '', totales.rendimiento.toFixed(2)]);
  
  yPos = agregarTabla(
    '2. RENDIMIENTO INDIVIDUAL',
    ['Criterio', 'Evaluación', 'Puntuación'],
    rendimientoRows,
    yPos
  );

  // Nueva página
  if (yPos > 250) {
    doc.addPage();
    yPos = 15;
  }

  // 3. Gestión Colectiva
  const gestionRows = gestionColectiva.map(item => [
    item.indicador,
    item.datos || '-',
    item.nota.toFixed(2)
  ]);
  gestionRows.push(['TOTAL', '', totales.gestionColectiva.toFixed(2)]);
  
  yPos = agregarTabla(
    '3. GESTIÓN COLECTIVA',
    ['Indicador', 'Datos', 'Nota'],
    gestionRows,
    yPos
  );

  // 4. Formación Profesional
  const formacionRows = formacionProfesional.map(item => [
    item.indicador,
    item.datos || '-',
    item.nota.toFixed(2)
  ]);
  formacionRows.push(['TOTAL', '', totales.formacionProfesional.toFixed(2)]);
  
  yPos = agregarTabla(
    '4. FORMACIÓN PROFESIONAL E INTELECTUAL',
    ['Indicador', 'Datos', 'Nota'],
    formacionRows,
    yPos
  );

  // Nueva página
  doc.addPage();
  yPos = 15;

  // 5. Normas Disciplinarias
  const normasRows = normasDisciplinarias.map(item => [
    item.indicador,
    item.datos || '-',
    item.nota.toFixed(2)
  ]);
  normasRows.push(['TOTAL', '', totales.normasDisciplinarias.toFixed(2)]);
  
  yPos = agregarTabla(
    '5. CONDUCTA POLICIAL - NORMAS DISCIPLINARIAS',
    ['Sanción', 'Datos', 'Nota'],
    normasRows,
    yPos
  );

  // 6. Aptitudes Físicas
  const competencias = aptitudesFisicas.filter(item => item.seccion === 'EVALUACIÓN DE COMPETENCIAS');
  const fisica = aptitudesFisicas.find(item => item.seccion === 'EVALUACIÓN FISICA');
  
  const aptitudesRows = [
    ...competencias.map(item => [
      item.indicador,
      item.evaluacion || '-',
      item.puntuacion.toFixed(2)
    ]),
    ['Pruebas Físicas', fisica?.evaluacion || '-', fisica?.puntuacion.toFixed(2) || '0.00'],
    ['TOTAL', '', totales.aptitudesFisicas.toFixed(2)]
  ];
  
  yPos = agregarTabla(
    '6. APTITUDES FÍSICAS Y PERSONALES',
    ['Indicador', 'Evaluación', 'Puntuación'],
    aptitudesRows,
    yPos
  );

  // Nueva página si es necesario
  if (yPos > 200) {
    doc.addPage();
    yPos = 15;
  }

  // 7. Incentivos
  const incentivosRows = incentivos.map(item => [
    item.indicador,
    item.cantidad || '-',
    item.puntuacion.toFixed(2)
  ]);
  incentivosRows.push(['TOTAL', '', totales.incentivos.toFixed(2)]);
  
  yPos = agregarTabla(
    '7. INCENTIVOS',
    ['Indicador', 'Cantidad', 'Puntuación'],
    incentivosRows,
    yPos
  );

  // Nueva página para resumen final
  doc.addPage();
  yPos = 15;

  // 8. Resumen Final
  doc.setFillColor(...colorPrimario);
  doc.rect(0, yPos - 5, 210, 15, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('RESUMEN FINAL DE EVALUACIÓN', 105, yPos + 5, { align: 'center' });
  
  yPos += 20;

  const resumenRows = [
    ['Responsabilidad Profesional', totales.responsabilidad.toFixed(2)],
    ['Rendimiento Individual', totales.rendimiento.toFixed(2)],
    ['Gestión Colectiva', totales.gestionColectiva.toFixed(2)],
    ['Formación Profesional', totales.formacionProfesional.toFixed(2)],
    ['Normas Disciplinarias', totales.normasDisciplinarias.toFixed(2)],
    ['Aptitudes Físicas', totales.aptitudesFisicas.toFixed(2)],
    ['Incentivos', totales.incentivos.toFixed(2)]
  ];

  autoTable(doc, {
    startY: yPos,
    head: [['Componente', 'Total']],
    body: resumenRows,
    theme: 'grid',
    headStyles: { fillColor: colorPrimario, textColor: 255, fontStyle: 'bold', fontSize: 10 },
    styles: { fontSize: 10, cellPadding: 3 },
    margin: { left: 14, right: 14 }
  });

  yPos = doc.lastAutoTable.finalY + 10;

  // Totales finales
  autoTable(doc, {
    startY: yPos,
    body: [
      ['TOTAL GENERAL', totales.totalGeneral.toFixed(2)],
      ['NOTA FINAL (sobre 20)', totales.notaFinal],
      ['CLASIFICACIÓN', totales.clasificacion]
    ],
    theme: 'plain',
    styles: { 
      fontSize: 11, 
      cellPadding: 4,
      fontStyle: 'bold',
      fillColor: [239, 246, 255]
    },
    columnStyles: {
      0: { textColor: [30, 64, 175], halign: 'right' },
      1: { textColor: [30, 64, 175], halign: 'left', fontStyle: 'bold' }
    },
    margin: { left: 14, right: 14 }
  });

  // Agregar marca de agua y pie de página en todas las páginas
  const totalPages = doc.internal.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    // Agregar marca de agua con logo
    agregarMarcaDeAgua(i, logoImg);
    
    // Agregar pie de página
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(128, 128, 128);
    doc.text(
      `Página ${i} de ${totalPages}`,
      105,
      287,
      { align: 'center' }
    );
    
    // Agregar texto "DOCUMENTO DE SIMULACION"
    doc.setFontSize(7);
    doc.setTextColor(150, 150, 150);
    doc.text(
      'DOCUMENTO DE SIMULACION - NO OFICIAL',
      105,
      292,
      { align: 'center' }
    );
  }

  // Guardar el PDF
  const nombreArchivo = `Evaluacion_Policial_${fechaActual.replace(/\//g, '-')}.pdf`;
  doc.save(nombreArchivo);
};

