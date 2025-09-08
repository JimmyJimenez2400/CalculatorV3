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
  return a / b;
}

function operate(a, operator, b) {
  // this will grab the input for
  switch (operator) {
    case '+':
      return add(a, b);
    case '-':
      return subtract(a, b);
    case '*':
      return multiply(a, b);
    case '/':
      return divide(a, b);
    default:
      console.log('Not available');
  }
}

let entries = [];

function populateDisplay(e) {
  addingToEntries(e);
  console.log(entries);
  display.textContent = entries.join(' ');
}

function addingToEntries(e) {
  let buttonTextValue = e.target.textContent;
  let lastEntry = entries[entries.length - 1];

  // we check to see if it's a number or decimal, if it is, we continue
  if (!isNaN(buttonTextValue) || buttonTextValue === '.') {
    //We're going to check if entries is empty, if yes, we will push our first number to the entries. IF NOT, we will append to the latest element
    if (entries.length === 0) {
      entries.push(buttonTextValue);
    } else if (!isNaN(lastEntry) || lastEntry.includes('.')) {
      entries[entries.length - 1] += buttonTextValue;
    } else {
      //if it's anything else such as an operator, we add it
      entries.push(buttonTextValue);
    }
  } else if (['+', '-', '/', '*'].includes(buttonTextValue)) {
    console.log('OPERATOR PRESSED', buttonTextValue);
    // we check if it's entries is empty, we do nothing because we don't want an operator to be the first in the entry

    //else if,  will check to see if last entry is a number, we can add an operator if pressed.
    if (entries.length === 0) {
      //do nothing
      console.log('Please choose a digit first');
      return 'Please choose a digit first';
    } else if (!['+', '-', '/', '*'].includes(lastEntry)) {
      entries.push(buttonTextValue);
    } else {
      entries[entries.length - 1] = buttonTextValue;
    }
  }
}

//DOM STUFF BELOW
const display = document.querySelector('.display');
const allKeyPad = document.querySelectorAll('.keypad');
const equalButton = document.querySelector('.equal');

allKeyPad.forEach((button) => {
  button.addEventListener('click', populateDisplay);
});

equalButton.addEventListener('click', () => {
  console.log('IM BEING PRESSED');
  first_input = evaluateResult();
});

//
function evaluateResult() {
  let first_input;
  let operator;
  let second_input;
}
