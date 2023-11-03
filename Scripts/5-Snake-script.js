"use strict"

let current = 145; //snake head's location
let up = 0; //checks if arrow up was pressed
let down = 0; //checks if arrow down was pressed
let left = 0; //checks if arrow left was pressed
let right = 2; //checks if arrow right was pressed
let chain = {"c1" : 145, "c2" : 144, "c3" : 143}; //information for placement off first 3 links of the snake
let link = 3; // number of current links in the snake
let LeftAndRightBorders = []; //array for left and right borders of the grid
let exhaust = 0; // snake's rear end
let leftPos; // left coordinate
let topPos;// right coordinate
let rabbit; // to track a rabbit placement on the grid
let score = 0; // score
let mud; // to track mud placement on the grid
let collisionDetect = 0; //variable to detect collision.

let ScoreField = document.createElement('p'); // field to see score
ScoreField.id ="SF";
ScoreField.innerHTML = "Score: 0";
ScoreField.style = `position:absolute; left: 60vw; top: 3vw; font-size: 1.7vw; max-width:10%`;
document.body.appendChild(ScoreField);

let NoteField = document.createElement('p'); 
NoteField.id ="NF";
NoteField.innerHTML = "Use arrows on keyboard or click/tap onscreen arrows";
NoteField.style = `position:absolute; left: 50vw; top: 38vw; font-size: 1.4vw; max-width:30%`;
document.body.appendChild(NoteField);

let grid = []; // field for placement of the rest elements of the game
for (let i = 1; i <= 400; i++) {
    grid.push("t"+i)
}
leftPos = 5;
topPos = 5;

//visualization of empty grid
let iArray = [20, 40, 60, 80, 100, 120, 140, 160, 180, 200, 220, 240, 260, 280, 300, 320, 340, 360, 380];
let topPosArray = [6.8, 8.6, 10.4, 12.2, 14, 15.8, 17.6, 19.4, 21.2, 23, 24.8, 26.6, 28.4, 30.2, 32, 33.8,
                 35.6, 37.4, 39.2];
for(let i = 0; i < 400; i++) { 
    if (iArray.includes(i)) {
        LeftAndRightBorders.push(i);
        let k = iArray.indexOf(i);
        leftPos = 5;
        topPos = topPosArray[k];
    }
    let t = document.createElement('img');
    t.id = "t"+i;
    t.style = `position: absolute; left: ${leftPos}vw; top: ${topPos}vw;
     max-width:1.8vw; border:solid; border-width:0.1vw`;
    t.src = "Images/5-Snake/Empty-.png";
    leftPos += 1.8;
    document.body.appendChild(t);
}   
LeftAndRightBorders.push("0"); 
LeftAndRightBorders.push("400");

document.getElementById("t"+(current)).src = "Images/5-Snake/HeadRt.png"; // placing snake on the grid
document.getElementById("t"+(current-1)).src = "Images/5-Snake/BodyRL.png";
document.getElementById("t"+(current-2)).src = "Images/5-Snake/TailRt.png";

