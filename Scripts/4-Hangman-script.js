
let words = ["change", "control", "security", "factory", "stranger", "inspector", "graphic",
"imagination", "athlete", "situation", "location", "highway", "boyfriend", "consequence",
"database", "profession", "criticism", "category", "courage", "efficiency", "addition",
"pollution", "payment", "understanding", "feedback", "suggestion", "restaurant", "philosophy",
"employment", "hospital", "charity", "success", "surgery", "classroom", "airport", "language",
"college", "percentage", "maintenance", "bathroom", "signature", "education", "passenger",
"elephant", "allegator", "universe", "festival", "skyscraper", "overcast", "pronunciation",
"presentation", "suggestion", "diagram", "modification", "language", "research", "increase"];
let word = ""; //variable for random word to guess
let new_word = []; //variable to put guessed letters in proper places
let originalWord = ""; //variable to keep originally picked word
let tries = 0; //variable to count tries, max = 7
let guess = ""; //variable for accepting user's input
let leftpos = 30; //corrdinates for buttons and such
let toppos = 16;  //corrdinates for buttons and such
let leftPos, topPos;
let lettersPlace = 0; //
let PicOrder = 0; // variable to change Hanging picrute
let UFcheck = []; // variable to collect used letters for Used Letters field
const guessMatch = /[A-Za-z]/; //creating regex to check for inproper user's input

let abc = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n",
           "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]

let SubmittoView = function (num) {
    let guess = num;
    if (UFcheck.includes(" " + guess)) {
        NoteField.innerHTML = `Letter '${guess}' was already used`;
    }
    else if (guessMatch.test(guess) != true) {
        NoteField.innerHTML = `Enter a letter`;
    }
    else if (word.includes(guess)) {
        while(word.includes(guess)) {      
            let letter = word.indexOf(guess);
            document.getElementById("lettersId" + letter).value = guess;
            new_word[letter] = guess;
            word[letter] = "-";
        }
        UFcheck.push(" " + guess);
        document.getElementById("UF").innerHTML = "Used letters: " + UFcheck.sort();
        NoteField.innerHTML = `Correct. The word includes letter '${guess}'`;
        if (!(new_word.includes("-"))) {
            NoteField.innerHTML =`You won. The word is: '${originalWord}'`;
            for (let i of abc) {
                document.getElementById("abcID" + i).remove();
            }
            RestartButton = document.createElement('button'); //creating 'Restart' button
            RestartButton.id ="RB";
            RestartButton.innerHTML = "Start over";
            RestartButton.style = `position:absolute; left: 43vw; top: 35vw;
            font-size: 2.3vw; text-align: center; max-width: 15vw`
            RestartButton.addEventListener("click", GameRemoval);
            document.body.appendChild(RestartButton);
        }
    }
    else {
        tries+=1;
        if (tries == 7) {
            NoteField.innerHTML = `You are out of tries. Hanged! The word was: '${originalWord}'`;
            PicOrder+=1;
            document.getElementById("Hanging").src = `Images/4-Hangman/4-${PicOrder}.png`;
            for (let i of abc) {
                document.getElementById("abcID" + i).remove();
            }

            RestartButton = document.createElement('button'); //creating 'Restart' button
            RestartButton.id ="RB";
            RestartButton.innerHTML = "Start over";
            RestartButton.style = `position:absolute; left: 43vw; top: 35vw;
            font-size: 2.3vw; text-align: center; max-width: 15vw`
            RestartButton.addEventListener("click", GameRemoval);
            document.body.appendChild(RestartButton);
        }
        else {
            NoteField.innerHTML = "Your guess is wrong. Try again.";
            PicOrder+=1;
            document.getElementById("Hanging").src = `Images/4-Hangman/4-${PicOrder}.png`;
            UFcheck.push(" " + guess);
            document.getElementById("UF").innerHTML = "Used letters: " + UFcheck.sort();
        }
    } 
}
let GameRemoval = function () { //deleting html elements so GametoView function 
    lettersPlace = 0;           //can create them again
    for (let i of word){
        document.getElementById("lettersId" + lettersPlace).remove();
        lettersPlace+=1;
    }
    lettersPlace = 0;
    document.getElementById("UF").remove();
    document.getElementById("Hanging").src = `Images/4-Hangman/4-0.png`
    document.getElementById("RB").remove();
    document.getElementById("NF").remove();
    word = "";
    new_word = [];
    tries = 0;
    guess = "";
    PicOrder = 0;
    UFcheck = [];
    letter = "";
    leftpos = 30;
    StartButton = document.createElement('button'); //creating temporaty "Start" button
    StartButton.id ="Start";                        //since GametoView function deletes it
    StartButton.innerHTML = "START";
    StartButton.style = `position: absolute; top: 12vw; left: 40vw; color:brown`
    StartButton.addEventListener("click", GametoView);
    document.body.appendChild(StartButton);
}

let GametoView = function() {
    document.getElementById("Start").remove(); //removing start button
    NoteField = document.createElement('p'); //creating correct/wrong notification field
    NoteField.id ="NF";
    NoteField.innerHTML = "";
    NoteField.style = `position:absolute; left: 30vw; top: 19vw; font-size: 2vw; max-width: 50%;`
    document.body.appendChild(NoteField);
    word = words[Math.floor(Math.random()*words.length)].split(""); //computer selects random word
    originalWord = word.join(" ");
    window.word=word; //making 'word' variable global
    for (let l of word){
        new_word.push("-") //creating empty word to fill with characters later
    }
    for (let i of word){ 
        letters = document.createElement('input'); //creating readonly field that will show correctly
        letters.type ="text";                      //guessed characters
        letters.id ="lettersId" + lettersPlace;
        lettersPlace+=1;
        letters.value = " ";
        letters.style = `position:absolute; left: ${leftpos}vw; top: ${toppos}vw;
        background-color:white; font-size: 2.5vw; max-width: 4vw; text-align: center;`
        leftpos+=4
        letters.readOnly = true;
        document.body.appendChild(letters);
    }

    leftPos = 30; //creating virtual keyboard
    topPos = 26;   
    for (let i of abc) {
        if (i === "j") {
            topPos+=5;
            leftPos=30;
        }
        else if (i === "s") {
            topPos+=5;
            leftPos=30;
        }
    abcButton = document.createElement('button'); //creating button to submit user's characters
    abcButton.id ="abcID" + i;
    abcButton.innerHTML = i;
    abcButton.style = `position:absolute; left: ${leftPos}vw; top: ${topPos}vw;
     font-size: 3vw; text-align: center; width: 4vw;`
    abcButton.addEventListener("click", function () {
        SubmittoView(i);
    });
    document.body.appendChild(abcButton);
    leftPos+=5;
    }

    UsedField = document.createElement('p');  //creating field to show used letters
    UsedField.id ="UF";
    UsedField.innerHTML = "Used letters: ";
    UsedField.style = `position:absolute; left: 2vw; top: 33vw;
     font-size: 2vw; max-width: 20vw`
    document.body.appendChild(UsedField);
}
