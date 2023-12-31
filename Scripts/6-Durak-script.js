"use strict"
let talon = {  // the deck
    "01_6Heart": 1,
    "02_7Heart": 2,
    "03_8Heart": 3,
    "04_9Heart": 4,
    "05_1Heart": 5,
    "06_JHeart": 6,
    "07_QHeart": 7,
    "08_KHeart": 8,
    "09_AHeart": 9,
    "10_6Diamo": 1,
    "11_7Diamo": 2,
    "12_8Diamo": 3,
    "13_9Diamo": 4,
    "14_1Diamo": 5,
    "15_JDiamo": 6,
    "16_QDiamo": 7,
    "17_KDiamo": 8,
    "18_ADiamo": 9,
    "19_6Clubs": 1,
    "20_7Clubs": 2,
    "21_8Clubs": 3,
    "22_9Clubs": 4,
    "23_1Clubs": 5,
    "24_JClubs": 6,
    "25_QClubs": 7,
    "26_KClubs": 8,
    "27_AClubs": 9, 
    "28_6Spade": 1,
    "29_7Spade": 2,
    "30_8Spade": 3,
    "31_9Spade": 4,
    "32_1Spade": 5,
    "33_JSpade": 6,
    "34_QSpade": 7,
    "35_KSpade": 8,
    "36_ASpade": 9
  }
let originalTalon = structuredClone(talon); // keeping starting talon keys/valuess for reference
let player1 = {}; // user's cards on the left of the screen
let player2 = {}; // computer's cards on the right of the screen
let suit = ["Hearts", "Diamonds", "Clubs", "Spades"];
let shuffledDeck = {}; //variable for "Shuffle" function
let trump = ""; // var referencing chosen trump suit
let trumpBottomCard; // var for first trump card visible under the deck
let topPos = 10; // variable for coordinates
let leftPos = 2; // variable for coordinates
let picNumber = 1; // numerator for settings ids of cards on hands
let btUparray = []; // array of cards and/or spaces on the table
let btBtarray = []; // array of cards and/or spaces covering btUparray
let a, b, c; // rules for placing a card on the table
let leftPicSrcBuffer, rightPicSrcBuffer; // var to keep original left and right cards picture source
let rightPicCounter; // counter to referense right card pictures;
let moveTracking; // var for keeping track of whos move it is at this moment
let VisibleOrHidden; // var to check if computer's cards are visible or hidden
let totalTableCards = []; //var for computer to check cards placed on the table
let gameEnd = 0; //var to check if no more moves can be done.

function GametoView() {
  document.getElementById("Start").remove(); //removing start button
  let NoteField1 = document.createElement('p'); //creating top notification field
  globalThis.NoteField1;
  NoteField1.id ="NF1";
  NoteField1.innerHTML = "Choose to see or to hide";
  NoteField1.style = `position:absolute; left: 25vw; top: 35vw; font-size: 2vw; max-width:50%`;
  document.body.appendChild(NoteField1);

  let NoteField2 = document.createElement('p'); //creating bottom notification field
  globalThis.NoteField2;
  NoteField2.id ="NF2";
  NoteField2.innerHTML = "computer's cards";
  NoteField2.style = `position:absolute; left: 25vw; top: 37vw; font-size: 2vw; max-width:50%`;
  document.body.appendChild(NoteField2);

  globalThis.mainDeck = document.createElement("img"); //creating an image of a deck
  mainDeck.id = "mD";
  mainDeck.src = "Images/6-Durak/Hidden.png";
  mainDeck.style = `position: absolute; left: 43vw; top: 7vw; border: solid;  max-width:8vw`
  document.body.appendChild(mainDeck);

  let visibleButton = document.createElement("button"); //makes computer cards visible
  globalThis.visibleButton;
  visibleButton.id = "vB";
  visibleButton.innerHTML = "Deal. Computer's cards are visible.";
  visibleButton.style = `position: absolute; left: 30vw; top: 8vw; max-width: 10vw;
  font-size: 1.3vw; text-align: center;`;
  visibleButton.addEventListener("click", shuffleVisible);
  document.body.appendChild(visibleButton);

  let hiddenButton = document.createElement("button"); ////makes computer cards hidden
  globalThis.hiddenButton;
  hiddenButton.id = "hB";
  hiddenButton.innerHTML = "Deal. Computer's cards are hidden.";
  hiddenButton.style = `position: absolute; left: 55vw; top: 8vw; max-width: 10vw;
  font-size: 1.3vw; text-align: center;`;
  hiddenButton.addEventListener("click", shuffleHidden);
  document.body.appendChild(hiddenButton);

  for(let i = 1; i < 37; i++) { // creating future placements of user's cards
    if (i === 13) {
      leftPos = 12;
      topPos = 10;
    }
    else if (i === 25) {
      leftPos = 22;
      topPos = 10;
    }
    let lf = document.createElement('img');
    globalThis.lf;
    lf.id = "lp"+i;
    lf.style = `position: absolute; left: ${leftPos}vw; top: ${topPos}vw; max-width:8vw`;
    topPos += 2;
    document.body.appendChild(lf);
  }
  leftPos = 75;
  topPos = 10;
  for(let i = 1; i < 37; i++) { // creating future placements of computers' cards
    if (i === 13) {
      leftPos = 85;
      topPos = 10;
    }
    else if (i === 25) {
      leftPos = 95;
      topPos = 10;
    }
    let rt = document.createElement('img');
    globalThis.rt;
    rt.id = "rp"+i;
    rt.style = `position: absolute; left: ${leftPos}vw; top: ${topPos}vw; max-width:8vw`;
    topPos += 2;
    document.body.appendChild(rt);
  }
  leftPos = 75; // Hiding computer's cards
  topPos = 10;
  for(let i = 1; i < 37; i++) {
    if (i === 13) {
      leftPos = 85;
      topPos = 10;
    }
    else if (i === 25) {
      leftPos = 95;
      topPos = 10;
    }
    let rtH = document.createElement('img');
    globalThis.rtH;
    rtH.id = "rpH"+i;
    rtH.style = `position: absolute; left: ${leftPos}vw; top: ${topPos}vw; max-width:8vw`;
    topPos += 2;
    document.body.appendChild(rtH);
  }
  leftPos = 25; // creating future placements of attacking cards
  topPos = 24;
  for(let i = 1; i < 7; i++) {
    let btUp = document.createElement('img');
    globalThis.btUp;
    btUp.id = "btU"+i;
    btUparray.push("btU"+i);
    btUp.src = "Images/6-Durak/Blanco.png";
    btUp.style = `position: absolute; left: ${leftPos}vw; top: ${topPos}vw; max-width:8vw`;
    leftPos += 8;
    document.body.appendChild(btUp);
  }
  leftPos = 25; // creating future placements of defending cards
  topPos = 26;
  for(let i = 1; i < 7; i++) {
    let btBt = document.createElement('img');
    globalThis.btBt;
    btBt.id = "btB"+i;
    btBtarray.push("btB"+i);
    btBt.src = "Images/6-Durak/Blanco.png";
    btBt.style = `position: absolute; left: ${leftPos}vw; top: ${topPos}vw; max-width:8vw`;
    leftPos += 8;
    document.body.appendChild(btBt);
  }
}

