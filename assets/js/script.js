// global variables and rules

var userChoice;
var computerChoice;
var gestures = ['rock', 'paper', 'scissors', 'lizard', 'spock'];
var playerMessage = document.getElementById("player-message");
var computerMessage = document.getElementById("computer-message");
var outcomeMessage = document.getElementById("outcome");
var defeatedBy = [];
defeatedBy['rock'] = ['spock', 'paper'];
defeatedBy['paper'] = ['scissors', 'lizard'],
defeatedBy['scissors'] = ['spock', 'rock'],
defeatedBy['lizard'] = ['rock', 'scissors'],
defeatedBy['spock'] = ['lizard', 'paper'];





// wait for the DOM to finish loading before running the game
// get the button elements and add event listeners to them
document.addEventListener("DOMContentLoaded", function(){
    let buttons = document.getElementsByTagName("button");

    for (let button of buttons){
        button.addEventListener("click", function(){
            if (this.getAttribute("data-type") === "instructions") {
                displayRules();
            } else if (this.getAttribute("data-type") === "restart") {
                restart();
            } else {
                document.getElementsByClassName('result-detail')[0].classList.add('hidden');
                let gameType = this.getAttribute("data-type");
                playerSelection(gameType);
                computeStart();

            }
        });
    }
});

/**
 * 
 * The function to start playing 
 */


/** 
 * The main game "loop", called when the script is first loaded 
 * and after the user's answer has been processed  
 */
 function playerSelection(gameType) {
    options = document.querySelectorAll('.choice');
    options.forEach(function(element){
        element.classList.add('hidden');
    });
    let image = document.getElementsByClassName('player choice '+gameType)[0];
    if (image){
        image.classList.remove('hidden');
    }
    userChoice = gameType;
}
/**
 * The function where the computer generates a random number between 1 and 5
 * and determines the output value
 */
function computeStart() {
    let index = Math.floor(Math.random() * gestures.length);
    computerChoice = gestures[index];
    displayAnswer(computerChoice);
}


/**
 * 
 * The function to display the computer's choice
 */

function displayAnswer(computerChoice){
    let allChoices = document.querySelectorAll('.computer.choice');
    nbspin = 0;
    spinAnswer(allChoices);
}

function finishAnswer(){
    let allChoices = document.querySelectorAll('.computer.choice');
    allChoices.forEach(function(element){
        element.classList.add('hidden');
    });
    document.getElementsByClassName('computer choice '+computerChoice)[0].classList.remove('hidden');
    computerMessage.innerHTML = `Computer chose <b>${computerChoice}</b>`;
    playerMessage.innerHTML =`User chose <b>${userChoice}</b>`;
    winState(userChoice,computerChoice);
}

var nbspin = 0;

function spinAnswer(allChoices){
    setTimeout(function(){
        allChoices.forEach(function(element){
            element.classList.add('hidden');
        });
        allChoices[nbspin % allChoices.length].classList.remove('hidden');
        nbspin++;
        if (nbspin < 10) {
            spinAnswer(allChoices);
        } else {
            finishAnswer();
        }
    }, 100);
}

/** 
 * The function that will check what the user submits and compares
 * it to the computer response to determine win state
 */
function winState(userChoice, computerChoice){

    if(defeatedBy[userChoice].includes(computerChoice)){
        displayResults("You Lose 😡","#ffdde0", "Large");
        incrementLoss();
   } else if(defeatedBy[computerChoice].includes(userChoice)){
        displayResults("You Win 😃","#cefdce","Large");
        incrementWin();
   } else {
    displayResults("It's a Draw","none","Large");
    incrementDraw();
   }
   increaseRoundNumber();
}

/**
 * display results styling
 */
function displayResults(text, color, size){
    outcomeMessage.innerHTML = text;
    outcomeMessage.style.background = color;
    outcomeMessage.style.fontSize = size;
    document.getElementsByClassName('result-detail')[0].classList.remove('hidden');
}

/**
 * Gets the current score from the DOM and increments it by 1
 */
 function incrementWin(){
    let oldScore = parseInt(document.getElementById("win").innerText);
    document.getElementById("win").innerText = ++oldScore;
}   

/**
 * Gets the current tally of incorrect answers from the DOM and increments it by 1
 */
function incrementLoss(){
    let oldScore = parseInt(document.getElementById("lose").innerText);
    document.getElementById("lose").innerText = ++oldScore;
}

/**
 * Gets the current tally of draws from the DOM and increments it by 1
 */
function incrementDraw(){
    let oldScore = parseInt(document.getElementById("draw").innerText);
    document.getElementById("draw").innerText = ++oldScore;
}

/**
 * Increases the number of rounds to 10 then resets to 0
 */
 function increaseRoundNumber() {
    let roundNumber = parseInt(document.getElementById("round").innerText);
    document.getElementById("round").innerText = ++roundNumber;
}


/**
 * Restart Button , Resets scores to 0, can be used mid game.
 */

function restart() {
    document.getElementById("win").innerText = 0;
    document.getElementById("lose").innerText = 0;
    document.getElementById("draw").innerText = 0;
    document.getElementById("round").innerText = 0;
    document.getElementsByClassName('result-detail')[0].classList.add('hidden');
    let allChoices = document.querySelectorAll('.choice');
    allChoices.forEach(function(element){
        element.classList.add('hidden');
    });
}

function displayRules() {
            Swal.fire({
                title: 'Game Rules',
                html:
                    "<p><b>Rock, Paper, Scissors, Lizard, Spock is an expansion of the classical Rock, Paper, Scissors game</b></p>" +
                    "<p><b>You might have seen this game on the hit TV series <a href='https://bigbangtheory.fandom.com/wiki/Rock,_Paper,_Scissors,_Lizard,_Spock' target='_blank'>The Big Bang Theory</a>.</b></p>" +
                    "<p><b>To play the game simply click on Rock, Paper, Scissors, Lizard or Spock below the game area. Once you've made your choice the computer will then pick their choice.</b></p>" +
                    "<p><b>Then depending on the out come you will receive a win, lose or draw</b></p>",
                imageUrl: './assets/images/logo.png',
                imageHeight: 250,
                imageAlt: 'A tall image',
                confirmButtonText: `Lets Play`,
                confirmButtonColor: '#96AFC0',
                allowOutsideClick: true,
                width: 600,
                padding: '2em',
                background: '#d9e2e9',
                backdrop: `rgba(0,0,0,0.5)`,
            });
}



