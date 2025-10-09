// Configuración de cálculos para Responsabilidad Profesional y Personal / Código de Ética

// Multiplicadores para cada indicador (columna D)
export const MULTIPLICADORES = {
  1: -5,   // Abandono de servicio sin autorización
  2: -3,   // Acuerdo conciliatorio
  3: -5,   // Acuerdo conciliatorio no cumplido
  4: -5,  // Agresiones a servidores policiales (autor)
  5: -5,   // Aprehensión
  6: -5,   // Ausencia injustificada
  7: -5,  // Consumo de bebidas alcohólicas
  8: -5,   // Contravención de tránsito con vehículo policial asignado
  10: -5,  // Control y cuidado de infraestructura policial
  11: -2,  // Cumplimiento de actividades en el siipne
  12: -10,  // Detención
  14: -5, // Impedimento de ejercicio profesional
  15: -3,  // Imposibilidad de acuerdo
  16: -5,  // Imposibilidad de acuerdos documento
  17: -5,  // Incumplimiento de horario de trabajo
  18: -5,  // Manejo responsable de redes sociales
  19: -10,  // Medida cautelar
  20: -5, // Medida especial administrativa
  21: -10, // Medidas de protección
  22: -2,  // Permisos
  23: -5   // Violencia intrafamiliar
};

// Límite máximo de penalización
export const LIMITE_MAXIMO = -20;

// Configuración para Control y cuidado de equipo en dotación (ID: 9)
// Se calcula basado en SI/NO: SI = 0, NO = -10
export const EQUIPO_DOTACION_CONFIG = {
  'SI': 0,
  'NO': -10,
  default: 0
};


// Función principal para calcular las notas de responsabilidad
export const calcularNotasResponsabilidad = (id, datos, indicadores = []) => {
  let nota = 0;

  // Caso especial para equipo en dotación (ID: 9) que acepta SI/NO
  if (id === 9) {
    nota = EQUIPO_DOTACION_CONFIG[datos] !== undefined ? EQUIPO_DOTACION_CONFIG[datos] : EQUIPO_DOTACION_CONFIG.default;
    return nota;
  }

  const datosNum = parseInt(datos) || 0;

  if (datosNum > 0) {
    switch (id) {
      case 6: // Ausencia injustificada
        // Fórmula: datos * -5 con límite máximo de -10
        nota = Math.max(-10, -5 * datosNum);
        break;
        
      case 13: // Días laborados (365-)
        // Fórmula: dato ingresado * 0.027
        const resultadoInicial = datosNum * 0.027;
        // Cálculo adicional días libres: SI(P32>=10;-10;P32*-1)
        nota = resultadoInicial >= 10 ? -10 : resultadoInicial * -1;
        break;
        
      default:
        // Para todos los demás casos, usar multiplicador con límite máximo
        const multiplicador = MULTIPLICADORES[id];
        if (multiplicador) {
          nota = Math.max(LIMITE_MAXIMO, multiplicador * datosNum);
        }
        break;
    }
  }

  return nota;
};

// Función para recalcular equipo en dotación basado en su propio valor
export const recalcularEquipoDotacion = (equipoDotacionValue) => {
  return EQUIPO_DOTACION_CONFIG[equipoDotacionValue] || EQUIPO_DOTACION_CONFIG.default;
};

// Función para calcular el total con la fórmula: ((20+(TOTAL)+ABS((20+(TOTAL))))/2)
export const calcularTotalResponsabilidad = (total) => {
  return ((20 + total + Math.abs(20 + total)) / 2);
};

// Configuración de puntuaciones para Rendimiento Individual
export const PUNTUACIONES_RENDIMIENTO = {
  'NUNCA': 0.5,
  'CASI NUNCA': 1.13,
  'OCASIONALMENTE': 1.75,
  'FRECUENTEMENTE': 2.38,
  'SIEMPRE': 3
};

// Configuración de puntuaciones para Evaluación de Competencias
export const PUNTUACIONES_COMPETENCIAS = {
  'SIEMPRE': 1,
  'FRECUENTEMENTE': 0.75,
  'OCASIONALMENTE': 0.5,
  'CASI NUNCA': 0.25,
  'NUNCA': 0
};

// Función para calcular la puntuación de rendimiento individual
// Fórmula: =SI(F37="NUNCA";0,5;SI(F37="CASI NUNCA";1,13;SI(F37="OCASIONALMENTE";1,75;SI(F37="FRECUENTEMENTE";2,38;SI(F37="SIEMPRE";3;"ERROR")))))
export const calcularPuntuacionRendimiento = (evaluacion) => {
  return PUNTUACIONES_RENDIMIENTO[evaluacion] || 0;
};

// Función para calcular la puntuación de evaluación de competencias
// Fórmula: =SI(F60="SIEMPRE";1;SI(F60="FRECUENTEMENTE";0,75;SI(F60="OCASIONALMENTE";0,5;SI(F60="CASI NUNCA";0,25;SI(F60="NUNCA";0;"ERROR")))))
export const calcularPuntuacionCompetencias = (evaluacion) => {
  return PUNTUACIONES_COMPETENCIAS[evaluacion] || 0;
};

