
/*
Guess a Number rules:Computer pickes a random number from 1 to 100.You can try guessing it by
entering numbers.Game stops if you guess the number righ tor if your guess is wrong 7 times
*/
let computersPick = 0;
let tries = 7;
let guess = "";
let minNumber = 1;
let maxNumber = 100;
const guessMatch = /\d+/;



let GametoView = function() {
    document.getElementById("Start").remove(); //creating a field to show notes of the game's progress
    NoteField = document.createElement('p'); 
    NoteField.id ="NF";
    NoteField.innerHTML = "Computer picked a number from 1 to 100 <br> Try to guess it in 7 tries";
    NoteField.style = `position:absolute; left: 450px; top: 430px;
     height: 30px; size: 30; font-size: 30px;`
    document.body.appendChild(NoteField);
    computersPick = Math.floor(Math.random()*100 + 1);

    GuessField = document.createElement('input'); //creating field to input user's numbers
    GuessField.id ="GF";
    GuessField.type ="text";
    GuessField.value = "";
    GuessField.maxLength="3";
    GuessField.min="1";
    GuessField.max="100";
    GuessField.style = `position:absolute; left: 550px; top: 400px;
    background-color:white; height: 50px; width: 100px; size: 40; font-size: 40px; text-align: center`;
    document.body.appendChild(GuessField);
    GuessField.focus()
    SubmitButton = document.createElement('button'); //creating button to submit user's characters
    SubmitButton.id ="SB";
    SubmitButton.innerHTML = "Submit";
    SubmitButton.style = `position:absolute; left: 650px; top: 400px;
     font-size: 40px; text-align: center`
    SubmitButton.addEventListener("click", SubmittoView);
    document.body.appendChild(SubmitButton);

    UsedField = document.createElement('p');  //creating field to show used numbers
    UsedField.id ="UF";
    UsedField.innerHTML = "Minimum number = 1 <br> Maximum number = 100 <br> Number of tries left: 7";
    UsedField.style = `position:absolute; left: 50px; top: 400px;
     height: 20px; size: 20; font-size: 20px;`
    document.body.appendChild(UsedField);
}

let SubmittoView = function () {
    guess = Number(GuessField.value);
    if (guessMatch.test(guess) != true) {
        NoteField.innerHTML = "Enter a number";
    } 
    else if (guess < minNumber) {
        NoteField.innerHTML = "Enter a number higher than Minimum number";
    } 
    else if (guess > maxNumber) {
        NoteField.innerHTML = "Enter a number lower than Maximum number";
    } 
    else if (guess < computersPick) {
        NoteField.innerHTML = "Try higher";
        GuessField.value = "";
        GuessField.focus();
        minNumber = guess;
        tries-=1;
        UsedField.innerHTML = `Minimum number = ${minNumber} <br> Maximum number = ${maxNumber} 
        <br> Number of tries left: ${tries}`;
        if (tries == 0) {
            NoteField.innerHTML = "You are out of tries. You lost!";
            
            document.getElementById("GF").value = "";
            
            GuessField.readOnly = true;
            document.getElementById("SB").remove();

            RestartButton = document.createElement('button'); //creating 'Restart' button
            RestartButton.id ="RB";
            RestartButton.innerHTML = "Start over";
            RestartButton.style = `position:absolute; left: 600px; top: 400px;
             font-size: 40px; text-align: center`
            RestartButton.addEventListener("click", GameRemoval);
            document.body.appendChild(RestartButton);
        }
        
    }
    else if (guess > computersPick) {
        NoteField.innerHTML = "Try lower";
        GuessField.value = "";
        GuessField.focus();
        maxNumber = guess;
        tries-=1;
        UsedField.innerHTML = `Minimum number = ${minNumber} <br> Maximum number = ${maxNumber} 
        <br> Number of tries left: ${tries}`;
        if (tries == 0) {
            NoteField.innerHTML = "You are out of tries. You lost!";
            
            document.getElementById("GF").value = "";
            
            GuessField.readOnly = true;
            document.getElementById("SB").remove();

            RestartButton = document.createElement('button'); //creating 'Restart' button
            RestartButton.id ="RB";
            RestartButton.innerHTML = "Start over";
            RestartButton.style = `position:absolute; left: 600px; top: 400px;
             font-size: 40px; text-align: center`
            RestartButton.addEventListener("click", GameRemoval);
            document.body.appendChild(RestartButton);
        }
    }
    else {
        NoteField.innerHTML = `Your guess is correct. The number was '${guess}'`;
        document.getElementById("GF").value = "";
        GuessField.readOnly = true;
        document.getElementById("SB").remove();

        RestartButton = document.createElement('button'); //creating 'Restart' button
        RestartButton.id ="RB";
        RestartButton.innerHTML = "Start over";
        RestartButton.style = `position:absolute; left: 600px; top: 400px;
         font-size: 40px; text-align: center`
        RestartButton.addEventListener("click", GameRemoval);
        document.body.appendChild(RestartButton);
    }
}
let GameRemoval = function () { //deleting html elements so GametoView function 
                                  //can create them again
    document.getElementById("UF").remove();
    document.getElementById("RB").remove();
    document.getElementById("NF").remove();
    document.getElementById("GF").remove();
    tries = 7;
    guess = "";
    minNumber = 1;
    maxNumber = 100;
    StartButton = document.createElement('button'); //creating temporaty "Start" button
    StartButton.id ="Start";                        //since GametoView function deletes it
    StartButton.innerHTML = "START";
    StartButton.style = `position: fixed; top: 150px; left: 550px; color:brown`
    StartButton.addEventListener("click", GametoView);
    document.body.appendChild(StartButton);
    

}
