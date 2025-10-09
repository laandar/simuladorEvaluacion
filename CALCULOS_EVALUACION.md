# 📊 Resumen de Cálculos - Simulador de Evaluación Policial

## Índice
1. [Responsabilidad Profesional y Personal](#1-responsabilidad-profesional-y-personal)
2. [Rendimiento Individual](#2-rendimiento-individual)
3. [Gestión Colectiva](#3-gestión-colectiva)
4. [Formación Profesional](#4-formación-profesional)
5. [Normas Disciplinarias](#5-normas-disciplinarias)
6. [Aptitudes Físicas y Personales](#6-aptitudes-físicas-y-personales)
7. [Incentivos](#7-incentivos)
8. [Clasificación Final](#8-clasificación-final)

---

## 1. Responsabilidad Profesional y Personal

### 1.1 Indicadores con Multiplicador Estándar

**Fórmula General:**
```
Nota = MAX(-20, datos × multiplicador)
```

| ID | Indicador | Multiplicador | Límite Máximo |
|----|-----------|---------------|---------------|
| 1 | Abandono de servicio sin autorización | -5 | -20 |
| 2 | Acuerdo conciliatorio | -3 | -20 |
| 3 | Acuerdo conciliatorio no cumplido | -5 | -20 |
| 4 | Agresiones a servidores policiales (autor) | -5 | -20 |
| 5 | Aprehensión | -5 | -20 |
| 6 | **Ausencia injustificada** | -5 | **-10** ⚠️ |
| 7 | Consumo de bebidas alcohólicas | -5 | -20 |
| 8 | Contravención de tránsito con vehículo policial asignado | -5 | -20 |
| 10 | Control y cuidado de infraestructura policial | -5 | -20 |
| 11 | Cumplimiento de actividad des en el siipne | -2 | -20 |
| 12 | Detención | -10 | -20 |
| 14 | Impedimento de ejercicio profesional | -5 | -20 |
| 15 | Imposibilidad de acuerdo | -3 | -20 |
| 16 | Imposibilidad de acuerdos documento | -5 | -20 |
| 17 | Incumplimiento de horario de trabajo | -5 | -20 |
| 18 | Manejo responsable de redes sociales | -5 | -20 |
| 19 | Medida cautelar | -10 | -20 |
| 20 | Medida especial administrativa | -5 | -20 |
| 21 | Medidas de protección | -10 | -20 |
| 22 | Permisos | -2 | -20 |
| 23 | Violencia intrafamiliar | -5 | -20 |

**Ejemplos:**
- Si hay 3 ausencias injustificadas: `-5 × 3 = -15` → Límite: **-10**
- Si hay 2 detenciones: `-10 × 2 = -20` → **-20**
- Si hay 5 permisos: `-2 × 5 = -10` → **-10**

---

### 1.2 Indicadores con Fórmulas Especiales

#### 📌 Control y cuidado de equipo en dotación (ID: 9)
**Tipo:** Selector SI/NO

**Fórmula:**
```
SI selecciona "SI" → Nota = 0
SI selecciona "NO" → Nota = -10
```

| Valor | Nota | Descripción |
|-------|------|-------------|
| SI | 0.00 | Cumple con el cuidado del equipo |
| NO | -10.00 | No cumple - Penalización |

⚠️ **Restricción:** Si se selecciona "NO", la opción "SIEMPRE" se oculta en el indicador "Responsabilidad" de Aptitudes Físicas.

---

#### 📌 Días laborados (365-) (ID: 13)
**Fórmula:**
```
Paso 1: resultado_inicial = datos × 0.027
Paso 2: SI resultado_inicial >= 10 → Nota = -10
        SINO → Nota = resultado_inicial × -1
```

**Ejemplos:**
| Días No Laborados | Cálculo Paso 1 | Cálculo Paso 2 | Nota Final |
|-------------------|----------------|----------------|------------|
| 10 | 10 × 0.027 = 0.27 | 0.27 × -1 | -0.27 |
| 100 | 100 × 0.027 = 2.7 | 2.7 × -1 | -2.70 |
| 365 | 365 × 0.027 = 9.855 | 9.855 × -1 | -9.86 |
| 370 | 370 × 0.027 = 9.99 | 9.99 × -1 | -9.99 |
| 400 | 400 × 0.027 = 10.8 | >= 10 | **-10.00** |

---

### 1.3 Total de Responsabilidad
**Fórmula:**
```
Total = ((20 + suma_notas + ABS(20 + suma_notas)) / 2)
```

**Explicación:**
- Esta fórmula garantiza que el total nunca sea negativo
- Si la suma de notas es muy negativa, el total se ajusta automáticamente

**Ejemplos:**
| Suma de Notas | Cálculo | Total |
|---------------|---------|-------|
| -5 | (20 + (-5) + ABS(15)) / 2 = (20 - 5 + 15) / 2 | 15.00 |
| -10 | (20 + (-10) + ABS(10)) / 2 = (20 - 10 + 10) / 2 | 10.00 |
| -20 | (20 + (-20) + ABS(0)) / 2 = (20 - 20 + 0) / 2 | 0.00 |
| -30 | (20 + (-30) + ABS(-10)) / 2 = (20 - 30 + 10) / 2 | 0.00 |

---

## 2. Rendimiento Individual

**Tipo:** Evaluación cualitativa (5 criterios)

### Criterios:
1. Cumple sus tareas con precisión y calidad
2. Conoce los métodos y procedimientos necesarios para el cumplimiento de su servicio
3. Utiliza adecuadamente los recursos asignados para el cumplimiento de sus tareas
4. Cumple las tareas dentro del tiempo establecido
5. Genera ideas o alternativas de resolución de problemas que benefician al servicio

### Puntuaciones por Evaluación:

| Evaluación | Puntuación |
|------------|------------|
| SIEMPRE | 3.00 |
| FRECUENTEMENTE | 2.38 |
| OCASIONALMENTE | 1.75 |
| CASI NUNCA | 1.13 |
| NUNCA | 0.50 |

**Total de Rendimiento Individual:**
```
Total = Suma de puntuaciones de los 5 criterios
Máximo posible: 5 × 3 = 15 puntos
```

---

## 3. Gestión Colectiva

### 3.1 SPR - Gestión de la unidad
**Fórmula:**
```
Nota = (datos × 4) / 20
```

**Ejemplos:**
| Datos | Cálculo | Nota |
|-------|---------|------|
| 5 | (5 × 4) / 20 | 1.00 |
| 10 | (10 × 4) / 20 | 2.00 |
| 15 | (15 × 4) / 20 | 3.00 |
| 20 | (20 × 4) / 20 | 4.00 |

---

### 3.2 SPR - Gestión de la información
**Fórmula:**
```
Nota = (datos × 1) / 20
```

**Ejemplos:**
| Datos | Cálculo | Nota |
|-------|---------|------|
| 5 | (5 × 1) / 20 | 0.25 |
| 10 | (10 × 1) / 20 | 0.50 |
| 15 | (15 × 1) / 20 | 0.75 |
| 20 | (20 × 1) / 20 | 1.00 |

**Total de Gestión Colectiva:**
```
Total = Gestión de la unidad + Gestión de la información
Máximo posible: 4 + 1 = 5 puntos
```

---

## 4. Formación Profesional

### PCIC (Calidad)
**Fórmula:**
```
Nota = (datos × 10) / 20
```

**Ejemplos:**
| Datos PCIC | Cálculo | Nota |
|------------|---------|------|
| 5 | (5 × 10) / 20 | 2.50 |
| 10 | (10 × 10) / 20 | 5.00 |
| 15 | (15 × 10) / 20 | 7.50 |
| 20 | (20 × 10) / 20 | 10.00 |

**Total de Formación Profesional:**
```
Total = Nota PCIC
Máximo posible: 10 puntos
```

---

## 5. Normas Disciplinarias (Conducta Policial)

### 5.1 Amonestación verbal
**Fórmula:**
```
SI datos > 2 → Nota = -2.5
SINO → Nota = -1.25 × datos
```

**Ejemplos:**
| Cantidad | Cálculo | Nota |
|----------|---------|------|
| 1 | -1.25 × 1 | -1.25 |
| 2 | -1.25 × 2 | -2.50 |
| 3 | > 2 | -2.50 |
| 5 | > 2 | -2.50 |

---

### 5.2 Amonestación escrita
**Fórmula:**
```
SI datos > 2 → Nota = -5
SINO → Nota = -2.5 × datos
```

**Ejemplos:**
| Cantidad | Cálculo | Nota |
|----------|---------|------|
| 1 | -2.5 × 1 | -2.50 |
| 2 | -2.5 × 2 | -5.00 |
| 3 | > 2 | -5.00 |
| 5 | > 2 | -5.00 |

---

### 5.3 Sanción pecuniaria menor
**Fórmula:**
```
SI datos >= 2 → Nota = -10
SINO → Nota = -7.5 × datos
```

**Ejemplos:**
| Cantidad | Cálculo | Nota |
|----------|---------|------|
| 1 | -7.5 × 1 | -7.50 |
| 2 | >= 2 | -10.00 |
| 3 | >= 2 | -10.00 |

---

### 5.4 Sanción pecuniaria mayor
**Fórmula:**
```
SI datos > 2 → Nota = -20
SINO → Nota = -12.4 × datos
```

**Ejemplos:**
| Cantidad | Cálculo | Nota |
|----------|---------|------|
| 1 | -12.4 × 1 | -12.40 |
| 2 | -12.4 × 2 | -24.80 |
| 3 | > 2 | -20.00 |
| 5 | > 2 | -20.00 |

---

### 5.5 Suspensión de funciones
**Fórmula:**
```
SI datos >= 2 → Nota = -30
SINO → Nota = -20 × datos
```

**Ejemplos:**
| Cantidad | Cálculo | Nota |
|----------|---------|------|
| 1 | -20 × 1 | -20.00 |
| 2 | >= 2 | -30.00 |
| 3 | >= 2 | -30.00 |

---

### 5.6 Total de Conducta Policial
**Fórmula Compleja en 3 Pasos:**

**Paso 1:** Calcular suma de las 3 primeras sanciones
```
suma_3_primeros = Amonestación verbal + Amonestación escrita + Sanción pecuniaria menor
```

**Paso 2:** Calcular suma de las 2 últimas sanciones
```
suma_2_ultimos = Sanción pecuniaria mayor + Suspensión de funciones
```

**Paso 3:** Aplicar límites
```
resultado_1 = SI suma_3_primeros < -10 → -10 SINO suma_3_primeros
resultado_2 = SI suma_2_ultimos < -20 → -20 SINO suma_2_ultimos
total_intermedio = resultado_1 + resultado_2
```

**Paso 4:** Fórmula final
```
Total Final = ((30 + total_intermedio + ABS(30 + total_intermedio)) / 2)
```

**Ejemplo:**
- Amonestación verbal: 1 → -1.25
- Amonestación escrita: 1 → -2.50
- Sanción pecuniaria menor: 0 → 0.00
- **suma_3_primeros** = -3.75 (no alcanza límite de -10)

- Sanción pecuniaria mayor: 0 → 0.00
- Suspensión de funciones: 0 → 0.00
- **suma_2_ultimos** = 0.00

- **total_intermedio** = -3.75 + 0 = -3.75
- **Total Final** = ((30 + (-3.75) + ABS(26.25)) / 2) = (30 - 3.75 + 26.25) / 2 = **26.25**

---

## 6. Aptitudes Físicas y Personales

### 6.1 Evaluación de Competencias (10 indicadores)

**Indicadores:**
1. Autocontrol
2. Orientación al logro
3. Trabajo en equipo
4. Manejo de recursos materiales
5. **Responsabilidad** ⚠️
6. Dirección de personas
7. Proactividad
8. Identificación de problemas
9. Juicio y toma de decisiones
10. Mediación

**Puntuaciones por Evaluación:**

| Evaluación | Puntuación |
|------------|------------|
| SIEMPRE | 1.00 |
| FRECUENTEMENTE | 0.75 |
| OCASIONALMENTE | 0.50 |
| CASI NUNCA | 0.25 |
| NUNCA | 0.00 |

⚠️ **Restricción Especial para "Responsabilidad":**
- Si "Control y cuidado de equipo en dotación" = "NO"
- La opción "SIEMPRE" NO está disponible
- Solo puede elegir: FRECUENTEMENTE, OCASIONALMENTE, CASI NUNCA, NUNCA

**Total de Competencias:**
```
Total = Suma de las 10 competencias
Máximo posible: 10 × 1 = 10 puntos
```

---

### 6.2 Evaluación Física

**Fórmula:**
```
Puntuación = (evaluación × 10) / 20
```

**Ejemplos:**
| Evaluación | Cálculo | Puntuación |
|------------|---------|------------|
| 5 | (5 × 10) / 20 | 2.50 |
| 10 | (10 × 10) / 20 | 5.00 |
| 15 | (15 × 10) / 20 | 7.50 |
| 20 | (20 × 10) / 20 | 10.00 |

**Total de Aptitudes Físicas:**
```
Total = Total Competencias + Evaluación Física
Máximo posible: 10 + 10 = 20 puntos
```

---

## 7. Incentivos

### 7.1 Actuaciones relevantes
**Paso 1 - Cálculo inicial:**
```
SI cantidad > 9 → resultado = 4
SINO → resultado = cantidad × 0.5
```

**Paso 2 - Límite final:**
```
SI resultado > 2 → puntuación = 2
SINO → puntuación = resultado
```

**Ejemplos:**
| Cantidad | Paso 1 | Paso 2 | Puntuación Final |
|----------|--------|--------|------------------|
| 3 | 3 × 0.5 = 1.5 | 1.5 | 1.50 |
| 5 | 5 × 0.5 = 2.5 | > 2 | 2.00 |
| 10 | > 9 | 4 > 2 | 2.00 |
| 15 | > 9 | 4 > 2 | 2.00 |

---

### 7.2 Condecoraciones
**Paso 1 - Cálculo inicial:**
```
SI cantidad > 5 → resultado = 2
SINO → resultado = cantidad × 1
```

**Paso 2 - Límite final:**
```
SI resultado > 2 → puntuación = 2
SINO → puntuación = resultado
```

**Ejemplos:**
| Cantidad | Paso 1 | Paso 2 | Puntuación Final |
|----------|--------|--------|------------------|
| 1 | 1 × 1 = 1 | 1 | 1.00 |
| 2 | 2 × 1 = 2 | 2 | 2.00 |
| 6 | > 5 | 2 | 2.00 |
| 10 | > 5 | 2 | 2.00 |

---

### 7.3 Felicitaciones
**Paso 1 - Cálculo inicial:**
```
SI cantidad > 5 → resultado = 2
SINO → resultado = cantidad × 0.5
```

**Paso 2 - Límite final:**
```
SI resultado > 2 → puntuación = 2
SINO → puntuación = resultado
```

**Ejemplos:**
| Cantidad | Paso 1 | Paso 2 | Puntuación Final |
|----------|--------|--------|------------------|
| 2 | 2 × 0.5 = 1 | 1 | 1.00 |
| 4 | 4 × 0.5 = 2 | 2 | 2.00 |
| 6 | > 5 | 2 | 2.00 |
| 10 | > 5 | 2 | 2.00 |

---

### 7.4 Territorios priorizados
**Fórmula:**
```
Puntuación = (cantidad × 2) / 365
```

**Ejemplos:**
| Días | Cálculo | Puntuación |
|------|---------|------------|
| 30 | (30 × 2) / 365 | 0.16 |
| 90 | (90 × 2) / 365 | 0.49 |
| 180 | (180 × 2) / 365 | 0.99 |
| 365 | (365 × 2) / 365 | 2.00 |

---

### 7.5 Títulos
**Paso 1 - Cálculo inicial:**
```
SI cantidad > 2 → resultado = 1
SINO → resultado = cantidad × 1
```

**Paso 2 - Límite final:**
```
SI resultado > 2 → puntuación = 1
SINO → puntuación = resultado
```

**Ejemplos:**
| Cantidad | Paso 1 | Puntuación Final |
|----------|--------|------------------|
| 1 | 1 × 1 = 1 | 1.00 |
| 2 | 2 × 1 = 2 | 2.00 (límite) |
| 3 | > 2 | 1.00 |
| 5 | > 2 | 1.00 |

---

### 7.6 Unidades de contingencia fronteriza
**Fórmula:**
```
Puntuación = (cantidad × 1) / 180
```

**Ejemplos:**
| Días | Cálculo | Puntuación |
|------|---------|------------|
| 30 | (30 × 1) / 180 | 0.17 |
| 90 | (90 × 1) / 180 | 0.50 |
| 180 | (180 × 1) / 180 | 1.00 |

---

### 7.7 Unidades de contingencia penitenciaria
**Fórmula:**
```
Puntuación = (cantidad × 1) / 180
```

(Misma lógica que contingencia fronteriza)

---

### 7.8 Zonas de difícil acceso
**Fórmula:**
```
Puntuación = (cantidad × 1) / 365
```

**Ejemplos:**
| Días | Cálculo | Puntuación |
|------|---------|------------|
| 90 | (90 × 1) / 365 | 0.25 |
| 180 | (180 × 1) / 365 | 0.49 |
| 365 | (365 × 1) / 365 | 1.00 |

---

### 7.9 Total de Incentivos (Lógica Compleja)

**Paso 1:** Sumar todas las puntuaciones individuales
```
suma_incentivos = Suma de los 8 incentivos
```

**Paso 2:** Aplicar límite de 4 puntos
```
valor_intermedio = SI suma_incentivos > 4 → 4 SINO suma_incentivos
```

**Paso 3:** Verificar sanciones
```
Total Final = SI hay_sanciones > 0 → 0 SINO valor_intermedio
```

⚠️ **Regla Importante:**
> **Los incentivos se sumarán a la evaluación únicamente si el servidor policial no registra sanciones**

**Ejemplos:**
| Suma Incentivos | Sanciones | Cálculo | Total Final |
|-----------------|-----------|---------|-------------|
| 3.5 | 0 | 3.5 (sin sanciones) | 3.50 |
| 5.0 | 0 | MIN(5, 4) | 4.00 |
| 2.0 | 1 | Tiene sanciones | 0.00 |
| 10.0 | 2 | Tiene sanciones | 0.00 |

---

## 8. Clasificación Final

### 8.1 Cálculo de Totales

**Total de Resultados de Gestión:**
```
Total = Responsabilidad + Rendimiento Individual + Gestión Colectiva
Máximo posible: 20 + 15 + 5 = 40 puntos
```

**Total General:**
```
Total General = Resultados de Gestión + 
                Formación Profesional + 
                Normas Disciplinarias + 
                Aptitudes Físicas + 
                Incentivos

Máximo teórico: 40 + 10 + 30 + 20 + 4 = 104 puntos
```

**Nota Final (Sobre 20 puntos):**
```
Nota Final = Total General × 0.2
```

---

### 8.2 Clasificación por Categorías

| Lista | Rango | Calificación |
|-------|-------|--------------|
| **Lista 1** | 18.0 - 20.0 | Excelente |
| **Lista 2** | 16.0 - 17.99 | Muy bueno |
| **Lista 3** | 14.0 - 15.99 | Bueno |
| **Cuota de Eliminación** | < 14.0 | Por debajo del estándar |

---

## 📌 Notas Importantes

### Restricciones y Validaciones:
1. **Campos vacíos** se tratan como **0**
2. **Límites máximos** se aplican automáticamente
3. **Incentivos** se anulan si hay **cualquier sanción**
4. **Responsabilidad** no puede ser "SIEMPRE" si equipo en dotación = "NO"

### Límites Máximos de Penalización:
- **General:** -20 puntos (mayoría de indicadores)
- **Ausencia injustificada:** -10 puntos ⚠️
- **Días laborados:** -10 puntos
- **3 primeras sanciones:** -10 puntos (límite conjunto)
- **2 últimas sanciones:** -20 puntos (límite conjunto)

### Puntuaciones Máximas por Componente:
- Responsabilidad Profesional: **20 puntos**
- Rendimiento Individual: **15 puntos**
- Gestión Colectiva: **5 puntos**
- Formación Profesional: **10 puntos**
- Conducta Policial: **30 puntos**
- Aptitudes Físicas: **20 puntos**
- Incentivos: **4 puntos** (máximo, sin sanciones)

**TOTAL MÁXIMO:** 104 puntos → **Nota Final: 20.8** (sobre 20)

---

*Documento generado automáticamente - Simulador de Evaluación Policial Nacional del Ecuador*