function collisionRules() {
    if (document.getElementById("t"+chain["c1"]).src.slice(-10, ) === "BodyRL.png" ||
    document.getElementById("t"+chain["c1"]).src.slice(-10, ) === "BodyUD.png" ||
    document.getElementById("t"+chain["c1"]).src.slice(-10, ) === "TailDn.png" ||
    document.getElementById("t"+chain["c1"]).src.slice(-10, ) === "TailUp.png" ||
    document.getElementById("t"+chain["c1"]).src.slice(-10, ) === "TailLt.png" ||
    document.getElementById("t"+chain["c1"]).src.slice(-10, ) === "TailRt.png" ||
    document.getElementById("t"+chain["c1"]).src.slice(-10, ) === "TnLDUR.png" ||
    document.getElementById("t"+chain["c1"]).src.slice(-10, ) === "TnLUDR.png" ||
    document.getElementById("t"+chain["c1"]).src.slice(-10, ) === "TnRDUL.png" ||
    document.getElementById("t"+chain["c1"]).src.slice(-10, ) === "TnRUDL.png" ||   
    chain["c1"]=== exhaust) {
        alert("You bit yourself! The game ends with the score of " + score);
        return collisionDetect = 1;
    }
    if (document.getElementById("t"+chain["c1"]).src.slice(-10, ) === "MudMud.png" ) {
        alert("You stuck in mud! The game ends with the score of " + score);
        return collisionDetect = 1;
    }
    if (chain["c1"] === rabbit) {
        link++;
        chain["c"+ link] = chain[Object.keys(chain)[Object.keys(chain).length-1]]
        score+=10
        ScoreField.innerHTML = "Score: " + score;
        return rabbitSpawn();
    }
}
async function UpPress() { //triggers by pressing/clicking/tapping arrow up
    let restartMonitor = 0; //variable to check if game should be restarted
    if (down === 1 || up ===1) return null;
    right = 0;
    left = 0;
    down = 0;
    up = 1;
    while (up === 1) {
        await new Promise(r => setTimeout(r, 200));
        let exhaust = chain[Object.keys(chain)[Object.keys(chain).length-1]];
        for (let i = 1; i <= Object.keys(chain).length -1 ; i++) {
            chain[Object.keys(chain)[Object.keys(chain).length - i]] =
            chain[Object.keys(chain)[Object.keys(chain).length - (i+1)]];
        }
        current = current-20;
        chain["c1"] = current;

        if (grid.includes("t" + (current+1)) != true) {
            alert("You crashed in to the wall! The game ends with the score of " + score);
            restartMonitor = 1;
            break;
        }
        collisionRules();
        if (collisionDetect === 1) {
            restartMonitor = 1;
            collisionDetect = 0;
            break;
        }

        document.getElementById("t"+ chain["c1"]).src = "Images/5-Snake/HeadUp.png";
        for (let i = 1; i< Object.keys(chain).length-1; i++) {
            let firstLink = chain[Object.keys(chain)[i-1]];
            let middleLink = chain[Object.keys(chain)[i]];
            let lastLink = chain[Object.keys(chain)[i+1]];
            let lastValue = chain[Object.keys(chain)[Object.keys(chain).length - 1]];
            if (firstLink === middleLink - 20 && lastLink === middleLink - 1) {
                document.getElementById("t"+chain["c"+(i+1)]).src = "Images/5-Snake/TnRUDL.png";
            }
            if (firstLink === middleLink - 20 && lastLink === middleLink + 1) {
                document.getElementById("t"+chain["c"+(i+1)]).src = "Images/5-Snake/TnLUDR.png";
            }
            if (firstLink === middleLink - 20 && lastLink === middleLink + 20) {
                document.getElementById("t"+chain["c"+(i+1)]).src = "Images/5-Snake/BodyUD.png";
            }
            if (firstLink === middleLink - 1 && lastLink === middleLink + 1) {
                document.getElementById("t"+chain["c"+(i+1)]).src = "Images/5-Snake/BodyRL.png";
            }
            if (firstLink === middleLink + 1 && lastLink === middleLink - 1) {
                document.getElementById("t"+chain["c"+(i+1)]).src = "Images/5-Snake/BodyRL.png";
            }
            if (middleLink === lastLink -1 && lastLink === lastValue){
                document.getElementById("t"+chain["c"+(i+2)]).src = "Images/5-Snake/TailLt.png";
            }
            if (middleLink === lastLink + 1 && lastLink === lastValue){
                document.getElementById("t"+chain["c"+(i+2)]).src = "Images/5-Snake/TailRt.png";
            }
            if (middleLink === lastLink + 20 && lastLink === lastValue){
                document.getElementById("t"+chain["c"+(i+2)]).src = "Images/5-Snake/TailDn.png";
            }
            if (middleLink=== lastLink - 20 && lastLink === lastValue){
                document.getElementById("t"+chain["c"+(i+2)]).src = "Images/5-Snake/TailUp.png";
            }
        }
        document.getElementById("t"+ exhaust).src = "Images/5-Snake/Empty-.png";
    }
    if (restartMonitor === 1) cleanUp();
}

