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
                alert('check it again');
            }
        });
    };
})
/** 
 * The main game "loop", called when the script is first loaded 
 * and after the user's answer has been processed  
 */
function gameStart() {

}

/** 
 * The function that will check what the user clicks and submits it as 
 * the users choice
 */
function getUserChoice(target){
    console.log(target);
};

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