async function shuffleVisible() { //randomly re-ordering main deck
  await new Promise(r => setTimeout(r, 800));
  while (Object.keys(talon).length != 0) {
    let i = Object.keys(talon)[Math.floor(Math.random()*Object.keys(talon).length)];
    console.log("i = " + i);
    shuffledDeck[i] = talon[i];
    delete talon[i];    
    }
  talon = shuffledDeck;
  shuffledDeck = {};
  VisibleOrHidden = 1;
  deal();
}

async function shuffleHidden() { //randomly re-ordering main deck
  await new Promise(r => setTimeout(r, 800));
  while (Object.keys(talon).length != 0) {
    let i = Object.keys(talon)[Math.floor(Math.random()*Object.keys(talon).length)];
    console.log("i = " + i);
    shuffledDeck[i] = talon[i];
    delete talon[i];    
    }
  talon = shuffledDeck;
  shuffledDeck = {};
  VisibleOrHidden = 0;
  deal();
}

async function deal() {
  
  while (Object.keys(player1).length < 6) { //creating user's and computer's logical hands
    let p1 = Object.keys(talon)[0];
    player1[p1] = talon[p1];
    delete talon[p1];
    let p2 = Object.keys(talon)[0];
    player2[p2] = talon[p2];
    delete talon[p2];
  }

  for (let i of Object.keys(player1)) { //creating user's visible hand
    document.getElementById("lp"+picNumber).src = `Images/6-Durak/${i}.png`;
    document.getElementById("lp"+picNumber).style.border="solid";
    document.getElementById("lp"+picNumber).addEventListener("click", move);
    picNumber++;
  }
  
  arrangePlayer1();
  arrangePlayer2();
  picNumber = 1;
  for (let l of Object.keys(player2)) { //creating computer's visible hand
    document.getElementById("rp"+picNumber).src = `Images/6-Durak/${l}.png`;
    document.getElementById("rp"+picNumber).style.border="solid";
    if (VisibleOrHidden === 0) {
      document.getElementById("rpH"+picNumber).src = `Images/6-Durak/Hidden.png`;
      document.getElementById("rpH"+picNumber).style.border="solid";
    }
    picNumber++;
  }
  picNumber = 1;
  trumpBottomCard = Object.keys(talon)[23]; //selecting trump card and its image on the desk
  delete talon[trumpBottomCard];
  trump = trumpBottomCard.slice(4, );
  trumpSetting();
  let showTrumpCard = document.createElement("img");
  globalThis.showTrumpCard;
  showTrumpCard.src = `Images/6-Durak/${trumpBottomCard}.png`
  showTrumpCard.id = "TC";
  showTrumpCard.style = `position: absolute; left: 43vw; top: 11vw; border: solid; max-width:8vw`
  document.body.appendChild(showTrumpCard);
  document.getElementById("mD").style =`position: absolute; left: 43vw; top: 7vw;
  border: solid; transform: rotate(90deg); max-width:8vw`; //repositioning image of main deck
  document.body.appendChild(mainDeck);
  document.getElementById("vB").remove();
  document.getElementById("hB").remove();

  let talonCount = document.createElement("p"); ////makes computer cards hidden
  globalThis.talonCount;
  talonCount.id = "talonC";
  talonCount.innerHTML = "X" + Object.keys(talon).length;
  talonCount.style = `position: absolute; left: 52vw; top: 9vw; max-width: 10vw;
  font-size: 1.5vw; text-align: center;`;
  document.body.appendChild(talonCount);

  let PassPic = document.createElement("button");
  globalThis.PassPic; 
  PassPic.id = `PP`;
  PassPic.innerHTML = "Pass"
  PassPic.style = `position: absolute; left: 33vw; top: 15vw; max-width: 10vw;
   font-size: 1.3vw; text-align: center;`
  PassPic.style.visibility = "hidden";
  PassPic.addEventListener("click", topUp3);
  document.body.appendChild(PassPic);

  let TakePic = document.createElement("button");
  globalThis.TakePic;
  TakePic.id = `TP`;
  TakePic.innerHTML = "Take"
  TakePic.style = `position: absolute; left: 33vw; top: 15vw; max-width: 10vw;
  font-size: 1.3vw; text-align: center;`
  TakePic.style.visibility = "hidden";
  TakePic.addEventListener("click", takeAll);
  document.body.appendChild(TakePic);

  let p1Score = 1000; //deciding who moves first
  let p2Score = 1000;
  for (let i of Object.values(player1)) {
    if (i > 100) {
      p1Score = i;
      break;
    }
  }
  for (let i of Object.values(player2)) {
    if (i > 100) {
      p2Score = i;
      break;
    }
  }
  if (p1Score < p2Score) {
    document.getElementById("NF1").innerHTML = "You have lowest ranking trump card";
    document.getElementById("NF2").innerHTML = "Your move";
    await new Promise(r => setTimeout(r, 2000));
    document.getElementById("NF1").innerHTML = "Attack or Pass";
    document.getElementById("NF2").innerHTML = "";
    moveTracking = 0;
    document.getElementById("TP").style.visibility = "hidden";
    document.getElementById("PP").style.visibility = "visible";
    return move();
  }
 
  if (p1Score > p2Score) {
    document.getElementById("NF1").innerHTML = "Computer has lowest ranking trump card";
    document.getElementById("NF2").innerHTML = "Computer's move";
    await new Promise(r => setTimeout(r, 2000));
    document.getElementById("NF1").innerHTML = "";
    document.getElementById("NF2").innerHTML = "";
    moveTracking = 1;
    document.getElementById("PP").style.visibility = "hidden";
    document.getElementById("TP").style.visibility = "visible";
    return player2move();
  }
 
  if (p1Score == p2Score) {
    for (let i of Object.values(player1)) {
      if (p1Score > i) {
        p1Score = i;
      }
    }
    for (let i of Object.values(player2)) {
      if (p2Score > i) {
        p2Score = i;
      }
    }
    if (p1Score < p2Score) {
      document.getElementById("NF1").innerHTML = "You have lowest ranking card";
      document.getElementById("NF2").innerHTML = "Your move";
      await new Promise(r => setTimeout(r, 2000));
      document.getElementById("NF1").innerHTML = "Attack or Pass";
      document.getElementById("NF2").innerHTML = "";
      moveTracking = 0;
      document.getElementById("TP").style.visibility = "hidden";
      document.getElementById("PP").style.visibility = "visible";
      return move();
    }
    if (p1Score > p2Score) {
      document.getElementById("NF1").innerHTML = "Computer has lowest ranking card";
      document.getElementById("NF2").innerHTML = "Computer's move";
      await new Promise(r => setTimeout(r, 2000));
      document.getElementById("NF1").innerHTML = "";
      document.getElementById("NF2").innerHTML = "";
      moveTracking = 1;
      document.getElementById("PP").style.visibility = "hidden";
      document.getElementById("TP").style.visibility = "visible";
      return player2move();
    }
    if (p1Score == p2Score) {
      let randomMove = Math.floor(Math.random()*2);
      if (randomMove == 0) {
        document.getElementById("NF1").innerHTML = "No trumps dealt and lowest cards are the same";
        document.getElementById("NF2").innerHTML = "Random rolls your move";
        await new Promise(r => setTimeout(r, 2000));
        document.getElementById("NF1").innerHTML = "Attack or Pass";
        document.getElementById("NF2").innerHTML = "";
        moveTracking = 0;
        document.getElementById("TP").style.visibility = "hidden";
        document.getElementById("PP").style.visibility = "visible";
        return move();
      }
      if (randomMove == 1) {
        document.getElementById("NF1").innerHTML = "No trumps dealt and lowest cards are the same";
        document.getElementById("NF2").innerHTML = "Random rolls computer's move";
        await new Promise(r => setTimeout(r, 2000));
        document.getElementById("NF1").innerHTML = "";
        document.getElementById("NF2").innerHTML = "";
        moveTracking = 1;
        document.getElementById("PP").style.visibility = "hidden";
        document.getElementById("TP").style.visibility = "visible";
        return player2move();
      }
    }
  }
}

