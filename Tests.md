

---

# 📘 Documentación de Pruebas para la Clase `Calculator`

Este documento resume los **tres tipos de pruebas** implementadas en el archivo `calculator.js` para asegurar la **funcionalidad**, **robustez** y **eficiencia** de la lógica de la calculadora.

---

## 🧩 1. Prueba Unitaria (Unit Test)

### 🎯 **Objetivo**

Verificar que una función atómica (sin dependencias de estado) produce el resultado correcto bajo diferentes entradas.

### 🧠 **Función Probada:** `Calculator.add(a, b)`

| Escenario             | Descripción                                                | Ejemplo           |
| --------------------- | ---------------------------------------------------------- | ----------------- |
| **Suma Básica**       | Confirma que la suma de dos enteros positivos es correcta. | `5 + 3 = 8`       |
| **Números Negativos** | Confirma la operación con números negativos.               | `-1 + 10 = 9`     |
| **Números Decimales** | Verifica la precisión de la suma con valores flotantes.    | `1.5 + 2.5 = 4.0` |
| **Suma a Cero**       | Confirma la identidad de la suma.                          | `0 + 7 = 7`       |

### ⚙️ **Implementación**

El caso de prueba `testAdd()` invoca el método estático `add()` con valores predefinidos y utiliza una función de aserción (`assertEqual`) para comparar el resultado obtenido con el resultado esperado.

```javascript
function testAdd() {
    assertEqual(Calculator.add(5, 3), 8);
    assertEqual(Calculator.add(-1, 10), 9);
    assertEqual(Calculator.add(1.5, 2.5), 4.0);
    assertEqual(Calculator.add(0, 7), 7);
}
```

---

## 🔗 2. Prueba de Integración (Integration Test)

### 🎯 **Objetivo**

Verificar que la **secuencia de operaciones complejas** y la **gestión del estado interno** (`previousOperand`, `currentOperand`, `operation`) funcionan correctamente al encadenar múltiples cálculos.

### 🧩 **Escenario Principal:** Operaciones Encadenadas Secuenciales

| Secuencia de Pasos | Lógica Probada                         | Resultado Intermedio Esperado | Resultado Final Esperado |
| ------------------ | -------------------------------------- | ----------------------------- | ------------------------ |
| `2 * 3 + 4 =`      | Evaluación secuencial (no jerárquica). | `(2 * 3) = 6` (al pulsar `+`) | `6 + 4 = 10`             |
| `10 / 2 - 1 + 6 =` | Manejo de 3 operaciones consecutivas.  | `4` (después de `- 1`)        | `10`                     |

### ⚙️ **Implementación**

El caso de prueba `testChainedOperations_Revised()` **simula la interacción del usuario**, llamando a los métodos de instancia (`appendNumber`, `chooseOperation`, `compute`) en el mismo orden que los botones de la calculadora.
Se verifica que la calculadora mantenga **la coherencia del estado** y que el resultado final sea el esperado.

```javascript
function testChainedOperations_Revised() {
    const calc = new Calculator();
    calc.appendNumber(2);
    calc.chooseOperation('*');
    calc.appendNumber(3);
    calc.chooseOperation('+');
    calc.appendNumber(4);
    calc.compute();
    assertEqual(calc.currentOperand, '10');
}
```

---

## ⚡ 3. Prueba de Rendimiento (Performance / Stress Test)

### 🎯 **Objetivo**

Medir la **eficiencia y velocidad de ejecución** del método central `compute()` bajo una carga de trabajo extrema.

### 🧪 **Método**

Se utiliza un bucle que ejecuta una operación completa (`10 + 5 = 15`) **100,000 veces**, evaluando el rendimiento con las herramientas nativas del navegador.

```javascript
console.time("PerformanceTest");
for (let i = 0; i < 100000; i++) {
    const calc = new Calculator();
    calc.appendNumber(10);
    calc.chooseOperation('+');
    calc.appendNumber(5);
    calc.compute();
}
console.timeEnd("PerformanceTest");
```

### 📊 **Métrica**

Se emplean `console.time()` y `console.timeEnd()` para medir el **Tiempo Total de Ejecución**.

### ✅ **Resultados Esperados**

El tiempo total de ejecución debe ser **mínimo**, normalmente **menor a 50–100 milisegundos**, confirmando que el método `compute()`:

* No introduce cuellos de botella de rendimiento.
* Es adecuado para **entornos de producción**.

---

