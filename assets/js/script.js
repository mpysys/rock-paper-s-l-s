// wait for the DOM to finish loading before running the game
// get the button elements and add event listeners to them
document.addEventListener("DOMContentLoaded", function(){
    let buttons = document.getElementsByTagName("button");

    for (let button of buttons){
        button.addEventListener("click", function(){
            if (this.getAttribute("data-type") === "submit") {
                checkAnswer();
                alert('check it')
            } else {
                let gameType = this.getAttribute("data-type");
                gameStart(gameType);
                alert('check it again')
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
