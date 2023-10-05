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
let t; //varialbe for creating id's of grid's elements
let restartMonitor; //variable to check if game should be restarted
let rabbit; // to track a rabbit placement on the grid
let score = 0; // score
let mud; // to track mud placement on the grid

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

for(let i = 0; i < 400; i++) { //visualization of empty grid
    if (i === 20) {
        LeftAndRightBorders.push(i);
        leftPos = 5;
        topPos = 6.8;
    }
    else if (i === 40) {
        LeftAndRightBorders.push(i);
        leftPos = 5;
        topPos = 8.6;
    }
    else if (i === 60) {
        LeftAndRightBorders.push(i);
        leftPos = 5;
        topPos = 10.4;
    }
    else if (i === 80) {
        LeftAndRightBorders.push(i);
        leftPos = 5;
        topPos = 12.2;
    }
    else if (i === 100) {
        LeftAndRightBorders.push(i);
        leftPos = 5;
        topPos = 14;
    }
    else if (i === 120) {
        LeftAndRightBorders.push(i);
        leftPos = 5;
        topPos = 15.8;
    }
    else if (i === 140) {
        LeftAndRightBorders.push(i);
        leftPos = 5;
        topPos = 17.6;
    }
    else if (i === 160) {
        LeftAndRightBorders.push(i);
        leftPos = 5;
        topPos = 19.4;
    }
    else if (i === 180) {
        LeftAndRightBorders.push(i);
        leftPos = 5;
        topPos = 21.2;
    }
    if (i === 200) {
        LeftAndRightBorders.push(i);
        leftPos = 5;
        topPos = 23;
    }
    else if (i === 220) {
        LeftAndRightBorders.push(i);
        leftPos = 5;
        topPos = 24.8;
    }
    else if (i === 240) {
        LeftAndRightBorders.push(i);
        leftPos = 5;
        topPos = 26.6;
    }
    else if (i === 260) {
        LeftAndRightBorders.push(i);
        leftPos = 5;
        topPos = 28.4;
    }
    else if (i === 280) {
        LeftAndRightBorders.push(i);
        leftPos = 5;
        topPos = 30.2;
    }
    else if (i === 300) {
        LeftAndRightBorders.push(i);
        leftPos = 5;
        topPos = 32;
    }
    else if (i === 320) {
        LeftAndRightBorders.push(i);
        leftPos = 5;
        topPos = 33.8;
    }
    else if (i === 340) {
        LeftAndRightBorders.push(i);
        leftPos = 5;
        topPos = 35.6;
    }
    else if (i === 360) {
        LeftAndRightBorders.push(i);
        leftPos = 5;
        topPos = 37.4;
    }
    else if (i === 380) {
        LeftAndRightBorders.push(i);
        leftPos = 5;
        topPos = 39.2;
    }
    t = document.createElement('img');
    t.id = "t"+i;
    t.style = `position: absolute; left: ${leftPos}vw; top: ${topPos}vw; max-width:1.8vw; border:solid; border-width:0.1vw`;
    t.src = "Images/5-Snake/Empty.png";
    leftPos += 1.8;
    document.body.appendChild(t);
}   
LeftAndRightBorders.push("0"); 
LeftAndRightBorders.push("400");

document.getElementById("t"+(current)).src = "Images/5-Snake/Head-Right.png"; // placing snake on the grid
document.getElementById("t"+(current-1)).src = "Images/5-Snake/Body-RightLeft.png";
document.getElementById("t"+(current-2)).src = "Images/5-Snake/Tail-Right.png";

