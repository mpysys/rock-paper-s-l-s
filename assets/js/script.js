// global variables and rules

var userChoice;
var computerChoice;
var win = 0;
var lose = 0;
var draw = 0;
var gestures = ['rock', 'paper', 'scissors', 'lizard', 'spock'];




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
    
    console.log(userChoice);
    console.log(computerChoice)
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
        console.log('computer wins');
        incrementLoss();
   } else if(defeatedBy[computerChoice].includes(userChoice)){
        console.log('user wins');
        incrementWin();
   } else {
    console.log('draw');
    incrementDraw();
   }
   increaseRoundNumber();
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
    if (roundNumber < 11) {
        document.getElementById("round").innerText = ++roundNumber;
    } else {
        resetScore();
    }
}


function Rules() {
            Swal.fire({
                title: 'Game Rules',
                html:
                    "<p><b>Rock, Paper, Scissors, Lizard, Spock is an expansion of the classical Rock, Paper, Scissors game</b></p>" +
                    "<p><b>You might have seen this game on the the hit TV series <a href='https://bigbangtheory.fandom.com/wiki/Rock,_Paper,_Scissors,_Lizard,_Spock' target='_blank'>The Big Bang Theory</a>.</b></p>" +
                    "<p><b>To play the game simply click on Rock, Paper, Scissors, Lizard or Spock. Once you've made your choice the computer will then pick their choice.</b></p>" +
                    "<ul><ol>Rock smashes Scissors</ol><ol>Rock cruses Lizard</ol><ol>Paper covers Rock</ol><ol>Paper disproves Spock</ol><ol>Scissors cuts Paper</ol><ol>Scissors decapitates Lizard</ol><ol>Lizard eats Paper</ol><ol>Lizard poisons Spock</ol><ol>Spock vaporizes Rock</ol><ol>Spock smashes Scissors</ol></ul>" +
                    "<p><b>Then depending on the out come you will receive a win, lose or draw</b></p>",
                confirmButtonText: `Lets Play`,
                confirmButtonColor: '#96AFC0',
                allowOutsideClick: true,
                width: 600,
                padding: '2em',
                background: '#DCDCDC',
                backdrop: `rgba(0,0,0,0.5)`,
            });
}



