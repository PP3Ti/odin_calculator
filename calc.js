let firstNumArr = [];         // numbers are stored in an array
let operator;              // a function will be assigned to it
let secondNumArr = [];
let currentInput = 0;   // 0 == first number of operation, 1 == second number of op
let smallDisplayValue = '';     // values to update the display
let mainDisplayValue = '';
let operationDisplay = '';   // show correct operation sign
let operationCount = 0;     // use to decide if needs to calculate on operation click or not
let maxNumberLength = 15;
const numbers = document.querySelectorAll(".number");           // variables for the elements on the website
const operators = document.querySelectorAll(".operator");
const clearButton = document.getElementById("buttonClear");
const mainDisplay = document.getElementById("mainDisplay");
const smallDisplay = document.getElementById("smallDisplay");
const calculateButton = document.getElementById("buttonCalculate");

function disableNumbers (){     // functions to enable and disable buttons on demand
    numbers.forEach(e => {
        e.disabled = true;
    });
}
function enableNumbers(){
    numbers.forEach(e => {
        e.disabled = false;
    });
}
function disableCalculate(){
    calculateButton.disabled = true;
}
function enableCalculate(){
    calculateButton.disabled = false;
}
function disableOperators(){
    operators.forEach(element => {
        element.disabled = true;
    });  
}
function enableOperators(){
operators.forEach(element => {
    element.disabled = false;
});
}
function getNumber(e){     // when a number button is clicked
    if (firstNumArr.length == maxNumberLength || secondNumArr.length == maxNumberLength){       // disable numbers if input is too long
        disableNumbers();
        maxNumberLength++;
        console.log("number too long")
    } else {  // default behavior
        if ((firstNumArr[0] == "0" && currentInput == 0) || (secondNumArr[0] == "0" && currentInput == 1)){     // disable numbers if input is 0
            disableNumbers();
            return
        }
        switch(currentInput){           // add clicked number to the correct array and update display values
            case 0 : firstNumArr.push(e.target.textContent); 
                    mainDisplayValue = `${firstNumArr.toString().replace(/,/g,'')}`;
                    updateDisplay();
                    break
            case 1 : secondNumArr.push(e.target.textContent); 
                    mainDisplayValue = `${secondNumArr.toString().replace(/,/g,'')}`
                    smallDisplayValue = `${firstNumArr.toString().replace(/,/g,'')}` + ` ${operationDisplay}`
                    updateDisplay();
                    break
        }
        if (firstNumArr.length >= 0) {       // enable operators if first number is typed
            enableOperators();
            console.log("operations enabled");
        }
        if (firstNumArr.length > 0 && secondNumArr.length > 0) {  // enable calculate button if both numbers are typed in
            enableCalculate();
        }
    }
}
function swapInput(){   // simple switch for main and small display
    currentInput == 0 ? currentInput = 1 : currentInput = 0; 
}
function add(a, b) {  // simple maths functions
    return a + b
}
function subtract(a, b){
    return a - b
}
function multiply(a, b){
    return a * b
}
function divide(a, b){
    return a / b
}
function updateDisplay(){ //  show display values on the website
    mainDisplay.textContent = `${mainDisplayValue}`;
    smallDisplay.textContent = `${smallDisplayValue}`;
}
function clear(){          // reset variable values, disable unnecessary
    mainDisplayValue = '';
    smallDisplayValue = '';
    operationDisplay = '';
    currentInput = 0;
    operationCount = 0;
    firstNumArr = [];
    secondNumArr = [];
    operator = null;
    disableOperators();
    updateDisplay();
    console.log("cleared");
    enableNumbers();
    maxNumberLength = 15;
    disableCalculate();
    console.log("numbers enabled, operators disabled, calculate button disabled on clear");
}
function getOperation(e){   // on any operation button clicked
    updateDisplay();  
    if (operator != null && secondNumArr.length == 0 ) {            // in case there's no operator yet 
        switch(e.target.textContent){  // choose correct operation
            case "X" : operator = multiply; operationDisplay = "x"; break 
            case "÷" : operator = divide; operationDisplay = "÷"; break 
            case "+" : operator = add; operationDisplay = "+"; break 
            case "-" : operator = subtract; operationDisplay = "-"; break 
        } 
        disableOperators();
        console.log("operations disabled" + operator);
        return
    } 
    if (operationCount == 0) {       // on first calculation
        swapInput();    // swap to second input
        switch(e.target.textContent){  // choose correct operation
            case "X" : operator = multiply; operationDisplay = "x"; break 
            case "÷" : operator = divide; operationDisplay = "÷"; break 
            case "+" : operator = add; operationDisplay = "+"; break 
            case "-" : operator = subtract; operationDisplay = "-"; break 
        }
        operationCount++;
        console.log("opcount conditional ran")
    } else {        // subsequent calcs
        calculate();                            // do a calculation, THEN choose operator for next calc
        console.log("operator calculated");
        swapInput();                                                
        switch(e.target.textContent){  // choose correct operation
            case "X" : operator = multiply; operationDisplay = "x"; break 
            case "÷" : operator = divide; operationDisplay = "÷"; break 
            case "+" : operator = add; operationDisplay = "+"; break 
            case "-" : operator = subtract; operationDisplay = "-"; break 
        }
    }
    disableOperators();
    enableNumbers();
    disableCalculate();
    console.log('operations disabled' + " numbers enabled" + " calculate button disabled");
    console.log(firstNumArr, secondNumArr, currentInput, operator, operationCount)
}
function calculate(){                     
    a = Number(firstNumArr.toString().replace(/,/g,'')).toFixed(2);        // convert arrays to numbers
    b = Number(secondNumArr.toString().replace(/,/g,'')).toFixed(2);
    if (b == 0 && operator == divide) {  // 0 division failsafe
        clear();
        return
    } else {    // default behavior
        console.log("calculated",firstNumArr, secondNumArr, currentInput, operator)  
        let result = operator(a, b);     //quick maths
        mainDisplayValue = result.toFixed(2);     // set display values
        smallDisplayValue = '';
        updateDisplay();
        currentInput = 0;
        firstNumArr = Array.from(result.toString().replace(/,/g,''));   // prepare for net calc
        secondNumArr = [];
        operationCount++;
        maxNumberLength = 15;
    }
    disableCalculate();
    console.log("calculate button disabled");
}
numbers.forEach(button => {           // event listeners for number buttons
    button.addEventListener("click", getNumber);
    button.addEventListener("click", updateDisplay)
});
operators.forEach(element => {          // event listeners for operator buttons
    element.disabled = true;  // operators start disabled
    element.addEventListener("click", getOperation);
});
clearButton.addEventListener("click", clear);       // clear button event listener
calculateButton.addEventListener("click", calculate);       // calculate button event listeners
calculateButton.addEventListener("click", swapInput);