let UpPress =  async function() { //triggers by pressing/clicking/tapping arrow up
    restartMonitor = 0;
    if (down === 1 || up ===1) {
        return null;
    }
    right = 0;
    left = 0;
    down = 0;
    up = 1;
    while (up === 1) {
        await new Promise(r => setTimeout(r, 200));
        exhaust = chain[Object.keys(chain)[Object.keys(chain).length-1]];
        for (let i = 1; i <= Object.keys(chain).length -1 ; i++) {
            chain[Object.keys(chain)[Object.keys(chain).length - i]] =
            chain[Object.keys(chain)[Object.keys(chain).length - (i+1)]];
          
        }
        current = current-20;
        chain["c1"] = current;
        if (grid.includes("t" + (current+1)) != true) {
            alert("You crashed in to the wall! The game ends with the score of " + score);
            up = 0;
            restartMonitor = 1;
            break;
        }
        if (chain["c1"] === rabbit) {
            link++;
            chain["c"+ link] = chain[Object.keys(chain)[Object.keys(chain).length-1]]
            score+=10
            ScoreField.innerHTML = "Score: " + score;
            rabbitSpawn();
        }
        if (document.getElementById("t"+chain["c1"]).src.slice(-33, ) === "Images/5-Snake/Body-RightLeft.png" ||
            document.getElementById("t"+chain["c1"]).src.slice(-30, ) === "Images/5-Snake/Body-UpDown.png" ||
            document.getElementById("t"+chain["c1"]).src.slice(-28, ) === "Images/5-Snake/Tail-Down.png" ||
            document.getElementById("t"+chain["c1"]).src.slice(-26, ) === "Images/5-Snake/Tail-Up.png" ||
            document.getElementById("t"+chain["c1"]).src.slice(-28, ) === "Images/5-Snake/Tail-Left.png" ||
            document.getElementById("t"+chain["c1"]).src.slice(-29, ) === "Images/5-Snake/Tail-Right.png" ||
            document.getElementById("t"+chain["c1"]).src.slice(-40, ) === "Images/5-Snake/Turn-LeftDown-UpRight.png" ||
            document.getElementById("t"+chain["c1"]).src.slice(-40, ) === "Images/5-Snake/Turn-LeftUp-DownRight.png" ||
            document.getElementById("t"+chain["c1"]).src.slice(-40, ) === "Images/5-Snake/Turn-RightDown-UpLeft.png" ||
            document.getElementById("t"+chain["c1"]).src.slice(-40, ) === "Images/5-Snake/Turn-RightUp-DownLeft.png" ||
            chain["c1"]=== exhaust) {
                alert("You bit yourself! The game ends with the score of " + score);
                up = 0;
                restartMonitor = 1;
                break;
            }
        if (document.getElementById("t"+chain["c1"]).src.slice(-22, ) === "Images/5-Snake/Mud.png" ) {
            alert("You stuck in mud! The game ends with the score of " + score);
            up = 0;
            restartMonitor = 1;
            break;
        }
        document.getElementById("t"+ chain["c1"]).src = "Images/5-Snake/Head-Up.png";
        for (let i = 1; i< Object.keys(chain).length-1; i++) {
            //chain[Object.keys(chain)[i-1]] - first link of snake
            //chain[Object.keys(chain)[i]] - middle links of snake
            //chain[Object.keys(chain)[i+1]] - last link of snake
            if (chain[Object.keys(chain)[i-1]] === chain[Object.keys(chain)[i]] -20 &&
             chain[Object.keys(chain)[i+1]] === chain[Object.keys(chain)[i]] -1) {
                document.getElementById("t"+chain["c"+(i+1)]).src = "Images/5-Snake/Turn-RightUp-DownLeft.png";
            }
            else if (chain[Object.keys(chain)[i-1]] === chain[Object.keys(chain)[i]] -20 &&
             chain[Object.keys(chain)[i+1]] === chain[Object.keys(chain)[i]] +1) {
               document.getElementById("t"+chain["c"+(i+1)]).src =
                "Images/5-Snake/Turn-LeftUp-DownRight.png";
            }
            else if (chain[Object.keys(chain)[i-1]] === chain[Object.keys(chain)[i]] -20 &&
            chain[Object.keys(chain)[i+1]] === chain[Object.keys(chain)[i]] +20) {
              document.getElementById("t"+chain["c"+(i+1)]).src =
               "Images/5-Snake/Body-UpDown.png";
            }
            else if (chain[Object.keys(chain)[i-1]] === chain[Object.keys(chain)[i]] -1 &&
             chain[Object.keys(chain)[i+1]] === chain[Object.keys(chain)[i]] +1) {
                document.getElementById("t"+chain["c"+(i+1)]).src =
                 "Images/5-Snake/Body-RightLeft.png";
            }
            else if (chain[Object.keys(chain)[i-1]] === chain[Object.keys(chain)[i]] +1 &&
             chain[Object.keys(chain)[i+1]] === chain[Object.keys(chain)[i]] -1) {
                document.getElementById("t"+chain["c"+(i+1)]).src =
                 "Images/5-Snake/Body-RightLeft.png";
            }
            if (chain[Object.keys(chain)[i]] === chain[Object.keys(chain)[i+1]] -1 &&
             chain[Object.keys(chain)[i+1]] === chain[Object.keys(chain)[Object.keys(chain).length - 1]]) {
                document.getElementById("t"+chain["c"+(i+2)]).src =
                 "Images/5-Snake/Tail-Left.png";
            }
            else if (chain[Object.keys(chain)[i]] === chain[Object.keys(chain)[i+1]] +1 &&
             chain[Object.keys(chain)[i+1]] === chain[Object.keys(chain)[Object.keys(chain).length - 1]]) {
               document.getElementById("t"+chain["c"+(i+2)]).src =
                "Images/5-Snake/Tail-Right.png";
            }
            else if (chain[Object.keys(chain)[i]] === chain[Object.keys(chain)[i+1]] -20 &&
            chain[Object.keys(chain)[i+1]] === chain[Object.keys(chain)[Object.keys(chain).length - 1]]) {
              document.getElementById("t"+chain["c"+(i+2)]).src =
               "Images/5-Snake/Tail-Up.png";
           }
        }
        document.getElementById("t"+ exhaust).src = "Images/5-Snake/Empty.png";
    }
    if (restartMonitor === 1) {
        cleanUp();
    }
}

