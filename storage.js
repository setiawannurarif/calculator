const CACHE_KEY = 'calculation_history';

function checkForStorage() {
  return typeof Storage !== 'undefined';
}

function putHistory(data) {
  if (checkForStorage()) {
    let historyData = null;
    if (localStorage.getItem(CACHE_KEY) === null) {
      historyData = [];
    } else {
      historyData = JSON.parse(localStorage.getItem(CACHE_KEY));
    }
    historyData.unshift(data);
    if (historyData.length > 5) {
      historyData.pop();
    }
    localStorage.setItem(CACHE_KEY, JSON.stringify(historyData));
  }
}

function showHistory() {
  if (checkForStorage) {
    return JSON.parse(localStorage.getItem(CACHE_KEY)) || [];
  } else {
    return [];
  }
}

function renderHistory() {
  const historyData = showHistory().reverse();
  let historyScreen = document.getElementById('history__screen');
  historyScreen.innerHTML = '';

  for (let history of historyData) {
    let row = document.createElement('div');
    row.className = 'history_screen';
    let calculations = history.firstNumber + history.operator + history.secondNumber;
    let result = history.result;
    row.innerHTML = '<h3>' + calculations + '</h3>';
    row.innerHTML += '<h2>= ' + result + '</h2>';
    historyScreen.appendChild(row);
  }
}

renderHistory();
showBtnClearHistory();

function deleteHistory() {
  localStorage.removeItem(CACHE_KEY);
}

function showBtnClearHistory() {
  if (localStorage.getItem(CACHE_KEY) === null) {
    clearHistory.classList.add('disabled');
    clearHistoryText.classList.remove('disabled');
  } else {
    clearHistory.classList.remove('disabled');
    clearHistoryText.classList.add('disabled');
  }
}