function arrangePlayer1() { //re-arranging user's logical and visible cards
  for(let i = 1; i < 37; i++) {
    document.getElementById("lp"+i).src = "Images/6-Durak/Blanco.png";
    document.getElementById("lp"+i).style.border="none";
  }
  player1 = Object.fromEntries(Object.entries(player1).sort((x, y) => {
    let cardA = x.slice(0,2); 
    let cardB = y.slice(0,2); 
    if (cardA < cardB) {
      return -1;
    }
    if (cardA > cardB) {
      return 1;
    }
    return 0;
  }));

  picNumber = 1;
  for (let i of Object.keys(player1)) {
    document.getElementById("lp"+picNumber).src = `Images/6-Durak/${i}.png`;
    document.getElementById("lp"+picNumber).style.border="solid";
    document.getElementById("lp"+picNumber).addEventListener("click", move);
    picNumber++;
  }
}

function arrangePlayer2() { //re-arranging computer's logical and visible cards
  for(let i = 1; i < 37; i++) {
    document.getElementById("rp"+i).src = "Images/6-Durak/Blanco.png";
    document.getElementById("rp"+i).style.border="none";
  }
  for(let i = 1; i < 37; i++) {
    document.getElementById("rpH"+i).src = "Images/6-Durak/Blanco.png";
    document.getElementById("rpH"+i).style.border="none";
  }
  player2 = Object.fromEntries(Object.entries(player2).sort((x, y) => {
    let cardA = x.slice(0,2); 
    let cardB = y.slice(0,2); 
    if (cardA < cardB) {
      return -1;
    }
    if (cardA > cardB) {
      return 1;
    }
    return 0;
  }));

  picNumber = 1;
  for (let i of Object.keys(player2)) {
    document.getElementById("rp"+picNumber).src = `Images/6-Durak/${i}.png`;
    document.getElementById("rp"+picNumber).style.border="solid";
    if (VisibleOrHidden === 0) {
      document.getElementById("rpH"+picNumber).src = `Images/6-Durak/Hidden.png`;
      document.getElementById("rpH"+picNumber).style.border="solid";
    }
    picNumber++;
  }
}