let DownPress =  async function() { //triggers by pressing/clicking/tapping arrow down
    restartMonitor = 0;
    if (up === 1 || down ===1) {
        return null;
    }
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
            up = 0;
            restartMonitor = 1;
            break;
        }
        if (chain["c1"] === rabbit) {
            link++;
            chain["c"+ link] = chain[Object.keys(chain)[Object.keys(chain).length-1]]
            score+=10
            ScoreField.innerHTML = "Score: " + score;
            rabbitSpawn();
        }
        if (document.getElementById("t"+chain["c1"]).src.slice(-33, ) === "Images/5-Snake/Body-RightLeft.png" ||
        document.getElementById("t"+chain["c1"]).src.slice(-30, ) === "Images/5-Snake/Body-UpDown.png" ||
        document.getElementById("t"+chain["c1"]).src.slice(-28, ) === "Images/5-Snake/Tail-Down.png" ||
        document.getElementById("t"+chain["c1"]).src.slice(-26, ) === "Images/5-Snake/Tail-Up.png" ||
        document.getElementById("t"+chain["c1"]).src.slice(-28, ) === "Images/5-Snake/Tail-Left.png" ||
        document.getElementById("t"+chain["c1"]).src.slice(-29, ) === "Images/5-Snake/Tail-Right.png" ||
        document.getElementById("t"+chain["c1"]).src.slice(-40, ) === "Images/5-Snake/Turn-LeftDown-UpRight.png" ||
        document.getElementById("t"+chain["c1"]).src.slice(-40, ) === "Images/5-Snake/Turn-LeftUp-DownRight.png" ||
        document.getElementById("t"+chain["c1"]).src.slice(-40, ) === "Images/5-Snake/Turn-RightDown-UpLeft.png" ||
        document.getElementById("t"+chain["c1"]).src.slice(-40, ) === "Images/5-Snake/Turn-RightUp-DownLeft.png" ||
        chain["c1"]=== exhaust) {
            alert("You bit yourself! The game ends with the score of " + score);
            up = 0;
            restartMonitor = 1;
            break;
        }
        if (document.getElementById("t"+chain["c1"]).src.slice(-22, ) === "Images/5-Snake/Mud.png" ) {
            alert("You stuck in mud! The game ends with the score of " + score);
            up = 0;
            restartMonitor = 1;
            break;
        }
        document.getElementById("t"+ chain["c1"]).src = "Images/5-Snake/Head-Down.png";
        for (let i = 1; i< Object.keys(chain).length-1; i++) {
            //chain[Object.keys(chain)[i-1]] - first link of snake
            //chain[Object.keys(chain)[i]] - middle links of snake
            //chain[Object.keys(chain)[i+1]] - last link of snake
            if (chain[Object.keys(chain)[i-1]] === chain[Object.keys(chain)[i]] +20 &&
             chain[Object.keys(chain)[i+1]] === chain[Object.keys(chain)[i]] -1) {
                document.getElementById("t"+chain["c"+(i+1)]).src =
                 "Images/5-Snake/Turn-RightDown-UpLeft.png";
            }
            else if (chain[Object.keys(chain)[i-1]] === chain[Object.keys(chain)[i]] +20 &&
             chain[Object.keys(chain)[i+1]] === chain[Object.keys(chain)[i]] +1) {
                document.getElementById("t"+chain["c"+(i+1)]).src =
                 "Images/5-Snake/Turn-LeftDown-UpRight.png";
            }
            else if (chain[Object.keys(chain)[i-1]] === chain[Object.keys(chain)[i]] +20 &&
             chain[Object.keys(chain)[i+1]] === chain[Object.keys(chain)[i]] -20) {
                document.getElementById("t"+chain["c"+(i+1)]).src =
                 "Images/5-Snake/Body-UpDown.png";
            }
            else if (chain[Object.keys(chain)[i-1]] === chain[Object.keys(chain)[i]] -1 &&
             chain[Object.keys(chain)[i+1]] === chain[Object.keys(chain)[i]] +1) {
                document.getElementById("t"+chain["c"+(i+1)]).src =
                 "Images/5-Snake/Body-RightLeft.png";
            }
            else if (chain[Object.keys(chain)[i-1]] === chain[Object.keys(chain)[i]] +1 &&
             chain[Object.keys(chain)[i+1]] === chain[Object.keys(chain)[i]] -1) {
                document.getElementById("t"+chain["c"+(i+1)]).src =
                 "Images/5-Snake/Body-RightLeft.png";
            }
            if (chain[Object.keys(chain)[i]] === chain[Object.keys(chain)[i+1]] -1 &&
             chain[Object.keys(chain)[i+1]] === chain[Object.keys(chain)[Object.keys(chain).length - 1]]) {
                document.getElementById("t"+chain["c"+(i+2)]).src =
                 "Images/5-Snake/Tail-Left.png";
            }
            else if (chain[Object.keys(chain)[i]] === chain[Object.keys(chain)[i+1]] +1 &&
             chain[Object.keys(chain)[i+1]] === chain[Object.keys(chain)[Object.keys(chain).length - 1]]) {
                document.getElementById("t"+chain["c"+(i+2)]).src =
                 "Images/5-Snake/Tail-Right.png";
            }
            else if (chain[Object.keys(chain)[i]] === chain[Object.keys(chain)[i+1]] +20 &&
            chain[Object.keys(chain)[i+1]] === chain[Object.keys(chain)[Object.keys(chain).length - 1]]) {
              document.getElementById("t"+chain["c"+(i+2)]).src =
               "Images/5-Snake/Tail-Down.png";
           }
        }
        document.getElementById("t"+ exhaust).src = "Images/5-Snake/Empty.png";
    }
    if (restartMonitor === 1) {
        cleanUp();
    }

}
let LeftPress =  async function() { //triggers by pressing/clicking/tapping arrow left
    restartMonitor = 0;
    if (right === 1 || right === 2 || left ===1) {
        return null;
    }
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
            left = 0;  
            restartMonitor = 1;
            break;          
        }
        if (chain["c1"] === rabbit) {
            link++;
            chain["c"+ link] = chain[Object.keys(chain)[Object.keys(chain).length-1]]
            score+=10
            ScoreField.innerHTML = "Score: " + score;
            rabbitSpawn();
        }
        if (document.getElementById("t"+chain["c1"]).src.slice(-33, ) === "Images/5-Snake/Body-RightLeft.png" ||
        document.getElementById("t"+chain["c1"]).src.slice(-30, ) === "Images/5-Snake/Body-UpDown.png" ||
        document.getElementById("t"+chain["c1"]).src.slice(-28, ) === "Images/5-Snake/Tail-Down.png" ||
        document.getElementById("t"+chain["c1"]).src.slice(-26, ) === "Images/5-Snake/Tail-Up.png" ||
        document.getElementById("t"+chain["c1"]).src.slice(-28, ) === "Images/5-Snake/Tail-Left.png" ||
        document.getElementById("t"+chain["c1"]).src.slice(-29, ) === "Images/5-Snake/Tail-Right.png" ||
        document.getElementById("t"+chain["c1"]).src.slice(-40, ) === "Images/5-Snake/Turn-LeftDown-UpRight.png" ||
        document.getElementById("t"+chain["c1"]).src.slice(-40, ) === "Images/5-Snake/Turn-LeftUp-DownRight.png" ||
        document.getElementById("t"+chain["c1"]).src.slice(-40, ) === "Images/5-Snake/Turn-RightDown-UpLeft.png" ||
        document.getElementById("t"+chain["c1"]).src.slice(-40, ) === "Images/5-Snake/Turn-RightUp-DownLeft.png" ||
        chain["c1"]=== exhaust) {
            alert("You bit yourself! The game ends with the score of " + score);
            up = 0;
            restartMonitor = 1;
            break;
        }
        if (document.getElementById("t"+chain["c1"]).src.slice(-22, ) === "Images/5-Snake/Mud.png" ) {
            alert("You stuck in mud! The game ends with the score of " + score);
            up = 0;
            restartMonitor = 1;
            break;
        }
        document.getElementById("t"+ chain["c1"]).src = "Images/5-Snake/Head-Left.png";
        for (let i = 1; i< Object.keys(chain).length-1; i++) {
            //chain[Object.keys(chain)[i-1]] - first link of snake
            //chain[Object.keys(chain)[i]] - middle links of snake
            //chain[Object.keys(chain)[i+1]] - last link of snake
            if (chain[Object.keys(chain)[i-1]] === chain[Object.keys(chain)[i]] -1 &&
             chain[Object.keys(chain)[i+1]] === chain[Object.keys(chain)[i]] +20) {
                document.getElementById("t"+chain["c"+(i+1)]).src =
                 "Images/5-Snake/Turn-RightDown-UpLeft.png";
            }
            else if (chain[Object.keys(chain)[i-1]] === chain[Object.keys(chain)[i]] -1 &&
             chain[Object.keys(chain)[i+1]] === chain[Object.keys(chain)[i]] -20) {
                document.getElementById("t"+chain["c"+(i+1)]).src =
                 "Images/5-Snake/Turn-RightUp-DownLeft.png";
            }
            else if (chain[Object.keys(chain)[i-1]] === chain[Object.keys(chain)[i]] +20 &&
             chain[Object.keys(chain)[i+1]] === chain[Object.keys(chain)[i]] -20) {
                document.getElementById("t"+chain["c"+(i+1)]).src =
                 "Images/5-Snake/Body-UpDown.png";
            }
            else if (chain[Object.keys(chain)[i-1]] === chain[Object.keys(chain)[i]] -1 &&
             chain[Object.keys(chain)[i+1]] === chain[Object.keys(chain)[i]] +1) {
                document.getElementById("t"+chain["c"+(i+1)]).src =
                 "Images/5-Snake/Body-RightLeft.png";
            }
            else if (chain[Object.keys(chain)[i-1]] === chain[Object.keys(chain)[i]] +1 &&
             chain[Object.keys(chain)[i+1]] === chain[Object.keys(chain)[i]] -1) {
                document.getElementById("t"+chain["c"+(i+1)]).src =
                 "Images/5-Snake/Body-RightLeft.png";
            }
            if (chain[Object.keys(chain)[i]] === chain[Object.keys(chain)[i+1]] -1 &&
             chain[Object.keys(chain)[i+1]] === chain[Object.keys(chain)[Object.keys(chain).length - 1]]) {
                document.getElementById("t"+chain["c"+(i+2)]).src =
                 "Images/5-Snake/Tail-Left.png";
            } 
            else if (chain[Object.keys(chain)[i]] === chain[Object.keys(chain)[i+1]] +1 &&
             chain[Object.keys(chain)[i+1]] === chain[Object.keys(chain)[Object.keys(chain).length - 1]]) {
                document.getElementById("t"+chain["c"+(i+2)]).src =
                 "Images/5-Snake/Tail-Right.png";
            }
            else if (chain[Object.keys(chain)[i]] === chain[Object.keys(chain)[i+1]] +20 &&
             chain[Object.keys(chain)[i+1]] === chain[Object.keys(chain)[Object.keys(chain).length - 1]]) {
                document.getElementById("t"+chain["c"+(i+2)]).src =
                 "Images/5-Snake/Tail-Down.png";
            }
            else if (chain[Object.keys(chain)[i]] === chain[Object.keys(chain)[i+1]] -20 &&
             chain[Object.keys(chain)[i+1]] === chain[Object.keys(chain)[Object.keys(chain).length - 1]]) {
                document.getElementById("t"+chain["c"+(i+2)]).src =
                 "Images/5-Snake/Tail-Up.png";
            }
        }
        document.getElementById("t"+ exhaust).src = "Images/5-Snake/Empty.png";
    }
    if (restartMonitor === 1) {
        cleanUp();
    }
}