async function DownPress() { //triggers by pressing/clicking/tapping arrow down
    let restartMonitor = 0; //variable to check if game should be restarted
    if (up === 1 || down ===1) return null;
    right = 0;
    left = 0;
    down = 1;
    up = 0;

    while (down === 1) {
        await new Promise(r => setTimeout(r, 200));
        exhaust = chain[Object.keys(chain)[Object.keys(chain).length-1]];
        for (let i = 1; i <= Object.keys(chain).length -1 ; i++) {
            chain[Object.keys(chain)[Object.keys(chain).length - i]] =
            chain[Object.keys(chain)[Object.keys(chain).length - (i+1)]];
        }
        current = current+20;
        chain["c1"] = current;

        if (grid.includes("t" + current) != true || current === 400) {
            alert("You crashed in to the wall! The game ends with the score of " + score);
            restartMonitor = 1;
            break;
        }

        collisionRules();
        if (collisionDetect === 1) {
            restartMonitor = 1;
            collisionDetect = 0;
            break;
        }

        document.getElementById("t"+ chain["c1"]).src = "Images/5-Snake/HeadDn.png";
        for (let i = 1; i< Object.keys(chain).length-1; i++) {
            let firstLink = chain[Object.keys(chain)[i-1]];
            let middleLink = chain[Object.keys(chain)[i]];
            let lastLink = chain[Object.keys(chain)[i+1]];
            let lastValue = chain[Object.keys(chain)[Object.keys(chain).length - 1]];
            if (firstLink === middleLink + 20 && lastLink === middleLink - 1) {
                document.getElementById("t"+chain["c"+(i+1)]).src = "Images/5-Snake/TnRDUL.png";
            }
            if (firstLink === middleLink + 20 && lastLink === middleLink + 1) {
                document.getElementById("t"+chain["c"+(i+1)]).src = "Images/5-Snake/TnLDUR.png";
            }
            if (firstLink === middleLink + 20 && lastLink === middleLink - 20) {
                document.getElementById("t"+chain["c"+(i+1)]).src = "Images/5-Snake/BodyUD.png";
            }
            if (firstLink === middleLink - 1 && lastLink === middleLink + 1) {
                document.getElementById("t"+chain["c"+(i+1)]).src = "Images/5-Snake/BodyRL.png";
            }
            if (firstLink === middleLink + 1 && lastLink === middleLink - 1) {
                document.getElementById("t"+chain["c"+(i+1)]).src = "Images/5-Snake/BodyRL.png";
            }
            if (middleLink === lastLink - 1 && lastLink === lastValue){
                document.getElementById("t"+chain["c"+(i+2)]).src = "Images/5-Snake/TailLt.png";
            }
            if (middleLink === lastLink + 1 && lastLink === lastValue){
                document.getElementById("t"+chain["c"+(i+2)]).src = "Images/5-Snake/TailRt.png";
            }
            if (middleLink === lastLink + 20 && lastLink === lastValue){
                document.getElementById("t"+chain["c"+(i+2)]).src = "Images/5-Snake/TailDn.png";
            }
            if (middleLink === lastLink - 20 && lastLink === lastValue){
                document.getElementById("t"+chain["c"+(i+2)]).src = "Images/5-Snake/TailUp.png";
        }
        }
        document.getElementById("t"+ exhaust).src = "Images/5-Snake/Empty-.png";
    }
    if (restartMonitor === 1) cleanUp();
}