function trumpSetting() { //increasing value of trump cards
  for (let i of Object.keys(talon)) {
    if (i.endsWith(trump)) {
      talon[i] += 100
    };
  }
  for (let i of Object.keys(player1)) {
    if (i.endsWith(trump)) {
      player1[i] += 100
    };
  }
  for (let i of Object.keys(player2)) {
    if (i.endsWith(trump)) {
      player2[i] += 100
    };
  }
  for (let i of Object.keys(originalTalon)) {
    if (i.endsWith(trump)) {
      originalTalon[i] += 100
    };
  }
}

function clearDesk() { //removing logical and visible attacking and defending cards
  btUparray = [];
  btBtarray = [];
  for(let i = 1; i < 7; i++) {
    btUparray.push("btU"+i);
    document.getElementById("btU"+i).src = "Images/6-Durak/Blanco.png";
    document.getElementById("btU"+i).style.border = "none";
  }

  for(let i = 1; i < 7; i++) {
    btBtarray.push("btB"+i);
    document.getElementById("btB"+i).src = "Images/6-Durak/Blanco.png";
    document.getElementById("btB"+i).style.border = "none";
  }
  totalTableCards = [];
}


async function takeAll() { // function for "Take" button. User takes all attacking and 
                           //defending cards from the desk
  document.getElementById("TP").style.visibility = "hidden";
  await new Promise(r => setTimeout(r, 800));
  arrangePlayer1();
  arrangePlayer2();
  let count = 0;
  for (let i of btUparray) {
    count++;
    if (i.startsWith("bt") == false) {
      player1[document.getElementById("btU" + count).src.slice(-13,).slice(0, 9)]=
      originalTalon[document.getElementById("btU" + count).src.slice(-13,).slice(0, 9)]
    }
  }
  count = 0;
  for (let i of btBtarray) {
    count++;
    if (i.startsWith("bt") == false) {
      player1[document.getElementById("btB" + count).src.slice(-13,).slice(0, 9)]=
      originalTalon[document.getElementById("btB" + count).src.slice(-13,).slice(0, 9)]
    }
  }
  topUp3();
}

function sharedTopUp(firstPlayer, x, secondPlayer, y){
  while (Object.keys(firstPlayer).length < 6) {
    if (Object.keys(talon).length == 0 
    && document.getElementById("TC").src.slice(-28, ) != `Images/6-Durak/${trumpBottomCard}.png`) {
      break;
    }
    if (Object.keys(talon).length == 0 
    && document.getElementById("TC").src.slice(-28, )  == `Images/6-Durak/${trumpBottomCard}.png`) {
      firstPlayer[trumpBottomCard] = originalTalon[trumpBottomCard];
      document.getElementById("TC").src = "Images/6-Durak/Blanco.png";
      document.getElementById("TC").style.border="none";
      break;
    }
    if (Object.keys(talon).length != 0) { 
    x = Object.keys(talon)[0];
    firstPlayer[x] = talon[x];
    delete talon[x];
    }
    if (Object.keys(talon).length == 0 ) {
      document.getElementById("mD").src = "Images/6-Durak/Blanco.png";
      document.getElementById("mD").style.border="none";
    }
  }
  while (Object.keys(secondPlayer).length < 6) {
    if (Object.keys(talon).length == 0 
    && document.getElementById("TC").src.slice(-28, )  != `Images/6-Durak/${trumpBottomCard}.png`) {
      break;
    }
    if (Object.keys(talon).length == 0 
    && document.getElementById("TC").src.slice(-28, )  == `Images/6-Durak/${trumpBottomCard}.png`) {
      secondPlayer[trumpBottomCard] = originalTalon[trumpBottomCard]
      document.getElementById("TC").src = "Images/6-Durak/Blanco.png";
      document.getElementById("TC").style.border="none";
      break;
    }
    if (Object.keys(talon).length != 0) { 
      y = Object.keys(talon)[0];
      secondPlayer[y] = talon[y];
      delete talon[y];
      }
    if (Object.keys(talon).length == 0 ) {
      document.getElementById("mD").src = "Images/6-Durak/Blanco.png";
      document.getElementById("mD").style.border="none";
    }
  }
  picNumber = 1;
  for (let l of Object.keys(secondPlayer)) {
    document.getElementById("rp"+picNumber).src = `Images/6-Durak/${l}.png`;
    document.getElementById("rp"+picNumber).style.border="solid";
    picNumber++;
  }
  picNumber = 1;
  for (let i of Object.keys(firstPlayer)) {
    document.getElementById("lp"+picNumber).src = `Images/6-Durak/${i}.png`;
    document.getElementById("lp"+picNumber).style.border="solid";
    document.getElementById("lp"+picNumber).addEventListener("click", move);
    picNumber++;
  }
  if (Object.keys(talon) != 0) {
    document.getElementById("talonC").innerHTML = "X" + Object.keys(talon).length;
  }
  else document.getElementById("talonC").innerHTML = ""; 
  arrangePlayer1();
  arrangePlayer2();
}

