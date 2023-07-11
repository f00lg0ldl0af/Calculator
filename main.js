const numberBtns = document.querySelectorAll('[number-input]');
const operatorBtns = document.querySelectorAll('.btn-operator');
/* Attribute selectors for square brackets, see (https://dev.to/giandodev/selecting-an-element-1nd0)*/

const decimalBtn = document.querySelector('#decimalBtn');
const equalBtn = document.querySelector('#equalBtn');

const clearAllBtn = document.querySelector('#clearAllBtn');
const clearEntryBtn = document.querySelector('#clearEntryBtn');

const prevOperationDisplay = document.querySelector('#prevOperationDisplay');
const nowOperationDisplay = document.querySelector('#nowOperationDisplay');


equalBtn.addEventListener('click', evaluate);
clearAllBtn.addEventListener('click', clearAll);
clearEntryBtn.addEventListener('click',clearEntry);


// 5. Create functions that populate the display when I click on number buttons. Store display value in a variable. 
numberBtns.forEach((button) => button.addEventListener('click',() => appendNum(button.textContent)));

function appendNum(num) {
    if(nowOperationDisplay.textContent === '0' || toClearScreen) // Think when else user needs to clear the screen (i) after keying in firstNum and operator, to enter secondNum
    
    // Function to clear screen so user can input new entries
        resetScreen();
    nowOperationDisplay.textContent += num;
}

function resetScreen() {
    nowOperationDisplay.textContent = '';
    toClearScreen = false;
}

function clearAll() {
    nowOperationDisplay.textContent = '0';
    prevOperationDisplay.textContent = '';
    currentOperation = null;
}

function clearEntry() {
    nowOperationDisplay.textContent = nowOperationDisplay.textContent.toString().slice(0,-1);
}

operatorBtns.forEach((button) => button.addEventListener('click', () => appendOperator(button.textContent)));

// 6. Store the number inputs when user presses an operator.
function appendOperator(operator) {
    // nowOperationDisplay.textContent += operator;
    if(currentOperation !== null) evaluate();
    firstNum =  nowOperationDisplay.textContent;
    currentOperation = operator;
    prevOperationDisplay.textContent = `${firstNum} ${currentOperation}`;
    toClearScreen = true; // 
}

// 6. Save which operation has been chosen and operate() on them when '=' is selected.
function evaluate() {
    if (currentOperation === null || toClearScreen) return;
    if (currentOperation === '÷' && nowOperationDisplay.textContent === '0') {
        alert("Unable to divide by 0");
        return;
    }

    secondNum = nowOperationDisplay.textContent;
    nowOperationDisplay.textContent = operate(currentOperation,firstNum,secondNum).toFixed(2);
    prevOperationDisplay.textContent = `${firstNum} ${currentOperation} ${secondNum} = ` ;

    currentOperation = null;

}


// 1. Functions for basic math operators
function add(a,b) {
    return a + b;
}

function subtract(a,b) {
    return a - b;
}

function multiply(a,b) {
    return a * b;
}

function divide(a,b) {
    return a / b;
}

// 2. Create Variables for first number, operator and second number
let a;
let b;
let operator;

// 3. Create Function operate that calls above functions on the numbers
function operate(operator,a,b) {
    switch(operator) {
        case '+':   
            return add(a,b);    
        case '-':         
            return subtract(a,b);    
        case 'x':   
            return multiply(a,b);    
        case '÷':
            if (b === 0) return null;               
            return divide(a,b);
        default:
            return null;    
    }

}