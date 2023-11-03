"use strict"   


let a = ["Rock", "Paper", "Scissors"];
let win = 0;
let loose = 0;
let stalemate = 0;

function ResettoView() {
    win = 0;
    loose = 0;
    stalemate = 0;
    document.getElementById("RockButton").disabled = false;
    document.getElementById("PaperButton").disabled = false;
    document.getElementById("ScissorsButton").disabled = false;
    document.getElementById("Loose").innerHTML=0;
    document.getElementById("Win").innerHTML=0;
    document.getElementById("Stalemate").innerHTML=0;
    document.getElementById("Reset").remove();
    document.getElementById("Comment1").innerHTML="";
    document.getElementById("TheEnd").innerHTML="";
    document.getElementById("TopQuestion").src="Images/3-RPS/Question.png";
    document.getElementById("BottomQuestion").src="Images/3-RPS/Question.png";
}

function RocktoView() {
    document.getElementById("TopQuestion").src="Images/3-RPS/Rock.png";
    let computer = Math.floor(Math.random()*a.length);
    if (computer == 0) {
        document.getElementById("BottomQuestion").src="Images/3-RPS/Rock.png"; 
        stalemate+=1;
        document.getElementById("Stalemate").innerHTML=stalemate;
        document.getElementById("Comment1").innerHTML="Rock vs Rock | Stalemate";
    }
    if (computer == 1) {
        document.getElementById("BottomQuestion").src="Images/3-RPS/Paper.png";
        loose+=1;
        document.getElementById("Loose").innerHTML=loose;
        document.getElementById("Comment1").innerHTML="Rock vs Paper | You lost";
    }
    if (computer == 2) {
        document.getElementById("BottomQuestion").src="Images/3-RPS/Scissors.png";
        win+=1;
        document.getElementById("Win").innerHTML=win;
        document.getElementById("Comment1").innerHTML="Rock vs Scissors | You win";
    }
    looseOrWin();
}

function PapertoView() {
    document.getElementById("TopQuestion").src="Images/3-RPS/Paper.png";
    let computer = Math.floor(Math.random()*a.length);
    if (computer == 0) {
        document.getElementById("BottomQuestion").src="Images/3-RPS/Rock.png"; 
        win+=1;
        document.getElementById("Win").innerHTML=win;
        document.getElementById("Comment1").innerHTML="Paper vs Rock | You win";
    }
    if (computer == 1) {
        document.getElementById("BottomQuestion").src="Images/3-RPS/Paper.png";
        stalemate+=1;
        document.getElementById("Stalemate").innerHTML=stalemate;
        document.getElementById("Comment1").innerHTML="Paper vs Paper | Stalemate";
    }
    if (computer == 2) {
        document.getElementById("BottomQuestion").src="Images/3-RPS/Scissors.png";
        loose+=1;
        document.getElementById("Loose").innerHTML=loose;
        document.getElementById("Comment1").innerHTML="Paper vs Scissors | You lost";
    }
    looseOrWin();
}

function ScissorstoView() {
    document.getElementById("TopQuestion").src="Images/3-RPS/Scissors.png";
    let computer = Math.floor(Math.random()*a.length);
    if (computer == 0) {
        document.getElementById("BottomQuestion").src="Images/3-RPS/Rock.png"; 
        loose+=1;
        document.getElementById("Loose").innerHTML=loose;
        document.getElementById("Comment1").innerHTML="Scissors vs Rock | You lost";
    }
    if (computer == 1) {
        document.getElementById("BottomQuestion").src="Images/3-RPS/Paper.png";
        win+=1;
        document.getElementById("Win").innerHTML=win;
        document.getElementById("Comment1").innerHTML="Scissors vs Paper | You win";
    }
    if (computer == 2) {
        document.getElementById("BottomQuestion").src="Images/3-RPS/Scissors.png";
        stalemate+=1;
        document.getElementById("Stalemate").innerHTML=stalemate;
        document.getElementById("Comment1").innerHTML="Scissors vs Scissors | Stalemate";
    }
    looseOrWin();
}

function looseOrWin() {
    if (win == 5) {
        document.getElementById("TheEnd").innerHTML="YOU WIN!";
        document.getElementById("RockButton").disabled = true;
        document.getElementById("PaperButton").disabled = true;
        document.getElementById("ScissorsButton").disabled = true;
        let reset = document.createElement('button');
        reset.style = "position:absolute; left: 61vw; top: 37vw; font-size: 2vw";
        reset.innerHTML = 'Start over';
        reset.id ='Reset';
        reset.addEventListener ("click", ResettoView);
        document.body.appendChild(reset);
    }
    if (loose == 5) {
        document.getElementById("TheEnd").innerHTML="GAME OVER!";
        document.getElementById("RockButton").disabled = true;
        document.getElementById("PaperButton").disabled = true;
        document.getElementById("ScissorsButton").disabled = true;
        let reset = document.createElement('button');
        reset.style = "position:absolute; left: 61vw; top: 37vw; font-size: 2vw";
        reset.innerHTML = 'Start over';
        reset.id ='Reset';
        reset.addEventListener ("click", ResettoView);
        document.body.appendChild(reset);
    }
}