async function LeftPress() { //triggers by pressing/clicking/tapping arrow left
    let restartMonitor = 0; //variable to check if game should be restarted
    if (right === 1 || right === 2 || left ===1) return null;
    right = 0;
    left = 1;
    down = 0;
    up = 0;
    while (left === 1) {
        await new Promise(r => setTimeout(r, 200));
        exhaust = chain[Object.keys(chain)[Object.keys(chain).length - 1]];
        for (let i = 1; i <= Object.keys(chain).length -1 ; i++) {
            chain[Object.keys(chain)[Object.keys(chain).length - i]] =
            chain[Object.keys(chain)[Object.keys(chain).length - (i+1)]];
        }
        current = current-1;
        chain["c1"] = current;

        if (LeftAndRightBorders.includes(chain["c1"]+1) == true || chain["c1"] === -1) {
            alert("You crashed in to the wall! The game ends with the score of " + score);
            restartMonitor = 1;
            break;          
        }
        collisionRules();
        if (collisionDetect === 1) {
            restartMonitor = 1;
            collisionDetect = 0;
            break;
        }

        document.getElementById("t"+ chain["c1"]).src = "Images/5-Snake/HeadLt.png";
        for (let i = 1; i< Object.keys(chain).length-1; i++) {
            let firstLink = chain[Object.keys(chain)[i-1]];
            let middleLink = chain[Object.keys(chain)[i]];
            let lastLink = chain[Object.keys(chain)[i+1]];
            let lastValue = chain[Object.keys(chain)[Object.keys(chain).length - 1]];
            if (firstLink === middleLink - 1 && lastLink === middleLink + 20) {
                document.getElementById("t"+chain["c"+(i+1)]).src = "Images/5-Snake/TnRDUL.png";
            }
            if (firstLink === middleLink - 1 && lastLink === middleLink - 20) {
                document.getElementById("t"+chain["c"+(i+1)]).src = "Images/5-Snake/TnRUDL.png";
            }
            if (firstLink === middleLink + 20 && lastLink === middleLink - 20) {
                document.getElementById("t"+chain["c"+(i+1)]).src = "Images/5-Snake/BodyUD.png";
            }
            if (firstLink === middleLink - 1 && lastLink === middleLink + 1) {
                document.getElementById("t"+chain["c"+(i+1)]).src = "Images/5-Snake/BodyRL.png";
            }
            if (firstLink === middleLink + 1 && lastLink === middleLink - 1) {
                document.getElementById("t"+chain["c"+(i+1)]).src = "Images/5-Snake/BodyRL.png";
            }
            if (middleLink === lastLink - 1 && lastLink === lastValue){
                document.getElementById("t"+chain["c"+(i+2)]).src = "Images/5-Snake/TailLt.png";
            } 
            if (middleLink === lastLink + 1 && lastLink === lastValue){
                document.getElementById("t"+chain["c"+(i+2)]).src = "Images/5-Snake/TailRt.png";
            }
            if (middleLink === lastLink + 20 && lastLink === lastValue){
                document.getElementById("t"+chain["c"+(i+2)]).src = "Images/5-Snake/TailDn.png";
            }
            if (middleLink === lastLink - 20 && lastLink === lastValue){
                document.getElementById("t"+chain["c"+(i+2)]).src = "Images/5-Snake/TailUp.png";
            }
        }
        document.getElementById("t"+ exhaust).src = "Images/5-Snake/Empty-.png";
    }
    if (restartMonitor === 1) cleanUp();
}

