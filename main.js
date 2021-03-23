/**********
 * DATA *
 **********/

const sixes = [];
const doubleSixes = [];
const twelves = [];
const twenties = [];

/********************
 * HELPER FUNCTIONS *
********************/

const getRandomNumber = function(max) {
    const rand = Math.random();
    const range = rand * max;
    const result = Math.ceil(range);
    
    return result;
}

const sortByNumber = function(arr) {
  const byNumber = function(item1, item2) {
    return item1 - item2;
  }

  return arr.slice().sort(byNumber);
}

/*******************
 * YOUR CODE BELOW *
 *******************/
const die = document.querySelector("#d6-roll");
const dice1 = document.querySelector("#double-d6-roll-1");
const dice2 = document.querySelector("#double-d6-roll-2");
const die12 = document.querySelector("#d12-roll");
const die20 = document.querySelector("#d20-roll");
const resetButton = document.querySelector("#reset-button");

let dieCounter = {};
let diceCounter = {};
let die12Counter = {};
let die20Counter = {};

/*************
 *  ON START *
 *************/

resetButtonClicked();

/*******************
 * EVENT LISTENERS *
 *******************/
die.addEventListener("click", rollDie);
dice1.addEventListener("click", rollDice);
dice2.addEventListener("click", rollDice);
die12.addEventListener("click", rollDie12);
die20.addEventListener("click", rollDie20);
resetButton.addEventListener("click", resetButtonClicked);

/******************
 * RESET FUNCTION *
 ******************/


function resetButtonClicked() {
  console.log("resetButton() called")
  
  while(sixes.length > 0){
    sixes.pop();
  }
  console.log(sixes);
  while(doubleSixes.length > 0){
    doubleSixes.pop();
  }
  while(twelves.length > 0){
    twelves.pop();
  }
  while(twenties.length > 0){
    twenties.pop();
  }

  dieCounter = {};
  diceCounter = {};
  die12Counter = {};
  die20Counter = {};

  die.src = "images/start/d6.png";
  dice1.src = "images/start/d6.png";
  dice2.src = "images/start/d6.png";
  die12.src = "images/start/d12.jpeg";
  die20.src = "images/start/d20.jpg";

  document.querySelector("#d6-rolls-mean").textContent = "NA";
  document.querySelector("#d6-rolls-median").textContent = "NA";
  document.querySelector("#d6-rolls-mode").textContent = "NA";
  document.querySelector("#double-d6-rolls-mean").textContent = "NA";
  document.querySelector("#double-d6-rolls-median").textContent = "NA"
  document.querySelector("#double-d6-rolls-mode").textContent = "NA"
  document.querySelector("#d12-rolls-mean").textContent = "NA";
  document.querySelector("#d12-rolls-median").textContent = "NA";
  document.querySelector("#d12-rolls-mode").textContent = "NA";
  document.querySelector("#d20-rolls-mean").textContent = "NA";
  document.querySelector("#d20-rolls-median").textContent = "NA";
  document.querySelector("#d20-rolls-mode").textContent = "NA";
}


/****************************
 * CLICK HANDLING FUNCTIONS *
****************************/
function rollDie() {
  console.log("rollDie() called");
  const randomNumber = getRandomNumber(6);
  sixes.push(randomNumber);
  die.src = "images/d6/" + randomNumber + ".png";
  document.querySelector("#d6-rolls-mean").textContent = mean(sixes).toFixed(2);
  document.querySelector("#d6-rolls-median").textContent = median(sixes).toFixed(2);
  document.querySelector("#d6-rolls-mode").textContent = mode(dieCounter, randomNumber);
}

function rollDice() {
console.log("rolDice() called");
const randomNumber1 = getRandomNumber(6);
const randomNumber2 = getRandomNumber(6);
doubleSixes.push(randomNumber1);
doubleSixes.push(randomNumber2);
  dice1.src = "images/d6/" + randomNumber1 + ".png";
  dice2.src = "images/d6/" + randomNumber2 + ".png";
  document.querySelector("#double-d6-rolls-mean").textContent = mean(doubleSixes).toFixed(2);
  document.querySelector("#double-d6-rolls-median").textContent = median(doubleSixes).toFixed(2);
  document.querySelector("#double-d6-rolls-mode").textContent = mode(diceCounter, randomNumber1);
  document.querySelector("#double-d6-rolls-mode").textContent = mode(diceCounter, randomNumber2);
}


function rollDie12() {
  console.log("rollDie12() called");
  const randomNumber = getRandomNumber(12);
  twelves.push(randomNumber);
  die12.src = "images/numbers/" + randomNumber + ".png";
  document.querySelector("#d12-rolls-mean").textContent = mean(twelves).toFixed(2);
  document.querySelector("#d12-rolls-median").textContent = median(twelves).toFixed(2);
  document.querySelector("#d12-rolls-mode").textContent = mode(dieCounter, randomNumber);
}

function rollDie20() {
  console.log("rollDie20() called");
  const randomNumber = getRandomNumber(20);
  twenties.push(randomNumber);
  die20.src = "images/numbers/" + randomNumber + ".png";
  document.querySelector("#d20-rolls-mean").textContent = mean(twenties).toFixed(2);
  document.querySelector("#d20-rolls-median").textContent = median(twenties).toFixed(2);
  document.querySelector("#d20-rolls-mode").textContent = mode(die20Counter, randomNumber);
}

/****************
 * MATH SECTION *
 ****************/

function mean(numbers){
  let total = 0;
  for(let i = 0; i < numbers.length; i++){
    total += numbers[i];
  }
  return total / numbers.length;
}

function median(numbers){
  let sortedNumbers = sortByNumber(numbers);

  if(sortedNumbers.length === 1){
    return sortedNumbers[0];
  }

  if(sortedNumbers.length === 2){
    return (sortedNumbers[0] + sortedNumbers[1]) / 2;
  }

  if(sortedNumbers.length % 2 === 0){
    return (sortedNumbers[(sortedNumbers.length/2) - 1] + sortedNumbers[(sortedNumbers.length/2)]) / 2;
  }

  else{
    return sortedNumbers[Math.floor(sortedNumbers.length / 2)];
  }
}

function mode(obj, number) {
  let highest = -1;
  let mode = -1;

  if(obj[number] != undefined){
    obj[number] += 1;
  }

  else{
    obj[number] = 1;
  }

  for(const key in obj){
    if(obj[key] > highest){
      highest = obj[key];
      mode = key;
    }
  }

  return mode;
}