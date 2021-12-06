# Calculator DOM Exercise

- Create a fork of this repository
- Clone this repository to your local machine
- `cd` into the calculator directory
- Work with your classmates to build a calculator
- Your calculator should:
   - add each number to the screen when pressed
   - add an operator to the screen when pressed
   - calculate the result when `=` is pressed
- Break the problem down into smaller chunks and handle each piece at a time

### Questions to answer:
- How do I make a button do something on click?
- What needs to happen for each button? Are there similar actions? What is different?
- How do I store data?
- How do I display stored data?
- How do I use stored data to calculate result?
- When should I calculate results?

### Implementation Suggestion

If you're stuck on thinking how to solve this problem, take a look at the suggested method below.
<details>
  <summary>Details</summary>

## Create a Calculator using HTML/CSS/JS

1. Add click handlers to the number buttons
   - Create an array of the numbers clicked, in order
1. Add click handlers to the calculation buttons
   - Create an array of the operators
   - Starting with an operator is like using 0 as the first number
   - Don't let a user type multiple operators (i.e. you can't type '--' or '++' or "\*+")
1. Add click handler to the 'equals' button
1. The 'equals' button needs to trigger a few events (**NOTE:** These will be functions)
   - Loop through the array of numbers (**NOTE:** These are currently strings)
   - Convert the strings to integers
   - Write a new array of integers
   - Get an array of the operators
   - Perform each math operation (**NOTE:** We'll use 4 `while` loops)
1. Add click handler clearing the input on press of clear
   
### Hints
1. Don't place an event listener on each individual button. Instead, use addEventListenter and attach a listener to a group of buttons.  Use the `event` object to determine which button was clicked.
1. use *`slice`* and *`splice`* instead of `push` and `pop`
</details>
