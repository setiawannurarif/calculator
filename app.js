const screen = document.querySelector('.screen');
const screenCalculator = document.getElementById('screenCalculator');
const screenResult = document.getElementById('screenCalculatorResult');
const screenHistory = document.getElementById('history__container');
const screenBtnCalc = document.getElementById('screenBtnCalc');
const navbar = document.getElementById('navbar_container');

const btn__history = document.getElementById('btn__history');
const btn__toggleScreen = document.getElementById('btn__toggleScreen');
const btn__backspace = document.getElementById('btn__backspace');

const btn_displayNumber = document.getElementById('btn__left');
const numbers = document.querySelectorAll('.numbers');
const decimal = document.querySelector('.decimal');
const operators = document.querySelectorAll('.operators');
const allClear = document.querySelector('.all_clear');
const plusMinus_sign = document.querySelector('.plusMinus_sign');
const brackets = document.querySelector('.brackets');
const equal_sign = document.querySelector('.equal_sign');
const clearHistory = document.getElementById('clear__history');
const clearHistoryText = document.getElementById('clear__historyText');
const percentage = document.querySelector('.percentage');
const pow = document.querySelector('.pow');

btn__history.addEventListener('click', () => {
  btn_displayNumber.classList.toggle('disabled');
  screenHistory.classList.toggle('disabled');
});

if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
  document.documentElement.setAttribute('data-theme', 'dark');
}

btn__toggleScreen.addEventListener('click', () => {
  let isToggleLight = document.documentElement.getAttribute('data-theme') === 'light';
  if (isToggleLight) return document.documentElement.setAttribute('data-theme', 'dark');
  return document.documentElement.setAttribute('data-theme', 'light');
});

let currentNumber = '';
let prevNumber = '';
let operationOperator = '';
let result = '0';
screenCalculator.value = '';

function updateScreen(number) {
  screenCalculator.value += number;
}

function updateScreenResult(number) {
  screenResult.value = number;
}

//* bug
numbers.forEach((number) => {
  number.addEventListener('click', (e) => {
    result = '0';
    updateScreenResult(result);
    inputNumber(e.target.value);
    updateScreen(e.target.value);
  });
});

function inputNumber(number) {
  if (currentNumber === '0') {
    currentNumber = number;
  } else {
    currentNumber += number;
  }
}

operators.forEach((operators) => {
  operators.addEventListener('click', (e) => {
    inputOperators(e.target.value);
    updateScreen(operationOperator);
  });
});

equal_sign.addEventListener('click', () => {
  calculate();
  updateScreenResult(result);
  const history = {
    firstNumber: prevNumber,
    secondNumber: currentNumber,
    operator: operationOperator,
    result: result,
  };
  putHistory(history);
  renderHistory();
  showBtnClearHistory();
  operationOperator = '';
  currentNumber = '';
  screenCalculator.value = '';
});

plusMinus_sign.addEventListener('click', () => {
  if (currentNumber < 0) {
    currentNumber = currentNumber * 1;
  } else {
    currentNumber = currentNumber * -1;
  }
  screenCalculator.value = '';
  updateScreen(currentNumber);
});

decimal.addEventListener('click', (event) => {
  inputDecimal(event.target.value);
  updateScreen(event.target.value);
});

percentage.addEventListener('click', () => {
  resultPercentage = parseInt(currentNumber) / 100;
  if (!prevNumber) {
    updateScreenResult(resultPercentage);
    screenCalculator.value = '';
  } else {
    screenCalculator.value = screenCalculator.value.slice(0, -2);
    updateScreen(resultPercentage);
    currentNumber = resultPercentage;
  }
});

pow.addEventListener('click', () => {
  result = Math.pow(currentNumber, 2);
  screenCalculator.value = '';
  updateScreenResult(result);
});

clearHistory.addEventListener('click', () => {
  deleteHistory();
  renderHistory();
  showBtnClearHistory();
});

function clearAll() {
  currentNumber = '';
  prevNumber = '';
  operationOperator = '';
  result = '0';
  screenCalculator.value = '';
}

allClear.addEventListener('click', () => {
  clearAll();
  updateScreen(currentNumber);
  updateScreenResult(result);
});

//* bug
btn__backspace.addEventListener('click', () => {
  currentNumber = currentNumber.slice(0, -1);
  screenCalculator.value = '';
  updateScreen(currentNumber);
});

function inputOperators(operator) {
  if (operationOperator === '') {
    prevNumber = currentNumber;
  }
  operationOperator = operator;
  currentNumber = '';
}

function inputDecimal(dot) {
  if (currentNumber.includes('.')) {
    return;
  }
  currentNumber += dot;
}

function calculate() {
  result = '';
  switch (operationOperator) {
    case '+':
      resultCalc = parseFloat(prevNumber) + parseFloat(currentNumber);
      break;
    case '-':
      resultCalc = parseInt(prevNumber) - parseInt(currentNumber);
      break;
    case '*':
      resultCalc = prevNumber * currentNumber;
      break;
    case '/':
      resultCalc = prevNumber / currentNumber;
      break;
    default:
      break;
  }
  result = resultCalc;
}
