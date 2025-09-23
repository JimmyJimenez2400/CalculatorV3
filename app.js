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

let entries = []; // where we save our number1, operator, number2
let justEvaluated = false; //this is our route decider, checks to see if we evaluated the operation or not

/*
  The function below will populate the screen, it will call addingToEntries, which will update the 'entries' variable.

  In which, we will update the "display" text content by grouping together the entries
*/
function populateDisplay(e) {
  addingToEntries(e);
  console.log(entries);
  display.textContent = entries.join(' ');
}

/*
 The function below will do the following in order:
 1. create variables buttonTextvalue, and lastEntry
  a. buttonTextValue will save the values of the buttons pressed
  b. lastEntry will save the last element in the array

 2. first if statement, will check if we've already evaluated the expression AND checks if ourButtontextValue is a number OR a decimal

 3. second If statement, checks if the value is a number or a decimal, this is before evaulation occurs
  a. 
*/
function addingToEntries(e) {
  let buttonTextValue = e.target.textContent;
  let lastEntry = entries[entries.length - 1];

  if (justEvaluated && (!isNaN(buttonTextValue) || buttonTextValue === '.')) {
    entries = [];
    justEvaluated = false;
  }

  if (!isNaN(buttonTextValue) || buttonTextValue === '.') {
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
    justEvaluated = false;
    // we check if it's entries is empty, we do nothing because we don't want an operator to be the first in the entry

    //else if,  will check to see if last entry is a number, we can add an operator if pressed.
    if (entries.length === 0) {
      //do nothing
      console.log('Please choose a digit first');
      return 'Please choose a digit first';
    }

    if (entries.length === 3) {
      let result = evaluateResult();
      entries = [result.toString()];
    }

    if (!['+', '-', '/', '*'].includes(lastEntry)) {
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
const clearButton = document.querySelector('.clear');

display.textContent = '0';

allKeyPad.forEach((button) => {
  button.addEventListener('click', populateDisplay);
});

equalButton.addEventListener('click', () => {
  const result = evaluateResult();
  if (result !== null) {
    display.textContent = result;
    justEvaluated = true;
  }
});

clearButton.addEventListener('click', clear);

//
function evaluateResult() {
  if (entries.length < 3) {
    console.log('Please enter a complete expression before pressing =');
    return;
  }

  let first_input = parseFloat(entries[0]);
  let operator = entries[1];
  let second_input = parseFloat(entries[2]);

  // When we conduct operate, we will need the result, in which it will replace the first_input, from there, we will remove the entries for entries[1] and entries[2]
  if (operator === '/' && second_input === 0) {
    display.textContent = "Don't divide by 0 bro";

    setTimeout(() => {
      display.textContent = entries.join('');
    }, 2000);
    entries.splice(2, 1);
    return null;
  }

  let result = operate(first_input, operator, second_input);

  first_input = result;
  entries[0] = first_input.toString();

  entries.splice(1, 2);

  console.log(result);

  //format result, rounding answers
  result = Math.round(result * 1000) / 1000;

  return result;
}

function clear() {
  entries = [];
  display.textContent = '';
  justEvaluated = false;
}