let RightPress =  async function() { //triggers by pressing/clicking/tapping arrow right
    restartMonitor = 0;
    if (left === 1 || right === 1 ) {
        return null;
    }
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
            right = 0;
            restartMonitor = 1;
            break;
        }
        if (chain["c1"] === rabbit) {
            link++;
            chain["c"+ link] = chain[Object.keys(chain)[Object.keys(chain).length-1]]
            score+=10
            ScoreField.innerHTML = "Score: " + score;
            rabbitSpawn();
        }
        if (document.getElementById("t"+chain["c1"]).src.slice(-33, ) === "Images/5-Snake/Body-RightLeft.png" ||
        document.getElementById("t"+chain["c1"]).src.slice(-30, ) === "Images/5-Snake/Body-UpDown.png" ||
        document.getElementById("t"+chain["c1"]).src.slice(-28, ) === "Images/5-Snake/Tail-Down.png" ||
        document.getElementById("t"+chain["c1"]).src.slice(-26, ) === "Images/5-Snake/Tail-Up.png" ||
        document.getElementById("t"+chain["c1"]).src.slice(-28, ) === "Images/5-Snake/Tail-Left.png" ||
        document.getElementById("t"+chain["c1"]).src.slice(-29, ) === "Images/5-Snake/Tail-Right.png" ||
        document.getElementById("t"+chain["c1"]).src.slice(-40, ) === "Images/5-Snake/Turn-LeftDown-UpRight.png" ||
        document.getElementById("t"+chain["c1"]).src.slice(-40, ) === "Images/5-Snake/Turn-LeftUp-DownRight.png" ||
        document.getElementById("t"+chain["c1"]).src.slice(-40, ) === "Images/5-Snake/Turn-RightDown-UpLeft.png" ||
        document.getElementById("t"+chain["c1"]).src.slice(-40, ) === "Images/5-Snake/Turn-RightUp-DownLeft.png" ||
        chain["c1"]=== exhaust) {
            alert("You bit yourself! The game ends with the score of " + score);
            up = 0;
            restartMonitor = 1;
            break;
        }
        if (document.getElementById("t"+chain["c1"]).src.slice(-22, ) === "Images/5-Snake/Mud.png" ) {
            alert("You stuck in mud! The game ends with the score of " + score);
            up = 0;
            restartMonitor = 1;
            break;
        }
        document.getElementById("t"+ chain["c1"]).src = "Images/5-Snake/Head-Right.png";
        for (let i = 1; i< Object.keys(chain).length-1; i++) {
            //chain[Object.keys(chain)[i-1]] - first link of snake
            //chain[Object.keys(chain)[i]] - middle links of snake
            //chain[Object.keys(chain)[i+1]] - last link of snake
            if (chain[Object.keys(chain)[i-1]] === chain[Object.keys(chain)[i]] +1 &&
             chain[Object.keys(chain)[i+1]] === chain[Object.keys(chain)[i]] +20) {
                document.getElementById("t"+chain["c"+(i+1)]).src =
                 "Images/5-Snake/Turn-LeftDown-UpRight.png";
            }
            else if (chain[Object.keys(chain)[i-1]] === chain[Object.keys(chain)[i]] +1 &&
             chain[Object.keys(chain)[i+1]] === chain[Object.keys(chain)[i]] -20) {
                document.getElementById("t"+chain["c"+(i+1)]).src =
                 "Images/5-Snake/Turn-LeftUp-DownRight.png";
            }
            else if (chain[Object.keys(chain)[i-1]] === chain[Object.keys(chain)[i]] +20 &&
             chain[Object.keys(chain)[i+1]] === chain[Object.keys(chain)[i]] -20) {
                document.getElementById("t"+chain["c"+(i+1)]).src =
                 "Images/5-Snake/Body-UpDown.png";
            }
            else if (chain[Object.keys(chain)[i-1]] === chain[Object.keys(chain)[i]] -1 &&
             chain[Object.keys(chain)[i+1]] === chain[Object.keys(chain)[i]] +1) {
               document.getElementById("t"+chain["c"+(i+1)]).src =
                "Images/5-Snake/Body-RightLeft.png";
            }
            else if (chain[Object.keys(chain)[i-1]] === chain[Object.keys(chain)[i]] +1 &&
             chain[Object.keys(chain)[i+1]] === chain[Object.keys(chain)[i]] -1) {
                document.getElementById("t"+chain["c"+(i+1)]).src =
                "Images/5-Snake/Body-RightLeft.png";
            }
            if (chain[Object.keys(chain)[i]] === chain[Object.keys(chain)[i+1]] -1 &&
             chain[Object.keys(chain)[i+1]] === chain[Object.keys(chain)[Object.keys(chain).length - 1]]) {
                document.getElementById("t"+chain["c"+(i+2)]).src =
                "Images/5-Snake/Tail-Left.png";
            }
            else if (chain[Object.keys(chain)[i]] === chain[Object.keys(chain)[i+1]] +1 &&
             chain[Object.keys(chain)[i+1]] === chain[Object.keys(chain)[Object.keys(chain).length - 1]]) {
                document.getElementById("t"+chain["c"+(i+2)]).src =
                 "Images/5-Snake/Tail-Right.png";
            }
            else if (chain[Object.keys(chain)[i]] === chain[Object.keys(chain)[i+1]] +20 &&
             chain[Object.keys(chain)[i+1]] === chain[Object.keys(chain)[Object.keys(chain).length - 1]]) {
                document.getElementById("t"+chain["c"+(i+2)]).src =
                "Images/5-Snake/Tail-Down.png";
            }
            else if (chain[Object.keys(chain)[i]] === chain[Object.keys(chain)[i+1]] -20 &&
             chain[Object.keys(chain)[i+1]] === chain[Object.keys(chain)[Object.keys(chain).length - 1]]) {
               document.getElementById("t"+chain["c"+(i+2)]).src =
                "Images/5-Snake/Tail-Up.png";
            }
        }
        document.getElementById("t"+ exhaust).src = "Images/5-Snake/Empty.png";
    }
    if (restartMonitor === 1) {
        cleanUp();
    }
}

