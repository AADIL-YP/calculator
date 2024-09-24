const display = document.getElementById("display");

let currentInput = '';
let operator = null;
let previousInput = '';

document.querySelectorAll('.button, .equals').forEach(button => {
    button.addEventListener('click', () => {
        const value = button.getAttribute('data-value');

        if (button.id === 'clear') {
            clearDisplay();
            return;
        }

        if (value === '=') {
            calculateResult();
            return;
        }

        if (button.classList.contains('operator')) {
            handleOperator(value);
            return;
        }

        if (value === '.' && currentInput.includes('.')) {
            return;
        }

        currentInput += value;
        display.value = currentInput;
    });
});

function handleOperator(selectedOperator) {
    if (currentInput === '') return;

    if (previousInput && operator) {
        calculateResult();
    }

    operator = selectedOperator;
    previousInput = currentInput;
    currentInput = '';
}

function clearDisplay() {
    currentInput = '';
    previousInput = '';
    operator = null;
    display.value = '';
}

function calculateResult() {
    if (!previousInput || !currentInput || !operator) return;

    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);

    let result = 0;

    switch (operator) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
        case '×':
            result = prev * current;
            break;
        case '/':
        case '÷':
            result = current === 0 ? 'Error' : prev / current;
            break;
        default:
            return;
    }

    display.value = result;
    currentInput = result.toString();
    previousInput = '';
    operator = null;
}