async function RightPress() { //triggers by pressing/clicking/tapping arrow right
    let restartMonitor = 0; //variable to check if game should be restarted
    if (left === 1 || right === 1 ) return null;
    right = 1;
    left = 0;
    down = 0;
    up = 0;
    while (right === 1) {
        await new Promise(r => setTimeout(r, 200));
        exhaust = chain[Object.keys(chain)[Object.keys(chain).length - 1]];
        for (let i = 1; i <= Object.keys(chain).length -1 ; i++) {
            chain[Object.keys(chain)[Object.keys(chain).length - i]] =
            chain[Object.keys(chain)[Object.keys(chain).length - (i+1)]];
        }
        current = current+1;
        chain["c1"] = current;

        if (LeftAndRightBorders.includes(chain["c1"]) == true || chain["c1"] === 400) {
            alert("You crashed in to the wall! The game ends with the score of " + score);
            restartMonitor = 1;
            break;
        }
        collisionRules();
        if (collisionDetect === 1) {
            restartMonitor = 1;
            collisionDetect = 0;
            break;
        }

        document.getElementById("t"+ chain["c1"]).src = "Images/5-Snake/HeadRt.png";
        for (let i = 1; i< Object.keys(chain).length-1; i++) {
            let firstLink = chain[Object.keys(chain)[i-1]];
            let middleLink = chain[Object.keys(chain)[i]];
            let lastLink = chain[Object.keys(chain)[i+1]];
            let lastValue = chain[Object.keys(chain)[Object.keys(chain).length - 1]];
            if (firstLink === middleLink + 1 && lastLink === middleLink + 20) {
                document.getElementById("t"+chain["c"+(i+1)]).src = "Images/5-Snake/TnLDUR.png";
            }
            if (firstLink === middleLink + 1 && lastLink === middleLink - 20) {
                document.getElementById("t"+chain["c"+(i+1)]).src = "Images/5-Snake/TnLUDR.png";
            }
            if (firstLink === middleLink + 20 && lastLink === middleLink - 20) {
                document.getElementById("t"+chain["c"+(i+1)]).src = "Images/5-Snake/BodyUD.png";
            }
            if (firstLink === middleLink - 1 && lastLink === middleLink + 1) {
                document.getElementById("t"+chain["c"+(i+1)]).src = "Images/5-Snake/BodyRL.png";
            }
            if (firstLink === middleLink + 1 && lastLink === middleLink - 1) {
                document.getElementById("t"+chain["c"+(i+1)]).src = "Images/5-Snake/BodyRL.png";
            }
            if (middleLink === lastLink - 1 && lastLink === lastValue){
                document.getElementById("t"+chain["c"+(i+2)]).src = "Images/5-Snake/TailLt.png";
            }
            if (middleLink === lastLink + 1 && lastLink === lastValue){
                document.getElementById("t"+chain["c"+(i+2)]).src = "Images/5-Snake/TailRt.png";
            }
            if (middleLink === lastLink + 20 && lastLink === lastValue){
                document.getElementById("t"+chain["c"+(i+2)]).src = "Images/5-Snake/TailDn.png";
            }
            if (middleLink === lastLink - 20 && lastLink === lastValue){
               document.getElementById("t"+chain["c"+(i+2)]).src = "Images/5-Snake/TailUp.png";
            }
        }
        document.getElementById("t"+ exhaust).src = "Images/5-Snake/Empty-.png";
    }
    if (restartMonitor === 1) cleanUp();
}

addEventListener("keydown", KeyPressed, false); // listens to arrows on keyboard
function KeyPressed(event) {
    if (event.keyCode == "38") UpPress();
    if (event.keyCode == "40") DownPress();
    if (event.keyCode == "37") LeftPress();
    if (event.keyCode == "39") RightPress();
}

//pictures and events for arrows on screen:
function arrowCreation(arrow, ID, SRC, leftCoord, topCoord, click) {
    arrow = document.createElement("IMG"); 
    arrow.id = ID;
    arrow.src = `Images/5-Snake/${SRC}.png`;
    arrow.style = `position: absolute; left: ${leftCoord}vw; top: ${topCoord}vw; max-width: 10vw;
     font-size: 1.5vw; text-align: center;`;
    arrow.addEventListener("click", click);
    document.body.appendChild(arrow);
}
arrowCreation("UpArrow", "UpA", "ArrowUp", 60, 14, UpPress);
arrowCreation("DownArrow", "DownA", "ArrowDown", 60, 30, DownPress);
arrowCreation("LeftArrow", "LeftA", "ArrowLeft", 52, 22, LeftPress);
arrowCreation("RightArrow", "RightA", "ArrowRight", 68, 22, RightPress);

