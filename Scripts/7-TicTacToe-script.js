"use strict"

let emptyCheck = 0;
let winLooseCheck = 0; // var to check if game's end is archieved
let whoseMove; // var to randomly roll user's vs computer's move

function board() { // creating game's interface: clickable grid and a notification field
    let leftPos = 35;
    let topPos = 10;
    for (let i = 1; i < 10; i++) {
        if (i === 4) {
            topPos = 18;
            leftPos = 35;
        }
        if (i === 7) {
            topPos = 26;
            leftPos = 35;
        }
        let cell = document.createElement("img");
        cell.src = "Images/7-TicTacToe/Bla.png";
        cell.id = "c" + i;
        cell.style = `position: absolute; left: ${leftPos}vw; top: ${topPos}vw; max-width: 8vw;
         border: solid`
        cell.addEventListener("click", movePreparation);
        document.body.appendChild(cell);
        leftPos += 8;
    }
    let noteField = document.createElement("p");
    noteField.innerHTML = "";
    noteField.id = "NF"
    noteField.style = `position: absolute; left: 38vw; top: 35vw; font-size: 2vw`;
    document.body.appendChild(noteField);
    whoseMove = Math.floor(Math.random()*2);
    if (whoseMove === 0) {
        document.getElementById("NF").innerHTML = "Random rolls your move";
    }
    else {
        document.getElementById("NF").innerHTML = "Random rolls computer's move";
        move(event);
     }
}
board();

function movePreparation() {
    return move(event);
}

async function move(event) { //click's rules and computer's decision logic
    if (whoseMove != 1) {
        if (document.getElementById(event.target.id).src.slice(-7,) != "X-0.png" &&
            document.getElementById(event.target.id).src.slice(-7,) != "O-0.png") {
                document.getElementById(event.target.id).src = "Images/7-TicTacToe/X-0.png"
        }
        else return move(event);
    }
    await new Promise(r => setTimeout(r, 200));

    let winLoop = [["c1", "c2", "c3"], ["c4", "c5", "c6"], ["c7", "c8", "c9"], ["c1", "c4", "c7"],
                   ["c2", "c5", "c8"], ["c3", "c6", "c9"], ["c3", "c5", "c7"], ["c1", "c5", "c9"]];
    for (let i = 0; i <8; i ++) {
        winCheckUser(winLoop[i][0], winLoop[i][1], winLoop[i][2]); // checking if user wins after last click
    }
    if (winLooseCheck === 1) return;

    let Loop = [["c1", "c2", "c3"], ["c4", "c5", "c6"], ["c7", "c8", "c9"], ["c3", "c2", "c1"],
                 ["c6", "c5", "c4"], ["c9", "c8", "c7"], ["c1", "c3", "c2"], ["c4", "c6", "c5"],
                 ["c7", "c9", "c8"], ["c1", "c4", "c7"], ["c2", "c5", "c8"], ["c3", "c6", "c9"],
                 ["c7", "c4", "c1"], ["c8", "c5", "c2"], ["c9", "c6", "c3"], ["c1", "c7", "c4"],
                 ["c2", "c8", "c5"], ["c3", "c9", "c6"], ["c1", "c5", "c9"], ["c9", "c5", "c1"],
                 ["c1", "c9", "c5"], ["c3", "c5", "c7"], ["c7", "c5", "c3"], ["c3", "c7", "c5"]];
    for (let i = 0; i <24; i ++) {
        if (emptyCheck === 1) {
            break;
        }
        computerMoveX(Loop[i][0], Loop[i][1], Loop[i][2]); //checking if computer's win can be archieved
    }

    for (let i = 0; i <24; i ++) {
        if (emptyCheck === 1) {
            break;
        }
        computerMoveO(Loop[i][0], Loop[i][1], Loop[i][2]); //checking if user's win should be prevented
    }
    
    let extraLoop = [["c6", "c8", "c9"], ["c1", "c8", "c7"], ["c3", "c8", "c9"], ["c6", "c7", "c9"]];
    
    for (let i = 0; i < 4; i ++) { 
        if (emptyCheck === 1) {
            break;
        }
        //checking if loosing situation should be prevented
        computerMoveExtra(extraLoop[i][0], extraLoop[i][1], extraLoop[i][2]);
    }

    let sLoop = ["c5", "c1", "c3", "c7", "c9", "c2", "c4", "c6", "c8"];

    for (let i = 0; i <9; i ++) {
        if (emptyCheck === 1) {
            emptyCheck = 0;
            break;
        }
        //checking best basic moves are possible
        computerMoveS(sLoop[i]);
    }

    for (let i = 0; i <8; i ++) {
        winCheckComputer(winLoop[i][0], winLoop[i][1], winLoop[i][2]); //checking if computer wins
    }
    let flag = 0;
    for (let i = 1; i < 10; i++) {  // checking for stalemate situation
        if (document.getElementById("c" + i).src.slice(-7,) === "Bla.png" &&
            (document.getElementById("c" + i).src.slice(-7,) != "O-2.png" ||
             document.getElementById("c" + i).src.slice(-7,) != "X-1.png")) {
            flag++;
        } 
    }
    if (flag === 0) {
        for (let i = 1; i < 10; i++) {
            document.getElementById("c" + i).removeEventListener("click", movePreparation)
        }
        document.getElementById("NF").innerHTML = "Stalemate.";
        let restartButton = document.createElement("button");
        restartButton.innerHTML = "Play again";
        restartButton.id = "RB";
        restartButton.style = `position: absolute; left: 53vw; top: 37vw; font-size: 1.5vw;
        text-align: center;`;
        restartButton.addEventListener("click", restart);
        document.body.appendChild(restartButton);
    }
    whoseMove = 0;
}

