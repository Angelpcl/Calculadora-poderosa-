class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }

    clear() {
        this.currentOperand = '0';
        this.previousOperand = '';
        this.operation = undefined;
    }

    delete() {
        if (this.currentOperand === 'Error' || this.currentOperand === '0') return;
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
        if (this.currentOperand === '') this.currentOperand = '0';
    }

    appendNumber(number) {
        if (this.currentOperand === 'Error') {
            this.currentOperand = ''; 
        }
        if (number === '.' && this.currentOperand.includes('.')) return;
        if (this.currentOperand === '0' && number !== '.') {
            this.currentOperand = number.toString();
        } else {
            this.currentOperand = this.currentOperand.toString() + number.toString();
        }
    }

    chooseOperation(operation) {
        if (this.currentOperand === '0' && this.previousOperand === '') return;
        if (this.previousOperand !== '') {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    // Método a probar unitariamente (Suma Pura)
    static add(a, b) {
        return a + b;
    }

    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);

        if (isNaN(prev) || isNaN(current)) return;

        switch (this.operation) {
            case '+':
                computation = Calculator.add(prev, current);
                break;
            case '-':
                computation = prev - current;
                break;
            case '*':
                computation = prev * current;
                break;
            case '/':
                if (current === 0) {
                    computation = 'Error';
                } else {
                    computation = prev / current;
                }
                break;
            default:
                return;
        }
        
        if (computation === 'Error') {
            this.currentOperand = 'Error';
        } else {
            this.currentOperand = computation.toString();
        }
        
        this.operation = undefined;
        this.previousOperand = '';
    }

    updateDisplay() {
        this.currentOperandTextElement.innerText = this.currentOperand;
        this.previousOperandTextElement.innerText = this.previousOperand + (this.operation || '');
    }
}

// --- Conexión y Eventos del DOM ---
const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperandTextElement = document.getElementById('previous-operand');
const currentOperandTextElement = document.getElementById('current-operand');

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    });
});

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    });
});

equalsButton.addEventListener('click', () => {
    calculator.compute();
    calculator.updateDisplay();
});

allClearButton.addEventListener('click', () => {
    calculator.clear();
    calculator.updateDisplay();
});

deleteButton.addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
});


calculator.updateDisplay();


// ------------------------------------------------------------------
// --- Prueba Unitaria para el método estático 'add' (Suma Pura) ---
// ------------------------------------------------------------------
function testAdd() {
    console.log('--- Iniciando Prueba Unitaria: Calculator.add ---');
    let passed = true;
    
    /**
     * Función de aserción simple
     * @param {number} actual El resultado obtenido.
     * @param {number} expected El resultado esperado.
     * @param {string} testName Nombre o descripción del caso de prueba.
     */
    function assertEqual(actual, expected, testName) {
        if (actual === expected) {
            console.log(`✅ ${testName}: Éxito. Esperado: ${expected}, Obtenido: ${actual}`);
        } else {
            console.error(`❌ ${testName}: Falló. Esperado: ${expected}, Obtenido: ${actual}`);
            passed = false;
        }
    }

    // Caso de prueba 1: Números enteros positivos
    assertEqual(Calculator.add(5, 3), 8, "Test 1 (5 + 3)");

    // Caso de prueba 2: Números negativos y positivos
    assertEqual(Calculator.add(-1, 10), 9, "Test 2 (-1 + 10)");

    // Caso de prueba 3: Números decimales
    assertEqual(Calculator.add(1.5, 2.5), 4.0, "Test 3 (1.5 + 2.5)");

    // Caso de prueba 4: Suma a cero
    assertEqual(Calculator.add(0, 7), 7, "Test 4 (0 + 7)");


    if (passed) {
        console.log('\n✨ Todas las pruebas unitarias para Calculator.add pasaron exitosamente. ✨');
    } else {
        console.log('\n🚨 Fallaron una o más pruebas unitarias para Calculator.add. 🚨');
    }
    console.log('------------------------------------------------------------------');
}

// Ejecutar las pruebas unitarias
testAdd();