function rabbitSpawn() { // placement of rabbit on the grid
    rabbit = Math.floor(Math.random()*grid.length);
    if (document.getElementById("t"+rabbit).src.slice(-10, ) === "HeadDn.png" ||
    document.getElementById("t"+rabbit).src.slice(-10, ) === "HeadUp.png" ||
    document.getElementById("t"+rabbit).src.slice(-10, ) === "HeadLt.png" ||
    document.getElementById("t"+rabbit).src.slice(-10, ) === "HeadRt.png" ||
    document.getElementById("t"+rabbit).src.slice(-10, ) === "BodyRL.png" ||
    document.getElementById("t"+rabbit).src.slice(-10, ) === "BodyUD.png" ||
    document.getElementById("t"+rabbit).src.slice(-10, ) === "TailDn.png" ||
    document.getElementById("t"+rabbit).src.slice(-10, ) === "TailUp.png" ||
    document.getElementById("t"+rabbit).src.slice(-10, ) === "TailLt.png" ||
    document.getElementById("t"+rabbit).src.slice(-10, ) === "TailRt.png" ||
    document.getElementById("t"+rabbit).src.slice(-10, ) === "TnLDUR.png" ||
    document.getElementById("t"+rabbit).src.slice(-10, ) === "TnLUDR.png" ||
    document.getElementById("t"+rabbit).src.slice(-10, ) === "TnRDUL.png" ||
    document.getElementById("t"+rabbit).src.slice(-10, ) === "TnRUDL.png" || 
    rabbit === exhaust ||
    rabbit === 400 ||
    rabbit === mud) {
        return rabbitSpawn();
    }
    else  document.getElementById("t"+rabbit).src = "Images/5-Snake/Rabbit.png";
}
rabbitSpawn();

function mudSpawn() { // placement of mud on the grid
    for (let i = 1; i <=10; i++) {
        mud = Math.floor(Math.random()*grid.length);
        if (document.getElementById("t"+mud).src.slice(-10, ) === "HeadDn.png" ||
        document.getElementById("t"+mud).src.slice(-10, ) === "HeadUp.png" ||
        document.getElementById("t"+mud).src.slice(-10, ) === "HeadLt.png" ||
        document.getElementById("t"+mud).src.slice(-10, ) === "HeadRt.png" ||
        document.getElementById("t"+mud).src.slice(-10, ) === "BodyRL.png" ||
        document.getElementById("t"+mud).src.slice(-10, ) === "BodyUD.png" ||
        document.getElementById("t"+mud).src.slice(-10, ) === "TailDn.png" ||
        document.getElementById("t"+mud).src.slice(-10, ) === "TailUp.png" ||
        document.getElementById("t"+mud).src.slice(-10, ) === "TailLt.png" ||
        document.getElementById("t"+mud).src.slice(-10, ) === "TailRt.png" ||
        document.getElementById("t"+mud).src.slice(-10, ) === "TnLDUR.png" ||
        document.getElementById("t"+mud).src.slice(-10, ) === "TnLUDR.png" ||
        document.getElementById("t"+mud).src.slice(-10, ) === "TnRDUL.png" ||
        document.getElementById("t"+mud).src.slice(-10, ) === "TnRUDL.png" || 
        mud === exhaust ||
        mud === 400 ||
        mud === rabbit) {
           return mudSpawn();
        }
        else document.getElementById("t"+mud).src = "Images/5-Snake/MudMud.png";
    }
}
mudSpawn();

function cleanUp() { // resets the game
    current = 145;
    up = 0;
    down = 0;
    left = 0;
    right = 2;
    chain = {"c1" : 145, "c2" : 144, "c3" : 143};
    link = 3;
    exhaust = 0;
    score = 0;
 
    for(let i = 0; i < 400; i++) {
        document.getElementById("t"+i).src = "Images/5-Snake/Empty-.png";
    }
    rabbitSpawn();
    mudSpawn();
    document.getElementById("t"+(current)).src = "Images/5-Snake/HeadRt.png";
    document.getElementById("t"+(current-1)).src = "Images/5-Snake/BodyRL.png";
    document.getElementById("t"+(current-2)).src = "Images/5-Snake/TailRt.png";
}