// Función para calcular la puntuación de evaluación física
// Fórmula: (valor*10)/20
export const calcularPuntuacionFisica = (valor) => {
  const valorNum = parseFloat(valor) || 0;
  return (valorNum * 10) / 20;
};

// Configuración de cálculos para Incentivos (Primer cálculo)
export const INCENTIVOS_CALCULO_INICIAL = {
  'Actuaciones relevantes': (cantidad) => {
    // SI(G75>9;4;G75*0,5)
    return cantidad > 9 ? 4 : cantidad * 0.5;
  },
  
  'Condecoraciones': (cantidad) => {
    // SI(G75>9;4;G75*0,5)
    return cantidad > 5 ? 2 : cantidad * 1
  },
  
  'Felicitaciones': (cantidad) => {
    // SI(G76>5;2;G76*1)
    return cantidad > 5 ? 2 : cantidad * 0.5;
  },
  
  'Territorios priorizados': (cantidad) => {
    // (G78*2)/365
    return (cantidad * 2) / 365;
  },
  
  'Titulos': (cantidad) => {
    // SI(G79>2;1;G79*1)
    return cantidad > 2 ? 1 : cantidad * 1;
  },
  
  'Unidades de contingencia fronteriza': (cantidad) => {
    // (G80*1)/180
    return (cantidad * 1) / 180;
  },
  
  'Unidades de contingencia penitenciaria': (cantidad) => {
    // (G81*1)/180
    return (cantidad * 1) / 180;
  },
  
  'Zonas de dificil acceso': (cantidad) => {
    // (G82*1)/365
    return (cantidad * 1) / 365;
  }
};

// Configuración de límites finales para Incentivos (Segundo cálculo - columna puntuación)
export const INCENTIVOS_LIMITES_FINALES = {
  'Actuaciones relevantes': (resultadoInicial) => {
    // SI(T118>2;2;T118)
    return resultadoInicial > 2 ? 2 : resultadoInicial;
  },
  
  'Condecoraciones': (resultadoInicial) => {
    // SI(T118>2;2;T118)
    return resultadoInicial > 2 ? 2 : resultadoInicial;
  },
  
  'Felicitaciones': (resultadoInicial) => {
    // SI(T119>2;2;T119)
    return resultadoInicial > 2 ? 2 : resultadoInicial;
  },
  
  'Territorios priorizados': (resultadoInicial) => {
    // T121 (sin límite)
    return resultadoInicial;
  },
  
  'Titulos': (resultadoInicial) => {
    // SI(T122>2;1;T122)
    return resultadoInicial > 2 ? 1 : resultadoInicial;
  },
  
  'Unidades de contingencia fronteriza': (resultadoInicial) => {
    // T123 (sin límite)
    return resultadoInicial;
  },
  
  'Unidades de contingencia penitenciaria': (resultadoInicial) => {
    // T124 (sin límite)
    return resultadoInicial;
  },
  
  'Zonas de dificil acceso': (resultadoInicial) => {
    // T125 (sin límite)
    return resultadoInicial;
  }
};

// Función para calcular la puntuación de incentivos (dos pasos)
export const calcularPuntuacionIncentivo = (tipoIncentivo, cantidad) => {
  const cantidadNum = parseFloat(cantidad) || 0;
  
  // Paso 1: Cálculo inicial
  const calculadoraInicial = INCENTIVOS_CALCULO_INICIAL[tipoIncentivo];
  if (!calculadoraInicial) {
    return 0;
  }
  
  const resultadoInicial = calculadoraInicial(cantidadNum);
  
  // Paso 2: Aplicar límites finales (columna puntuación)
  const calculadoraFinal = INCENTIVOS_LIMITES_FINALES[tipoIncentivo];
  if (!calculadoraFinal) {
    return resultadoInicial;
  }
  
  const resultadoFinal = calculadoraFinal(resultadoInicial);
  
  return resultadoFinal;
};

// Función para calcular el total de incentivos con lógica compleja
export const calcularTotalIncentivosComplejo = (incentivos, sumaDatosConductaPolicial) => {
  // Paso 1: Sumar todas las puntuaciones de incentivos
  const sumaIncentivos = incentivos.reduce((sum, item) => sum + item.puntuacion, 0);
  
  
  // Paso 2: Si la suma > 4, usar 4; sino usar la suma original
  const valorIntermedio = sumaIncentivos > 4 ? 4 : sumaIncentivos;
  
  
  // Paso 3: Si hay al menos una sanción (suma de datos > 0), total final = 0; sino usar el valor del paso anterior
  const totalFinal = sumaDatosConductaPolicial > 0 ? 0 : valorIntermedio;
  
  
  return totalFinal;
};

// Configuración para Gestión Colectiva
export const GESTION_COLECTIVA_CONFIG = {
  'SPR - Gestión de la unidad': {
    multiplicador: 4,
    divisor: 20
  },
  'SPR - Gestión de la información': {
    multiplicador: 1,
    divisor: 20
  }
};