function computerMoveX(x, y, z) {
    if (document.getElementById(x).src.slice(-7,) === "O-0.png" &&
        document.getElementById(y).src.slice(-7,) === "O-0.png" &&
        document.getElementById(z).src.slice(-7,) === "Bla.png") {
            document.getElementById(z).src = "Images/7-TicTacToe/O-0.png";
            emptyCheck = 1;
    }
}

function computerMoveO(x, y, z) {
    if (document.getElementById(x).src.slice(-7,) === "X-0.png" &&
        document.getElementById(y).src.slice(-7,) === "X-0.png" && 
        document.getElementById(z).src.slice(-7,) === "Bla.png") {
            document.getElementById(z).src = "Images/7-TicTacToe/O-0.png";
            emptyCheck = 1;
    }
}

function computerMoveExtra(x, y, z) {
    if (document.getElementById(x).src.slice(-7,) === "X-0.png" &&
        document.getElementById(y).src.slice(-7,) === "X-0.png" && 
        document.getElementById(z).src.slice(-7,) === "Bla.png") {
            document.getElementById(z).src = "Images/7-TicTacToe/O-0.png";
            emptyCheck = 1;
    }
}

function computerMoveS(x) {
    if (document.getElementById(x).src.slice(-7,) === "Bla.png") {
            document.getElementById(x).src = "Images/7-TicTacToe/O-0.png";
            emptyCheck = 1;
    }
}

function winCheckUser(x, y, z){
    if (document.getElementById(x).src.slice(-7,) === "X-0.png" &&
        document.getElementById(y).src.slice(-7,) === "X-0.png" &&
        document.getElementById(z).src.slice(-7,) === "X-0.png") {
            document.getElementById(x).src = "Images/7-TicTacToe/X-1.png";
            document.getElementById(y).src = "Images/7-TicTacToe/X-1.png";
            document.getElementById(z).src = "Images/7-TicTacToe/X-1.png";
            for (let i = 1; i < 10; i++) {
                document.getElementById("c" + i).removeEventListener("click", movePreparation)
            }
            winLooseCheck = 1;
            document.getElementById("NF").innerHTML = "You win!";
            let restartButton = document.createElement("button");
            restartButton.innerHTML = "Play again";
            restartButton.id = "RB";
            restartButton.style = `position: absolute; left: 53vw; top: 37vw; font-size: 1.5vw;
            text-align: center;`;
            restartButton.addEventListener("click", restart);
            document.body.appendChild(restartButton);
    }
}
function winCheckComputer(x, y, z){
    if (document.getElementById(x).src.slice(-7,) === "O-0.png" &&
        document.getElementById(y).src.slice(-7,) === "O-0.png" &&
        document.getElementById(z).src.slice(-7,) === "O-0.png") {
            document.getElementById(x).src = "Images/7-TicTacToe/O-2.png";
            document.getElementById(y).src = "Images/7-TicTacToe/O-2.png";
            document.getElementById(z).src = "Images/7-TicTacToe/O-2.png";
            for (let i = 1; i < 10; i++) {
                document.getElementById("c" + i).removeEventListener("click", movePreparation)
            }
            document.getElementById("NF").innerHTML = "You lost...";
            let restartButton = document.createElement("button");
            restartButton.innerHTML = "Play again";
            restartButton.id = "RB";
            restartButton.style = `position: absolute; left: 53vw; top: 37vw; font-size: 1.5vw;
            text-align: center;`;
            restartButton.addEventListener("click", restart);
            document.body.appendChild(restartButton);
    }
}

function restart() {
    for (let i = 1; i < 10; i++) {
        document.getElementById("c" + i).src = "Images/7-TicTacToe/Bla.png";
        document.getElementById("c" + i).addEventListener("click", movePreparation)
    }
    document.getElementById("RB").remove();
    document.getElementById("NF").innerHTML = "";
    winLooseCheck = 0;
    whoseMove = Math.floor(Math.random()*2);
    if (whoseMove === 0) {
        document.getElementById("NF").innerHTML = "Random rolls your move";
    }
    else {
        document.getElementById("NF").innerHTML = "Random rolls computer's move";
        move(event);
     }
}
