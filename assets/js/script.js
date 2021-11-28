// global variables and rules

var userChoice;
var computerChoice;
var win = 0;
var lose = 0;
var draw = 0;
var gestures = ['rock', 'paper', 'scissors', 'lizard', 'spock'];
const playerMessage = document.getElementById("player-message");
const computerMessage = document.getElementById("computer-message");
const outcomeMessage = document.getElementById("outcome");




// wait for the DOM to finish loading before running the game
// get the button elements and add event listeners to them
document.addEventListener("DOMContentLoaded", function(){
    let buttons = document.getElementsByTagName("button");

    for (let button of buttons){
        button.addEventListener("click", function(){
            if (this.getAttribute("data-type") === "instructions") {
                Rules();
            } else {
                let gameType = this.getAttribute("data-type");
                gameStart(gameType);
                computeStart();
                winState(userChoice,computerChoice);
            }
        });
    };
})
/** 
 * The main game "loop", called when the script is first loaded 
 * and after the user's answer has been processed  
 */
 function gameStart(gameType) {
    options = document.querySelectorAll('.choice');
    options.forEach(function(element){
        element.classList.add('hidden');
    });
    document.getElementById(gameType).classList.remove('hidden');
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
    let allChoices = document.querySelectorAll('.computer-choice');
    allChoices.forEach(function(element){
        element.classList.add('hidden');
        if (element.id === computerChoice){
            element.classList.remove('hidden');
        }
    });
    computerMessage.innerHTML = `Computer Chose <b>${computerChoice}</b>`;
    playerMessage.innerHTML =`User Chose <b>${userChoice}</b>`
}


/** 
 * The function that will check what the user submits and compares
 * it to the computer response to determine win state
 */
function winState(userChoice, computerChoice){
    let defeatedBy = [];
    defeatedBy['rock'] = ['spock', 'paper'];
    defeatedBy['paper'] = ['scissors', 'lizard'],
    defeatedBy['scissors'] = ['spock', 'rock'],
    defeatedBy['lizard'] = ['rock', 'scissors'],
    defeatedBy['spock'] = ['lizard', 'paper'];

    if(defeatedBy[userChoice].includes(computerChoice)){
        outcomeMessage.innerHTML = "You Lose 😡";
        outcomeMessage.style.background = ("#ffdde0")
		outcomeMessage.style.fontSize = "Large";
        incrementLoss();
   } else if(defeatedBy[computerChoice].includes(userChoice)){
        outcomeMessage.innerHTML = "You Win 😃";
        outcomeMessage.style.background = ("#cefdce");
		outcomeMessage.style.fontSize = "Large";
        incrementWin();
   } else {
    outcomeMessage.innerHTML = "It's a Draw";
    outcomeMessage.style.background = ("none");
	outcomeMessage.style.fontSize = "Large";
    incrementDraw();
   }
   increaseRoundNumber();
   increaseGameCount();
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
    if (roundNumber < 10) {
        document.getElementById("round").innerText = ++roundNumber;
    } else {
        document.getElementById("win").innerText = 0;
        document.getElementById("lose").innerText = 0;
        document.getElementById("draw").innerText = 0;
        document.getElementById("round").innerText = 0;
    }
}

/** 
 * Increase the game count once 10 rounds were played
 */
 function increaseGameCount() {
    let gameCount = parseInt(document.getElementById("game").innerText);
    let roundNumber = parseInt(document.getElementById("round").innerText);
    if (roundNumber === 10) {
        document.getElementById("game").innerText = ++gameCount;
    } 
 }
/**
 * Restart Button , Resets scores to 0, can be used mid game.
 */

document.querySelector(".restart").addEventListener("click", function () {
    document.getElementById("win").innerText = 0;
    document.getElementById("lose").innerText = 0;
    document.getElementById("draw").innerText = 0;
    document.getElementById("round").innerText = 0;
    document.getElementById("game").innerText = 0;
});

function Rules() {
            Swal.fire({
                title: 'Game Rules',
                html:
                    "<p><b>Rock, Paper, Scissors, Lizard, Spock is an expansion of the classical Rock, Paper, Scissors game</b></p>" +
                    "<p><b>You might have seen this game on the the hit TV series <a href='https://bigbangtheory.fandom.com/wiki/Rock,_Paper,_Scissors,_Lizard,_Spock' target='_blank'>The Big Bang Theory</a>.</b></p>" +
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