function winOrLooseCheck() {
  if (Object.keys(player1) == 0 && Object.keys(player2) == 0) {
    document.getElementById("PP").style.visibility = "hidden";
    document.getElementById("TP").style.visibility = "hidden";
    let RestartButton = document.createElement("button"); // creating a button to restart the game
    RestartButton.id = "RB";
    RestartButton.innerHTML = "Play again";
    RestartButton.style = `position: absolute; left: 43vw; top: 10vw; font-size: 1.5vw;
     text-align: center;`
    RestartButton.addEventListener("click", restart);
    document.body.appendChild(RestartButton);
    document.getElementById("NF1").innerHTML = "Stalemate";
    gameEnd = 1;
 }

 if (Object.keys(player1) == 0) {
   document.getElementById("PP").style.visibility = "hidden";
   document.getElementById("TP").style.visibility = "hidden";
   let RestartButton = document.createElement("button"); // creating a button to restart the game
   RestartButton.id = "RB";
   RestartButton.innerHTML = "Play again";
   RestartButton.style = `position: absolute; left: 43vw; top: 10vw; font-size: 1.5vw;
    text-align: center;`
   RestartButton.addEventListener("click", restart);
   document.body.appendChild(RestartButton);
   document.getElementById("NF1").innerHTML = "You win";
   gameEnd = 1;
 }

 if (Object.keys(player2) == 0) {
   document.getElementById("PP").style.visibility = "hidden";
   document.getElementById("TP").style.visibility = "hidden";
   let RestartButton = document.createElement("button"); // creating a button to restart the game
   RestartButton.id = "RB";
   RestartButton.innerHTML = "Play again";
   RestartButton.style = `position: absolute; left: 43vw; top: 10vw; font-size: 1.5vw;
    text-align: center;`
   RestartButton.addEventListener("click", restart);
   document.body.appendChild(RestartButton);
   document.getElementById("NF1").innerHTML = "Computer wins";
   gameEnd = 1;
 }
}

async function topUp1() { //topping up if computer fails to defend
  await new Promise(r => setTimeout(r, 800));  
  let firstP;
  let secondP;
  globalThis.firstP;
  globalThis.secondP;
  sharedTopUp(player1, firstP, player2, secondP);
  moveTracking = 0;
  document.getElementById("PP").style.visibility = "visible";
  clearDesk();
  winOrLooseCheck();
  if (gameEnd === 0) document.getElementById("NF1").innerHTML = "Attack or pass";
  else {
    picNumber = 1;
    for (let i of Object.keys(player1)) { //to prevent clicking on cards after game's end
      document.getElementById("lp"+picNumber).src = `Images/6-Durak/${i}.png`;
      document.getElementById("lp"+picNumber).style.border="solid";
      picNumber++;
    }
  }
}

async function topUp2() { //topping up if computer finishes attack successfully
  await new Promise(r => setTimeout(r, 800));
  let firstP;
  let secondP;
  globalThis.firstP;
  globalThis.secondP;
  sharedTopUp(player2, secondP, player1, firstP);
  document.getElementById("PP").style.visibility = "visible";
  document.getElementById("TP").style.visibility = "hidden";
  moveTracking = 0;
  clearDesk();
  winOrLooseCheck();
  if (gameEnd === 0) document.getElementById("NF1").innerHTML = "Attack or pass";
  else {
    picNumber = 1;
    for (let i of Object.keys(player1)) { //to prevent clicking on cards after game's end
      document.getElementById("lp"+picNumber).src = `Images/6-Durak/${i}.png`;
      document.getElementById("lp"+picNumber).style.border="solid";
      picNumber++;
    }
  }
}

async function topUp3() { //topping up if user fails to defend
  document.getElementById("PP").style.visibility = "hidden";
  await new Promise(r => setTimeout(r, 800));
  let firstP;
  let secondP;
  globalThis.firstP;
  globalThis.secondP;
  sharedTopUp(player1, firstP, player2, secondP);
  arrangePlayer1();
  arrangePlayer2();
  clearDesk();
  winOrLooseCheck();
  if (gameEnd === 0) player2move(); 
}

