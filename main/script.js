let firstOperand = '';
let operator = '';
let secondOperand = '';
let result = '';
let decimalAdded = false;
let currentCalculation = ''; // Variable to store the current calculation string

const display = document.getElementById('display');

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) {
    return 'Error: Division by zero';
  }
  return a / b;
}

function operate(operator, a, b) {
  const num1 = parseFloat(a);
  const num2 = parseFloat(b);

  switch (operator) {
    case '+':
      return add(num1, num2);
    case '-':
      return subtract(num1, num2);
    case '*':
      return multiply(num1, num2);
    case '/':
      return divide(num1, num2);
    default:
      return 'Error';
  }
}

function updateDisplay(value) {
  display.textContent = value;
}

function clear() {
  firstOperand = '';
  operator = '';
  secondOperand = '';
  result = '';
  decimalAdded = false;
  currentCalculation = ''; // Clear current calculation string
  updateDisplay('0');
}

function handleNumberClick(e) {
  const number = e.target.textContent;

  if (operator === '') {
    firstOperand += number;
  } else {
    secondOperand += number;
  }
  currentCalculation += number;
  updateDisplay(currentCalculation);
}

function handleOperatorClick(e) {
  if (firstOperand !== '' && secondOperand !== '') {
    calculate();
  }

  operator = e.target.textContent;
  currentCalculation += ` ${operator} `;
  updateDisplay(currentCalculation);
  decimalAdded = false;
}

function calculate() {
  if (secondOperand === '') {
    secondOperand = firstOperand;
  }

  result = operate(operator, firstOperand, secondOperand);
  currentCalculation += ` = ${result}`;
  updateDisplay(currentCalculation);

  firstOperand = result.toString();
  secondOperand = '';
}

function handleEqualsClick() {
  if (firstOperand === '' || operator === '' || secondOperand === '') {
    return;
  }

  calculate();
  operator = '';
}

function handleClearClick() {
  clear();
}

function handleDecimalClick() {
  if (!decimalAdded) {
    if (operator === '') {
      firstOperand += '.';
      currentCalculation += '.';
      updateDisplay(currentCalculation);
    } else {
      secondOperand += '.';
      currentCalculation += '.';
      updateDisplay(currentCalculation);
    }
    decimalAdded = true;
  }
}

function handleBackspaceClick() {
  if (operator === '') {
    firstOperand = firstOperand.slice(0, -1);
    currentCalculation = currentCalculation.slice(0, -1);
    updateDisplay(currentCalculation);
  } else {
    secondOperand = secondOperand.slice(0, -1);
    currentCalculation = currentCalculation.slice(0, -1);
    updateDisplay(currentCalculation);
  }
}

// Event listeners for number buttons
const numberButtons = document.querySelectorAll('.number');
numberButtons.forEach(button => {
  button.addEventListener('click', handleNumberClick);
});

// Event listeners for operator buttons
const operatorButtons = document.querySelectorAll('.operator');
operatorButtons.forEach(button => {
  button.addEventListener('click', handleOperatorClick);
});

// Event listener for equals button
const equalsButton = document.getElementById('equals');
equalsButton.addEventListener('click', handleEqualsClick);

// Event listener for clear button
const clearButton = document.getElementById('clear');
clearButton.addEventListener('click', handleClearClick);

// Event listener for decimal button
const decimalButton = document.getElementById('decimal');
decimalButton.addEventListener('click', handleDecimalClick);

// Event listener for backspace button
const backspaceButton = document.getElementById('backspace');
backspaceButton.addEventListener('click', handleBackspaceClick);

// Keyboard support
document.addEventListener('keydown', e => {
  const key = e.key;

  if (/\d/.test(key)) {
    handleNumberClick({ target: { textContent: key } });
  } else if (key === '+' || key === '-' || key === '*' || key === '/') {
    handleOperatorClick({ target: { textContent: key } });
  } else if (key === 'Enter' || key === '=') {
    handleEqualsClick();
  } else if (key === '.') {
    handleDecimalClick();
  } else if (key === 'Backspace') {
    handleBackspaceClick();
  }
});

// Initialize display
updateDisplay('0');