addEventListener("keydown", KeyPressed, false); // listens to arrows on keyboard
function KeyPressed(event) {
    if (event.keyCode == "38") {
        UpPress();
    }
    if (event.keyCode == "40") {
        DownPress();
    }
    if (event.keyCode == "37") {
        LeftPress();
    }
    if (event.keyCode == "39") {
        RightPress();
    }
}

//pictures and events for arrows on screen:
let UpArrow = document.createElement("IMG"); 
UpArrow.id = "UpA";
UpArrow.src = "Images/5-Snake/ArrowUp.png";
UpArrow.style = `position: absolute; left: 60vw; top: 14vw; max-width: 10vw;
font-size: 1.5vw; text-align: center;`;
UpArrow.addEventListener("click", UpPress);
document.body.appendChild(UpArrow);

let DownArrow = document.createElement("IMG");
DownArrow.id = "DownA";
DownArrow.src = "Images/5-Snake/ArrowDown.png";
DownArrow.style = `position: absolute; left: 60vw; top: 30vw; max-width: 10vw;
font-size: 1.5vw; text-align: center;`;
DownArrow.addEventListener("click", DownPress);
document.body.appendChild(DownArrow);

let LeftArrow = document.createElement("IMG");
LeftArrow.id = "LeftA";
LeftArrow.src = "Images/5-Snake/ArrowLeft.png";
LeftArrow.style = `position: absolute; left: 52vw; top: 22vw; max-width: 10vw;
font-size: 1.5vw; text-align: center;`;
LeftArrow.addEventListener("click", LeftPress);
document.body.appendChild(LeftArrow);

