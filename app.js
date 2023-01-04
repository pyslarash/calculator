class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }

    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);              // Deleting the last number from the string and it saves it in the new currentOperand variable
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return;                // This will allow to click the period only once
        this.currentOperand = this.currentOperand.toString() + number.toString();       // This adds numbers to each other as a string next to each other (otherwise it will add them as actual numbers)
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') return;                                         // If we pressed an operation button, we don't execute the code
        if (this.previousOperand !== '') {                                              // If we have something computed in the top string, and we have something in the bottom string, we compute both
            this.compute()
        };
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';                                                       // Clears the currentOperand when pressing the operation button
    }

    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand);                                  // Converting a previous string into a number
        const current = parseFloat(this.currentOperand);                                // Converting a current string into a number
        if (isNaN(prev) || isNaN(current)) return;                                      // If a user clicks equals, but doesn't enter anything, we don't want the code to run
        switch (this.operation) {
            case '+':                                                                   // Switch/Case for computation
                computation = prev + current;
                break
            case '-': 
                computation = prev - current;
                break
            case '*':  
                computation = prev * current;
                break
            case '÷': 
                computation = prev / current;
                break
            default:                                                                     // If nothing is valid, we don't do anything
                return
        }
        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = '';
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        let integerDisplay;
        if (isNaN(integerDigits)) {
            integerDisplay = '';
        } else {
            integerDisplay = integerDigits.toLocaleString('en', { 
            maximumFractionDigits: 0});
        };
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }
    }

    updateDisplay() {
        this.currentOperandTextElement.innerText = 
            this.getDisplayNumber(this.currentOperand)
        if (this.operation != null) {
            this.previousOperandTextElement.innerText = 
            `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`               // The number will move to the top line of the operations | uses concat
        } else {
            this.previousOperandTextElement.innerText = '';
        }
    }
}


const numberButtons = document.querySelectorAll('[data-number]');                   // Creating constants to get the info from the buttons
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

numberButtons.forEach(button => {                                               // This function appends numbers to string
    button.addEventListener("click", () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {                                               // This function appends operations to string
    button.addEventListener("click", () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', button => {
    calculator.compute();
    calculator.updateDisplay();
})

allClearButton.addEventListener('click', button => {
    calculator.clear();
    calculator.updateDisplay();
})

deleteButton.addEventListener('click', button => {
    calculator.delete();
    calculator.updateDisplay();
})

addEventListener('keyup', function (e) {                                        // Entering using keyboard
    if (e.key === "0") {document.getElementById("0").click()};
    if (e.key === "1") {document.getElementById("1").click()};
    if (e.key === "2") {document.getElementById("2").click()};
    if (e.key === "3") {document.getElementById("3").click()};
    if (e.key === "4") {document.getElementById("4").click()};
    if (e.key === "5") {document.getElementById("5").click()};
    if (e.key === "6") {document.getElementById("6").click()};
    if (e.key === "7") {document.getElementById("7").click()};
    if (e.key === "8") {document.getElementById("8").click()};
    if (e.key === "9") {document.getElementById("9").click()};
    if (e.key === ".") {document.getElementById("period").click()};
    if (e.key === "Enter" || e.key === "=") {document.getElementById("equal").click()};
    if (e.key === "Backspace") {document.getElementById("delete").click()};
    if (e.key === "Delete") {document.getElementById("all-clear").click()};
    if (e.key === "/") {document.getElementById("divide").click()};
    if (e.key === "*") {document.getElementById("multiply").click()};
    if (e.key === "-") {document.getElementById("subtract").click()};
    if (e.key === "+") {document.getElementById("add").click()};
})