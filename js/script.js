const screen = document.querySelector("#screen");
const leftPanel = document.querySelector(".leftPanel");
const lastRow = document.querySelector(".numbers:last-child")
const operators = document.querySelector(".operators");
const equals = document.querySelector("#result");

let inputArray = [];
let numArray = [];
let opArray = [];
let tempOpArray = [];
let lastEval = 0;
let resultFlag = false;

// Specifically used for operation results that intentionally don't follow order of operations
// See details in '=' event listener section
let sinceLastOpArray = [];

// event listener for first three rows of numbers
// index 'i' selects a row, index 'j' selects the buttons in the row
// we create a listener for each 'j' index (button) inside the nested for loop 
for (let i = 0; i < leftPanel.children.length - 1; i++) {
    for (let j = 0; j < leftPanel.children[i].children.length; j++) {
        leftPanel.children[i].children[j].addEventListener('click', () => {
            
            // refer to '=' event listener for explanation
            if (resultFlag) {
                clearDisplayAndArrays();
            }

            //splicing the innerHTML of each button div into an array. These arrays are used to evaluate operations
            sinceLastOpArray.splice(sinceLastOpArray.length, 0, leftPanel.children[i].children[j].innerHTML);
            inputArray.splice(inputArray.length, 0, leftPanel.children[i].children[j].innerHTML);
            numArray.splice(numArray.length, 0, leftPanel.children[i].children[j].innerHTML);
            
            //displays user input using data from our arrays
            screen.children[0].innerHTML = inputArray.join('');
            screen.children[1].innerHTML = numArray.join('');   
        })
    } 
}

// event listener for '0' button
lastRow.children[0].addEventListener('click', () => {
    if (resultFlag) {
        clearDisplayAndArrays();
    }
    inputArray.splice(inputArray.length, 0, lastRow.children[0].innerHTML);
    numArray.splice(numArray.length, 0, lastRow.children[0].innerHTML);
    sinceLastOpArray.splice(sinceLastOpArray.length, 0, lastRow.children[0].innerHTML);
    screen.children[0].innerHTML = inputArray.join('');
    screen.children[1].innerHTML = inputArray.join('');
})

// event listener for '.' button
lastRow.children[1].addEventListener('click', () => {
    if (resultFlag) {
        clearDisplayAndArrays();
    }
    
    // if the last character in an operation is '.', remove it. If inputted number already has a '.', disable '.'
    if (inputArray.includes(lastRow.children[1].innerHTML) == false || numArray.includes(lastRow.children[1].innerHTML) == false) {
        sinceLastOpArray.splice(sinceLastOpArray.length, 0, lastRow.children[1].innerHTML);
        inputArray.splice(inputArray.length, 0, lastRow.children[1].innerHTML);
        numArray.splice(numArray.length, 0, lastRow.children[1].innerHTML);
        screen.children[0].innerHTML = inputArray.join('');
        screen.children[1].innerHTML = numArray.join('');
    }   
})

// event listener for 'C'
lastRow.children[2].addEventListener('click', () => {
    clearDisplayAndArrays();
})

// event listener for operators
for (let i = 0; i < operators.children.length; i++) {
    operators.children[i].addEventListener('click', () => {
        
        // This if condition prevents an operator from being entered twice
        if (opArray.includes(inputArray[inputArray.length - 1]) == false && inputArray[inputArray.length - 1] != '.') {
            
            // This if condition automatically assumes '0' is the first input if an operator hasn't been entered
            if (inputArray.length < 1 && resultFlag == false) {
                numArray.push(0);
                inputArray.push(0);
            }
            resultFlag = false;
            inputArray.splice(inputArray.length, 0, operators.children[i].innerHTML);
            opArray.splice(opArray.length, 0, operators.children[i].innerHTML);
            screen.children[0].innerHTML = inputArray.join('');
            numArray = [];
            
            // slices the inputArray before adding the new operator, evaluates whatever complete operations have been written
            tempOpArray = inputArray.slice(0, -1);
            sinceLastOpArray = [operators.children[i].innerHTML];
            screen.children[1].innerHTML = eval(tempOpArray.join(''));
        }
    })
}

//event listener for '='
equals.addEventListener('click', () => {
    // removes operator if no number on right side
    while (opArray.includes(inputArray[inputArray.length - 1]) || inputArray[inputArray.length - 1] == '.'){
        inputArray.pop();
    }
    
    // This code will perform order of operations on everything entered before pressing '='
    lastEval = eval(inputArray.join(''));
    
    // The commented code below doesn't follow order of operations for the result (intentionally)... 
    // It performs all operations on the left of the last operator first
    // lastEval = eval(eval(tempOpArray.join('')) + sinceLastOpArray.join(''));

    inputArray = [lastEval];
    numArray = [lastEval];
    opArray = [];
    screen.children[0].innerHTML = inputArray.join('');
    screen.children[1].innerHTML = numArray.join('');
    
    // When a number is entered after pressing '=', the calc will automatically clear data.
    // This means everything afterwards is a new operation/result. This flag assists with this functionality.
    resultFlag = true;
})

function clearDisplayAndArrays() {
    inputArray = [];
    numArray = [];
    opArray = [];
    tempOpArray = [];
    sinceLastOpArray = [];
    screen.children[0].innerHTML = inputArray.join('');
    screen.children[1].innerHTML = numArray.join('');
    lastEval = 0;
    resultFlag = false;
}