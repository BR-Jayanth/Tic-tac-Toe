let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let gamebox = document.querySelector(".game");


let turnO = true;//playerX,playerO
let turncount = 0;

// winnig equation pattern
const winPaterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [3, 4, 5],
    [6, 7, 8],
    [6, 4, 2]
];

const disableBtn = () => {
    //to disable game buttons
    for (let box of boxes) {
        box.disabled = true;
    }
}


const enableBtn = () => {
    //to enable game buttons
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
}

const showWinner = (winner) => {
    // dispaly winner
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBtn();

}

const checkWinner = () => {
    // checks for winner using winning pattern after each player game turn
    for (let pattern of winPaterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;
        if (pos1Val != "" && pos2Val != "" & pos3Val != "") {
            if (pos1Val == pos2Val && pos2Val == pos3Val) {
                showWinner(pos1Val);
                return;
            }
        }

    }
    if (turncount == 9) {
        msg.innerText = `Match Drawn `;
        msgContainer.classList.remove("hide");
        disableBtn();
        turncount=0;

    }

}
const resetGame = () => {
    // to reset the game for new and reset button
    turnO = true;
    turncount=0;
    enableBtn();
    msgContainer.classList.add("hide");
    
}

// adding click event for game boxes
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        console.log("box was clicked")
        if (turnO) {
            box.style.color="#3FA7D6";
            box.innerText = "O";

        } else {
            box.style.color="#EE6352";
            box.innerText = "X";
        }
        turnO = !turnO;
        box.disabled = true;
        turncount += 1;
        checkWinner();
    });
});

// adding events for reset and new game button
resetBtn.addEventListener("click", resetGame);
newGameBtn.addEventListener("click", resetGame);