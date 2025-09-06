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
      add(a, b);
      break;
    case '-':
      subtract(a, b);
      break;
    case '*':
      multiply(a, b);
      break;
    case '/':
      divide(a, b);
      break;
    default:
      console.log('Not available');
  }
}

let first_input;
let operator;
let second_input;

let displayValue = '';

function populateDisplay(e) {
  let buttonText = e.target.textContent;
  console.log(buttonText);

  displayValue += buttonText;
  //now we'll update the display's element with 'display'
  display.textContent = displayValue;
}

//DOM STUFF BELOW
const display = document.querySelector('.display');
const keyPadsForNumbers = document.querySelectorAll('.number');

keyPadsForNumbers.forEach((button) => {
  button.addEventListener('click', populateDisplay);
});