async function userAttack(event) {
  document.getElementById("TP").style.visibility = "hidden";
  let breakCheck2 = true;
  let moveCheck2 = true; // variable to check if computer can make a move.
  //----------  event.target.id  targets id of an element which called event listener "click"

  a = false;
  for (let i of btUparray){ //checking attacking cards
    if (i.startsWith(document.getElementById(event.target.id).getAttribute('src').slice(-10, ).slice(0, 1)) == true) {
      a = true;
    }
  }

  b = false
  for (let i of btBtarray){ //checking defending cards
    if (i.startsWith(document.getElementById(event.target.id).getAttribute('src').slice(-10, ).slice(0, 1)) == true) {
      b = true;
    }
  }

  let c = true;
  for (let i of btUparray){
    if (i.slice(0, 3) != "btU") c = false;
  }
     
  if (c == true || a == true || b == true) {
    for (let i of btUparray) { //going through available spaces for cards on the table
      leftPicSrcBuffer = document.getElementById(event.target.id).getAttribute('src');

      if (i.startsWith("bt") == false) continue;

      if (document.getElementById(i).getAttribute('src') === "Images/6-Durak/Blanco.png" &&
       i.startsWith("bt") == true) { //logic for placing cards on empty desk
        let buEqualizer = i.slice(3, ); // var for linking elements of btBtarray and btUparray
        document.getElementById(i).src = document.getElementById(event.target.id).src
        document.getElementById(i).style.border = "solid";
        document.getElementById(event.target.id).src = "Images/6-Durak/Blanco.png";
        document.getElementById(event.target.id).style.border = "none";
        await new Promise(r => setTimeout(r, 800));
          
        let ind = btUparray.indexOf(i); // updating array of cards/spaces on the table
        btUparray[ind] = leftPicSrcBuffer.slice(-10, ).slice(0, 2);
        delete player1[leftPicSrcBuffer.slice(-13, ).slice( 0,-4)];
          //-----------------removing event listener "click" from empty spaces
        document.getElementById(event.target.id).removeEventListener("click", move);
        rightPicCounter = 0;
        for (let i of Object.keys(player2)) { // computer's defense
          rightPicCounter++;
          if (i.includes(leftPicSrcBuffer.slice(-9, ).slice( 0,-4)) == true  &&
           player2[i] > originalTalon[leftPicSrcBuffer.slice(-13 ,).slice( 0,-4)] &&
           player2[i] < 100) {
            rightPicSrcBuffer = document.getElementById("rp"+rightPicCounter).getAttribute('src');
            document.getElementById("btB"+buEqualizer).src = `Images/6-Durak/${i}.png`;
            document.getElementById("btB"+buEqualizer).style.border = "solid";
            document.getElementById("rp"+rightPicCounter).src = "Images/6-Durak/Blanco.png";
            document.getElementById("rp"+rightPicCounter).style.border = "none";
            await new Promise(r => setTimeout(r, 800));
            let ind2 = btBtarray.indexOf("btB"+buEqualizer); // updating array of cards/spaces on the table
            btBtarray[ind2] = rightPicSrcBuffer.slice(-10, ).slice(0, 2);
            breakCheck2 = false;
            moveCheck2 = false
            delete player2[i];
            arrangePlayer1();
            arrangePlayer2();
            if (Object.keys(player2).length == 0) {
              topUp2();
            }
            break;
          }
        }
        if (moveCheck2) {
          rightPicCounter = 0;
          for (let i of Object.keys(player2)) {
            rightPicCounter++;
            if (player2[i] > originalTalon[leftPicSrcBuffer.slice(-13 ,).slice( 0,-4)] &&
             player2[i] > 100) {
              rightPicSrcBuffer = document.getElementById("rp"+rightPicCounter).getAttribute('src');
              document.getElementById("btB"+buEqualizer).src = `Images/6-Durak/${i}.png`;
              document.getElementById("btB"+buEqualizer).style.border = "solid";
              document.getElementById("rp"+rightPicCounter).src = "Images/6-Durak/Blanco.png";
              document.getElementById("rp"+rightPicCounter).style.border = "none";
              await new Promise(r => setTimeout(r, 800));
              let ind2 = btBtarray.indexOf("btB"+buEqualizer); // updating array of cards/spaces on the table
              btBtarray[ind2] = rightPicSrcBuffer.slice(-10, ).slice(0, 2);
              delete player2[i];
              breakCheck2 = false;
              arrangePlayer1();
              arrangePlayer2();
              if (Object.keys(player2).length == 0) {
                topUp2();
              }
              break;
            }
          }
        }
        if (breakCheck2) {
          arrangePlayer1();
          arrangePlayer2();
          let count = 0;
          for (let i of btUparray) {
            count++;
            if (i.startsWith("bt") == false) {
              player2[document.getElementById("btU" + count).src.slice(-13,).slice(0, 9)]=
              originalTalon[document.getElementById("btU" + count).src.slice(-13,).slice(0, 9)]
            }
          }
          count = 0;
          for (let i of btBtarray) {
            count++;
            if (i.startsWith("bt") == false) {
              player2[document.getElementById("btB" + count).src.slice(-13,).slice(0, 9)]=
              originalTalon[document.getElementById("btB" + count).src.slice(-13,).slice(0, 9)]
            }
          }
          topUp1();
          break;
        }
        break;
      }
    }
  }
}