// Función para calcular las notas de gestión colectiva
// SPR - Gestión de la unidad: (valor*4)/20
// SPR - Gestión de la información: (valor*1)/20
export const calcularNotasGestionColectiva = (tipo, valor) => {
  const config = GESTION_COLECTIVA_CONFIG[tipo];
  if (config) {
    return (valor * config.multiplicador) / config.divisor;
  }
  return 0;
};

// Función para calcular las notas de formación profesional
// Fórmula: (datos*10)/20
export const calcularNotasFormacionProfesional = (datos) => {
  return (datos * 10) / 20;
};

// Configuración de cálculos para Conducta Policial - Sanciones Disciplinarias
export const SANCIONES_DISCIPLINARIAS = {
  'Amonestación verbal': (valor) => {
    // SI(F52>2;-2,5;-1,25*F52)
    return valor > 2 ? -2.5 : -1.25 * valor;
  },
  
  'Amonestación escrita': (valor) => {
    // SI(F53>2;-5;-2,5*F53)
    return valor > 2 ? -5 : -2.5 * valor;
  },
  
  'Sanción pecuniaria menor': (valor) => {
    // SI(F54>=2;-10;-7,5*F54)
    return valor >= 2 ? -10 : -7.5 * valor;
  },
  
  'Sanción pecuniaria mayor': (valor) => {
    // SI(F55>2;-20;-12,4*F55)
    return valor > 2 ? -20 : -12.4 * valor;
  },
  
  'Suspensión de funciones': (valor) => {
    // SI(F56>=2;-30;-20*F56)
    return valor >= 2 ? -30 : -20 * valor;
  }
};

// Función principal para calcular las notas de conducta policial
// Similar a calcularNotasResponsabilidad pero para sanciones disciplinarias
export const calcularNotasConductaPolicial = (tipoSancion, valor) => {
  const valorNum = parseFloat(valor) || 0;
  let nota = 0;

  if (valorNum > 0) {
    const calculadora = SANCIONES_DISCIPLINARIAS[tipoSancion];
    if (calculadora) {
      nota = calculadora(valorNum);
    }
  }

  return nota;
};

// Función para obtener el total de todas las sanciones disciplinarias
export const calcularTotalConductaPolicial = (sanciones) => {
  let total = 0;
  
  Object.keys(sanciones).forEach(tipo => {
    const valor = sanciones[tipo] || 0;
    total += calcularNotasConductaPolicial(tipo, valor);
  });
  
  return total;
};

// Función para calcular el total con la fórmula específica de conducta policial
// total final = SI(suma3primeros<-10;-10;suma3primeros) + SI(suma2ultimos<-20;-20;suma2ultimos)
// Luego aplicar: ((30+total+ABS((30+total))))/2
export const calcularTotalConductaPolicialConFormula = (normasDisciplinarias) => {
  // Calcular suma3primeros: amonestación verbal + amonestación escrita + sanción pecuniaria menor
  const suma3primeros = normasDisciplinarias
    .filter(item => ['Amonestación verbal', 'Amonestación escrita', 'Sanción pecuniaria menor'].includes(item.indicador))
    .reduce((sum, item) => sum + item.nota, 0);
  
  // Calcular suma2ultimos: sanción pecuniaria mayor + suspensión de funciones
  const suma2ultimos = normasDisciplinarias
    .filter(item => ['Sanción pecuniaria mayor', 'Suspensión de funciones'].includes(item.indicador))
    .reduce((sum, item) => sum + item.nota, 0);
  
  // Aplicar las fórmulas SI
  const primerResultado = suma3primeros < -10 ? -10 : suma3primeros;
  const segundoResultado = suma2ultimos < -20 ? -20 : suma2ultimos;
  
  // Total intermedio
  const totalIntermedio = primerResultado + segundoResultado;
  
  // Aplicar la fórmula final: ((30+total+ABS((30+total))))/2
  const totalFinal = ((30 + totalIntermedio + Math.abs(30 + totalIntermedio)) / 2);
  
  return totalFinal;
};

// Función específica para calcular nota individual por tipo de sanción
export const calcularNotaIndividualConducta = (tipoSancion, cantidad) => {
  const cantidadNum = parseInt(cantidad) || 0;
  
  if (cantidadNum === 0) {
    return 0;
  }
  
  switch (tipoSancion) {
    case 'Amonestación verbal':
      return cantidadNum > 2 ? -2.5 : -1.25 * cantidadNum;
      
    case 'Amonestación escrita':
      return cantidadNum > 2 ? -5 : -2.5 * cantidadNum;
      
    case 'Sanción pecuniaria menor':
      return cantidadNum >= 2 ? -10 : -7.5 * cantidadNum;
      
    case 'Sanción pecuniaria mayor':
      return cantidadNum > 2 ? -20 : -12.4 * cantidadNum;
      
    case 'Suspensión de funciones':
      return cantidadNum >= 2 ? -30 : -20 * cantidadNum;
      
    default:
      return 0;
  }
};