let RightArrow = document.createElement("IMG"); 
RightArrow.id = "RightA";
RightArrow.src = "Images/5-Snake/ArrowRight.png";
RightArrow.style = `position: absolute; left: 68vw; top: 22vw; max-width: 10vw;
font-size: 1.5vw; text-align: center;`;
RightArrow.addEventListener("click", RightPress);
document.body.appendChild(RightArrow);


let rabbitSpawn = function() { // placement of rabbit on the grid
    rabbit = Math.floor(Math.random()*grid.length);

    if (document.getElementById("t"+rabbit).src.slice(-33, ) === "Images/5-Snake/Body-RightLeft.png" ||
        document.getElementById("t"+rabbit).src.slice(-30, ) === "Images/5-Snake/Body-UpDown.png" ||
        document.getElementById("t"+rabbit).src.slice(-28, ) === "Images/5-Snake/Head-Down.png" ||
        document.getElementById("t"+rabbit).src.slice(-26, ) === "Images/5-Snake/Head-Up.png" ||
        document.getElementById("t"+rabbit).src.slice(-28, ) === "Images/5-Snake/Head-Left.png" ||
        document.getElementById("t"+rabbit).src.slice(-29, ) === "Images/5-Snake/Head-Right.png" ||
        document.getElementById("t"+rabbit).src.slice(-28, ) === "Images/5-Snake/Tail-Down.png" ||
        document.getElementById("t"+rabbit).src.slice(-26, ) === "Images/5-Snake/Tail-Up.png" ||
        document.getElementById("t"+rabbit).src.slice(-28, ) === "Images/5-Snake/Tail-Left.png" ||
        document.getElementById("t"+rabbit).src.slice(-29, ) === "Images/5-Snake/Tail-Right.png" ||
        document.getElementById("t"+rabbit).src.slice(-40, ) === "Images/5-Snake/Turn-LeftDown-UpRight.png" ||
        document.getElementById("t"+rabbit).src.slice(-40, ) === "Images/5-Snake/Turn-LeftUp-DownRight.png" ||
        document.getElementById("t"+rabbit).src.slice(-40, ) === "Images/5-Snake/Turn-RightDown-UpLeft.png" ||
        document.getElementById("t"+rabbit).src.slice(-40, ) === "Images/5-Snake/Turn-RightUp-DownLeft.png" ||
        rabbit === exhaust ||
        rabbit === 400 ||
        document.getElementById("t"+rabbit).src.slice(-22, ) === "Images/5-Snake/Mud.png") {
        return rabbitSpawn();
    }
    else {
        document.getElementById("t"+rabbit).src = "Images/5-Snake/Rabbit.png";
    }
}
rabbitSpawn();