async function userDefense(event){
  document.getElementById("PP").style.visibility = "hidden";

  for (let i of btUparray) {
    if (i.startsWith("bt") == true) {
      let suitClicked = document.getElementById(event.target.id).getAttribute('src').slice(-9,).slice( 0,-4);
      let suitAttacked = document.getElementById("btU" + (i.slice(3, 4) -1 )).getAttribute('src').slice(-9, ).slice( 0,-4);
      let valueClicked = player1[document.getElementById(event.target.id).getAttribute('src').slice(-13, ).slice( 0,-4)];
      let valueAttacked = originalTalon[document.getElementById("btU" + (i.slice(3, 4) -1 )).getAttribute('src').slice(-13,).slice( 0,-4)];
      if (suitClicked == suitAttacked &&
       valueClicked > valueAttacked &&
       valueClicked < 100) {
        leftPicSrcBuffer = document.getElementById(event.target.id).getAttribute('src');
        document.getElementById("btB" + (i.slice(3, 4) -1)).src = document.getElementById(event.target.id).src
        document.getElementById("btB" + (i.slice(3, 4) -1)).style.border = "solid";
        document.getElementById(event.target.id).src = "Images/6-Durak/Blanco.png";
        document.getElementById(event.target.id).style.border = "none";
        document.getElementById("TP").style.visibility = "hidden";
        await new Promise(r => setTimeout(r, 800));
        let ind3 = btUparray.indexOf(i); // updating array of cards/spaces on the table
        btBtarray[ind3-1] = leftPicSrcBuffer.slice(-10, ).slice(0, 2);
        delete player1[leftPicSrcBuffer.slice(-13,).slice( 0,-4)];
        arrangePlayer1();
        if (Object.keys(player1).length == 0) {
          return topUp2();
        }
        return player2move();
      }
      if (valueClicked > valueAttacked && valueClicked > 100) {
        leftPicSrcBuffer = document.getElementById(event.target.id).getAttribute('src');
        document.getElementById("btB" + (i.slice(3, 4) -1)).src = document.getElementById(event.target.id).src
        document.getElementById("btB" + (i.slice(3, 4) -1)).style.border = "solid";
        document.getElementById(event.target.id).src = "Images/6-Durak/Blanco.png";
        document.getElementById(event.target.id).style.border = "none";
        document.getElementById("TP").style.visibility = "hidden";
        await new Promise(r => setTimeout(r, 800));
        let ind3 = btUparray.indexOf(i); // updating array of cards/spaces on the table
        btBtarray[ind3-1] = leftPicSrcBuffer.slice(-10, ).slice(0, 2);
        delete player1[leftPicSrcBuffer.slice(15,).slice( 0,-4)];
        arrangePlayer1();
        if (Object.keys(player1).length == 0) {
          return topUp2();
        }
        return player2move();
      }
      else break;
    }
  }
}

async function move() { // player1's (user's) move
  if (moveTracking == 0) userAttack(event);
  else userDefense(event);
}

