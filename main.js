const numberBtns = document.querySelectorAll('[number-input]');
const operatorBtns = document.querySelectorAll('.btn-operator');
const equalBtn = document.querySelector('#equalBtn');
const clearAllBtn = document.querySelector('#clearAllBtn');
const clearEntryBtn = document.querySelector('#clearEntryBtn');
const decimalBtn = document.querySelector('#decimalBtn');

const prevOperationDisplay = document.querySelector('#prevOperationDisplay');
const nowOperationDisplay = document.querySelector('#nowOperationDisplay');


equalBtn.addEventListener('click', evaluate);
clearAllBtn.addEventListener('click', clearAll);
function clearAll() {
    nowOperationDisplay.textContent = '0';
    prevOperationDisplay.textContent = '';
    currentOperation = null;
}

clearEntryBtn.addEventListener('click',clearEntry);
function clearEntry() {
    nowOperationDisplay.textContent = nowOperationDisplay.textContent.toString().slice(0,-1);
}
decimalBtn.addEventListener('click', addPoint);
function addPoint() {
    // After operator is keyed into calculator, keying decimal pt should display "0."
    if (toClearScreen)
    {
        resetScreen();
    }

    if (nowOperationDisplay === '')
    {
        nowOperationDisplay.textContent == '0';
    }
    // .. is not valid entry 
    if (nowOperationDisplay.textContent.includes('.'))
    {
        return;
    }
    nowOperationDisplay.textContent += '.';
}

// Populate calculate display with user input 
numberBtns.forEach((button) => button.addEventListener('click',() => appendNum(button.textContent)));

function appendNum(num) {
    if(nowOperationDisplay.textContent === '0' || toClearScreen) 
    {
        resetScreen();
    }
    nowOperationDisplay.textContent += num;
}

function resetScreen() {
    nowOperationDisplay.textContent = '';
    toClearScreen = false;
}

operatorBtns.forEach((button) => button.addEventListener('click', () => appendOperator(button.textContent)));

function appendOperator(operator) {
    if(currentOperation !== null) 
    {
        evaluate(); 
    }
    firstNum =  nowOperationDisplay.textContent;
    currentOperation = operator;
    prevOperationDisplay.textContent = `${firstNum} ${currentOperation}`;
    toClearScreen = true;
}

// Calculator can only evaluate with at least 1 operator
function evaluate() {
    if (currentOperation === null || toClearScreen) return;
    if (currentOperation === '÷' && nowOperationDisplay.textContent === '0') 
    {
        alert("Unable to divide by 0");
        return;
    }
    secondNum = nowOperationDisplay.textContent;
    nowOperationDisplay.textContent = operate(currentOperation,firstNum,secondNum).toFixed(2);
    prevOperationDisplay.textContent = `${firstNum} ${currentOperation} ${secondNum} = ` ;
    currentOperation = null;
}

function operate(operator,a,b) {
    a = Number(a);
    b = Number(b);
    switch(operator) {
        case '+':   
            return add (a,b);    
        case '-':         
            return subtract (a,b);    
        case 'x':   
            return multiply (a,b);    
        case '÷':
            if (b === 0) return null;               
            return divide(a,b);
        default:
            return null;    
    }
}

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