let mudSpawn = function() { // placement of mud on the grid
    for (let i = 1; i <=10; i++) {
        mud = Math.floor(Math.random()*grid.length);
        if (document.getElementById("t"+mud).src.slice(-33, ) === "Images/5-Snake/Body-RightLeft.png" ||
            document.getElementById("t"+mud).src.slice(-30, ) === "Images/5-Snake/Body-UpDown.png" ||
            document.getElementById("t"+mud).src.slice(-28, ) === "Images/5-Snake/Head-Down.png" ||
            document.getElementById("t"+mud).src.slice(-26, ) === "Images/5-Snake/Head-Up.png" ||
            document.getElementById("t"+mud).src.slice(-28, ) === "Images/5-Snake/Head-Left.png" ||
            document.getElementById("t"+mud).src.slice(-29, ) === "Images/5-Snake/Head-Right.png" ||
            document.getElementById("t"+mud).src.slice(-28, ) === "Images/5-Snake/Tail-Down.png" ||
            document.getElementById("t"+mud).src.slice(-26, ) === "Images/5-Snake/Tail-Up.png" ||
            document.getElementById("t"+mud).src.slice(-28, ) === "Images/5-Snake/Tail-Left.png" ||
            document.getElementById("t"+mud).src.slice(-29, ) === "Images/5-Snake/Tail-Right.png" ||
            document.getElementById("t"+mud).src.slice(-40, ) === "Images/5-Snake/Turn-LeftDown-UpRight.png" ||
            document.getElementById("t"+mud).src.slice(-40, ) === "Images/5-Snake/Turn-LeftUp-DownRight.png" ||
            document.getElementById("t"+mud).src.slice(-40, ) === "Images/5-Snake/Turn-RightDown-UpLeft.png" ||
            document.getElementById("t"+mud).src.slice(-40, ) === "Images/5-Snake/Turn-RightUp-DownLeft.png" ||
            mud === exhaust ||
            mud === rabbit) {
            return mudSpawn();
        }
        else {
            document.getElementById("t"+mud).src = "Images/5-Snake/Mud.png";
            
        }
    }
}
mudSpawn();

let cleanUp = function() { // resets the game

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
        document.getElementById("t"+i).src = "Images/5-Snake/Empty.png";
    }
    rabbitSpawn();
    mudSpawn();
    document.getElementById("t"+(current)).src = "Images/5-Snake/Head-Right.png";
    document.getElementById("t"+(current-1)).src = "Images/5-Snake/Body-RightLeft.png";
    document.getElementById("t"+(current-2)).src = "Images/5-Snake/Tail-Right.png";
}