async function player2move() { // computer's attack logic
  document.getElementById("PP").style.visibility = "hidden";
  document.getElementById("TP").style.visibility = "hidden";
  document.getElementById("NF1").innerHTML = "Computer's move";
  document.getElementById("NF2").innerHTML = "";
  await new Promise(r => setTimeout(r, 1500));
  document.getElementById("NF1").innerHTML = "";
  document.getElementById("NF2").innerHTML = "";
  let minValuePlayer2= 0;
  let currentValuePlayer2 = 0;
  let currentCardPlayer2 = "";
  let currentPlayer2Pic = 0;
  totalTableCards = []; //var for computer to check cards placed on the table
  moveTracking = 1;

  for (let i of btUparray) { //going through available spaces for cards on the table
    let breakCheck1 = false; //variable to break out from nested loops
    let passCheck1 = true; //variable to referense if no move move possible with current hand
    minValuePlayer2= 0;
    currentValuePlayer2 = 0;
    totalTableCards = {};
    let count = 0;
    for (let i of btUparray) {
      count++;
      if (i.startsWith("bt") == false) {
        let k = document.getElementById("btU"+count).getAttribute('src').slice(-13).slice(0, -4);
        for (let i in originalTalon) {
          if (i == k) {
            totalTableCards[i] = originalTalon[i]
          }
        }
      }  
    }
    count = 0;
    for (let i of btBtarray) {
      count++;
      if (i.startsWith("bt") == false) {
        let k = document.getElementById("btB"+count).getAttribute('src').slice(-13).slice(0, -4);
        for (let i in originalTalon) {
          if (i == k) {
            totalTableCards[i] = originalTalon[i]
          }
        }
      }
    }
    count = 0;
    for (let i of Object.values(totalTableCards)) {
      if (i > 100) {
        totalTableCards[Object.keys(totalTableCards)[count]] = i - 100;
      }
      count++;
    }
    if (i.startsWith("bt") == true && Object.keys(totalTableCards).length == 0) {
      let buEqualizer = i.slice(3, ); // var for linking elements of btBtarray and btUparray
      rightPicCounter = 0;
      for (let i of Object.keys(player2)) {
        rightPicCounter++;
        if (minValuePlayer2 == 0) {
          minValuePlayer2 = player2[i];
          currentCardPlayer2 = i;
          currentPlayer2Pic = rightPicCounter;
        }
        currentValuePlayer2 = player2[i];
        if (minValuePlayer2  > currentValuePlayer2) {
          minValuePlayer2  = currentValuePlayer2;
          currentCardPlayer2 = i;
          currentPlayer2Pic = rightPicCounter;
        }
      }
      rightPicSrcBuffer = document.getElementById("rp"+currentPlayer2Pic).getAttribute('src');
      document.getElementById("rp"+currentPlayer2Pic).src = "Images/6-Durak/Blanco.png";
      document.getElementById("rp"+currentPlayer2Pic).style.border = "none";
      document.getElementById("btU" + buEqualizer).src = rightPicSrcBuffer
      document.getElementById("btU" + buEqualizer).style.border = "solid";
      document.getElementById("NF1").innerHTML = "Beat or Take";
      document.getElementById("TP").style.visibility = "visible";
      await new Promise(r => setTimeout(r, 800));
      btUparray[buEqualizer -1] = rightPicSrcBuffer.slice(-10, ).slice(0, 2);
      delete player2[rightPicSrcBuffer.slice(-13, ).slice( 0,-4)];
      arrangePlayer1();
      arrangePlayer2();
      break;
    }
    if (i.startsWith("bt") == true && Object.keys(totalTableCards).length != 0) {
      let buEqualizer = i.slice(3, );
      totalTableCards = Object.fromEntries(Object.entries(totalTableCards).sort((x, y) => {
        let cardA = x.slice(0,2); 
        let cardB = y.slice(0,2); 
        if (cardA < cardB) {
          return -1;
        }
        if (cardA > cardB) {
          return 1;
        }
        return 0;
      }));

      let counter = 0;
      for (let i of Object.values(player2)) {
        counter++;
        if (Object.values(totalTableCards).includes(i)) {
          rightPicSrcBuffer = document.getElementById("rp"+(counter)).getAttribute('src');
          document.getElementById("rp"+(counter)).src = "Images/6-Durak/Blanco.png"
          document.getElementById("rp"+(counter)).style.border = "none";
          document.getElementById("btU" + buEqualizer).src = rightPicSrcBuffer
          document.getElementById("btU" + buEqualizer).style.border = "solid";
          document.getElementById("NF1").innerHTML = "Beat or Take";
          document.getElementById("TP").style.visibility = "visible";
          await new Promise(r => setTimeout(r, 800));
          btUparray[buEqualizer -1] = rightPicSrcBuffer.slice(-10, ).slice(0, 2);
          delete player2[rightPicSrcBuffer.slice(-13, ).slice( 0,-4)];
          arrangePlayer1();
          arrangePlayer2();
          breakCheck1 = true;
          passCheck1 = false
          break;
        }
      }
      if (breakCheck1) break;
      let tracker = 0;
      for (let i of Object.values(player2)) {
        tracker ++;
        if (i > 100) {
          i -= 100;
         if (Object.values(totalTableCards).includes(i)) {
          rightPicSrcBuffer = document.getElementById("rp"+(tracker)).getAttribute('src');
          document.getElementById("rp"+(tracker)).src = "Images/6-Durak/Blanco.png"
          document.getElementById("rp"+(tracker)).style.border = "none";
          document.getElementById("btU" + buEqualizer).src = rightPicSrcBuffer
          document.getElementById("btU" + buEqualizer).style.border = "solid";
          document.getElementById("NF1").innerHTML = "Beat or take";
          document.getElementById("TP").style.visibility = "visible";
          await new Promise(r => setTimeout(r, 800));
          btUparray[buEqualizer -1] = rightPicSrcBuffer.slice(-10, ).slice(0, 2);
          delete player2[rightPicSrcBuffer.slice(-13, ).slice( 0,-4)];
          arrangePlayer1();
          arrangePlayer2();
          breakCheck1 = true;
          passCheck1 = false;
          break;
          }
        } 
      }
      if (Object.keys(player2).length == 0) {
        return topUp2();
      }
      if (breakCheck1) break;
      if (passCheck1) {
        return topUp2();
      }
    }
  }  
} 
function restart() { // function to prepare the code for another play
  clearDesk();
  document.getElementById("RB").remove();
  document.getElementById("TC").remove();
  document.getElementById("mD").remove();
  document.getElementById("PP").remove();
  document.getElementById("TP").remove();
  document.getElementById("NF1").remove();
  document.getElementById("NF2").remove();
  document.getElementById("talonC").remove();
  
  for(let i = 1; i < 37; i++) {
    document.getElementById("lp"+i).src = "Images/6-Durak/Blanco.png";
    document.getElementById("lp"+i).style.border="none";
  }
  for(let i = 1; i < 37; i++) {
    document.getElementById("rp"+i).src = "Images/6-Durak/Blanco.png";
    document.getElementById("rp"+i).style.border="none";
    document.getElementById("rpH"+i).src = "Images/6-Durak/Blanco.png";
    document.getElementById("rpH"+i).style.border="none";
  }
  let StartButton = document.createElement("button"); 
  StartButton.id = "Start";
  StartButton.innerHTML = "Start";
  StartButton.addEventListener("click", GametoView);
  document.body.appendChild(StartButton);
  talon = {
    "01_6Heart": 1,
    "02_7Heart": 2,
    "03_8Heart": 3,
    "04_9Heart": 4,
    "05_1Heart": 5,
    "06_JHeart": 6,
    "07_QHeart": 7,
    "08_KHeart": 8,
    "09_AHeart": 9,
    "10_6Diamo": 1,
    "11_7Diamo": 2,
    "12_8Diamo": 3,
    "13_9Diamo": 4,
    "14_1Diamo": 5,
    "15_JDiamo": 6,
    "16_QDiamo": 7,
    "17_KDiamo": 8,
    "18_ADiamo": 9,
    "19_6Clubs": 1,
    "20_7Clubs": 2,
    "21_8Clubs": 3,
    "22_9Clubs": 4,
    "23_1Clubs": 5,
    "24_JClubs": 6,
    "25_QClubs": 7,
    "26_KClubs": 8,
    "27_AClubs": 9, 
    "28_6Spade": 1,
    "29_7Spade": 2,
    "30_8Spade": 3,
    "31_9Spade": 4,
    "32_1Spade": 5,
    "33_JSpade": 6,
    "34_QSpade": 7,
    "35_KSpade": 8,
    "36_ASpade": 9
  }
  originalTalon = structuredClone(talon);
  player1 = {};
  player2 = {};
  shuffledDeck = {};
  topPos = 10;
  leftPos = 2;
  picNumber = 1;
  btUparray = [];
  btBtarray = [];
  totalTableCards = [];
}
