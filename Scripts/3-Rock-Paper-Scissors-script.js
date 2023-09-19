   
let a = ["Rock", "Paper", "Scissors"];
let win = 0;
let loose = 0;
let stalemate = 0;

let ResettoView = function() {
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
    document.getElementById("Comment2").innerHTML="";
    document.getElementById("TheEnd").innerHTML="";
    document.getElementById("TopQuestion").src="Images/3-RPS/Question.png";
    document.getElementById("BottomQuestion").src="Images/3-RPS/Question.png";
}

let RocktoView = function() {
    document.getElementById("TopQuestion").src="Images/3-RPS/Rock.png";
    computer = Math.floor(Math.random()*a.length);
    if (computer == 0) {
        document.getElementById("BottomQuestion").src="Images/3-RPS/Rock.png"; 
        stalemate+=1;
        document.getElementById("Stalemate").innerHTML=stalemate;
        document.getElementById("Comment1").innerHTML="Rock vs Rock";
        document.getElementById("Comment2").innerHTML="Stalemate";
    }
    if (computer == 1) {
        document.getElementById("BottomQuestion").src="Images/3-RPS/Paper.png";
        loose+=1;
        document.getElementById("Loose").innerHTML=loose;
        document.getElementById("Comment1").innerHTML="Rock vs Paper";
        document.getElementById("Comment2").innerHTML="You lost";
    }
    if (computer == 2) {
        document.getElementById("BottomQuestion").src="Images/3-RPS/Scissors.png";
        win+=1;
        document.getElementById("Win").innerHTML=win;
        document.getElementById("Comment1").innerHTML="Rock vs Scissors";
        document.getElementById("Comment2").innerHTML="You win";
    }
    if (win == 5) {
        document.getElementById("TheEnd").innerHTML="YOU WIN!";
        document.getElementById("RockButton").disabled = true;
        document.getElementById("PaperButton").disabled = true;
        document.getElementById("ScissorsButton").disabled = true;
        let reset = document.createElement('button');
        reset.style = "position:absolute; left: 60vw; top: 38vw; font-size: 2vw";
        reset.innerHTML = 'Start over';
        reset.id ='Reset';
        reset.addEventListener ("click", ResettoView);
        let body = document.getElementsByTagName("body");
        document.body.appendChild(reset);
    }
    if (loose == 5) {
        document.getElementById("TheEnd").innerHTML="GAME OVER!";
        document.getElementById("RockButton").disabled = true;
        document.getElementById("PaperButton").disabled = true;
        document.getElementById("ScissorsButton").disabled = true;
        let reset = document.createElement('button');
        reset.style = "position:absolute; left: 60vw; top: 38vw; font-size: 2vw";
        reset.innerHTML = 'Start over';
        reset.id ='Reset';
        reset.addEventListener ("click", ResettoView);
        let body = document.getElementsByTagName("body");
        document.body.appendChild(reset);
    }
}
let PapertoView = function() {
    document.getElementById("TopQuestion").src="Images/3-RPS/Paper.png";
    computer = Math.floor(Math.random()*a.length);
    if (computer == 0) {
        document.getElementById("BottomQuestion").src="Images/3-RPS/Rock.png"; 
        win+=1;
        document.getElementById("Win").innerHTML=win;
        document.getElementById("Comment1").innerHTML="Paper vs Rock";
        document.getElementById("Comment2").innerHTML="You win";
    }
    if (computer == 1) {
        document.getElementById("BottomQuestion").src="Images/3-RPS/Paper.png";
        stalemate+=1;
        document.getElementById("Stalemate").innerHTML=stalemate;
        document.getElementById("Comment1").innerHTML="Paper vs Paper";
        document.getElementById("Comment2").innerHTML="Stalemate";
    }
    if (computer == 2) {
        document.getElementById("BottomQuestion").src="Images/3-RPS/Scissors.png";
        loose+=1;
        document.getElementById("Loose").innerHTML=loose;
        document.getElementById("Comment1").innerHTML="Paper vs Scissors";
        document.getElementById("Comment2").innerHTML="You loose";
    }
    if (win == 5) {
        document.getElementById("TheEnd").innerHTML="YOU WIN!";
        document.getElementById("RockButton").disabled = true;
        document.getElementById("PaperButton").disabled = true;
        document.getElementById("ScissorsButton").disabled = true;
        let reset = document.createElement('button');
        reset.style = "position:absolute; left: 60vw; top: 38vw; font-size: 2vw";
        reset.innerHTML = 'Start over';
        reset.id ='Reset';
        reset.addEventListener ("click", ResettoView);
        let body = document.getElementsByTagName("body");
        document.body.appendChild(reset);
    }
    if (loose == 5) {
        document.getElementById("TheEnd").innerHTML="GAME OVER!";
        document.getElementById("RockButton").disabled = true;
        document.getElementById("PaperButton").disabled = true;
        document.getElementById("ScissorsButton").disabled = true;
        let reset = document.createElement('button');
        reset.style = "position:absolute; left: 60vw; top: 38vw; font-size: 2vw";
        reset.innerHTML = 'Start over';
        reset.id ='Reset';
        reset.addEventListener ("click", ResettoView);
        let body = document.getElementsByTagName("body");
        document.body.appendChild(reset);
    }
}
let ScissorstoView = function() {
    document.getElementById("TopQuestion").src="Images/3-RPS/Scissors.png";
    computer = Math.floor(Math.random()*a.length);
    if (computer == 0) {
        document.getElementById("BottomQuestion").src="Images/3-RPS/Rock.png"; 
        loose+=1;
        document.getElementById("Loose").innerHTML=loose;
        document.getElementById("Comment1").innerHTML="Scissors vs Rock";
        document.getElementById("Comment2").innerHTML="You lost";
    }
    if (computer == 1) {
        document.getElementById("BottomQuestion").src="Images/3-RPS/Paper.png";
        win+=1;
        document.getElementById("Win").innerHTML=win;
        document.getElementById("Comment1").innerHTML="Scissors vs Paper";
        document.getElementById("Comment2").innerHTML="You win";
    }
    if (computer == 2) {
        document.getElementById("BottomQuestion").src="Images/3-RPS/Scissors.png";
        stalemate+=1;
        document.getElementById("Stalemate").innerHTML=stalemate;
        document.getElementById("Comment1").innerHTML="Scissors vs Scissors";
        document.getElementById("Comment2").innerHTML="Stalemate";
    }
    if (win == 5) {
        document.getElementById("TheEnd").innerHTML="YOU WIN!";
        document.getElementById("RockButton").disabled = true;
        document.getElementById("PaperButton").disabled = true;
        document.getElementById("ScissorsButton").disabled = true;
        let reset = document.createElement('button');
        reset.style = "position:absolute; left: 60vw; top: 38vw; font-size: 2vw";
        reset.innerHTML = 'Start over';
        reset.id ='Reset';
        reset.addEventListener ("click", ResettoView);
        let body = document.getElementsByTagName("body");
        document.body.appendChild(reset);
    }
    if (loose == 5) {
        document.getElementById("TheEnd").innerHTML="GAME OVER!";
        document.getElementById("RockButton").disabled = true;
        document.getElementById("PaperButton").disabled = true;
        document.getElementById("ScissorsButton").disabled = true;
        let reset = document.createElement('button');
        reset.style = "position:absolute; left: 60vw; top: 38vw; font-size: 2vw";
        reset.innerHTML = 'Start over';
        reset.id ='Reset';
        reset.addEventListener ("click", ResettoView);
        let body = document.getElementsByTagName("body");
        document.body.appendChild(reset);
    }
}
