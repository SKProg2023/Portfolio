"use strict"
let buffer = 0; // collects all information from user's input
let operator = 1; //checks if operator was pressed
let operator_equal = 1; //checks if 'equal' was pressed
let leftPos = 3; // variable for left distance coordinate
let topPos = 3; // variable for top distance coordinate
let ltpArray = []; // array to hold left-top placeholders information
let lbpArray = []; // array to hold left-bottom placeholders information
let lrpArray = []; // array to hold left-result placeholders information
let rtpArray = []; // array to hold right-top placeholders information
let rbpArray = []; // array to hold right-bottom placeholders information
let rrpArray = []; // array to hold right-result placeholders information
let phase = 0; // reords if operator was pressed or not
let side = 0; // records at white side of the calculator whould graphic characters pop-up
let randomPic = 0; // variable for random number generator
let minusMonitor = false; // variable to note if numbers are negative or positive
let buff = []; // by converting variable "buffer" to this array makes "buffer" mutable. 
// For Plus_MinusToView function.

document.addEventListener("DOMContentLoaded", function(){ //creating placeholders for images
    for(let i = 1; i < 41; i++) { 
        if (i === 11) {
          leftPos = 3;
          topPos = 6;
        }
        else if (i === 21) {
          leftPos = 3;
          topPos = 9;
        }
        else if (i === 31) {
            leftPos = 3;
            topPos = 12;
          }
        let ltp = document.createElement('img'); // left-top images
        ltp.src = "Images/2-Calculator/Blanco.png";
        ltp.id = "ltpp"+i;
        ltp.style = `position: absolute; left: ${leftPos}vw; top: ${topPos}vw;
        max-width:4vw`;
        leftPos += 3;
        document.body.appendChild(ltp);
        ltpArray.push(ltp.id);
    }

    leftPos = 30;
    topPos = 15;
    let lop = document.createElement('img'); // left operator image
    lop.src = "Images/2-Calculator/Blanco.png";
    lop.id = "lopp";
    lop.style = `position: absolute; left: ${leftPos}vw; top: ${topPos}vw;
    max-width:4vw`;
    document.body.appendChild(lop);

    leftPos = 3;
    topPos = 18;
    for(let i = 1; i < 41; i++) { 
        if (i === 11) {
          leftPos = 3;
          topPos = 21;
        }
        else if (i === 21) {
          leftPos = 3;
          topPos = 24;
        }
        else if (i === 31) {
            leftPos = 3;
            topPos = 27;
          }
        let lbp = document.createElement('img'); // left-bottom images
        lbp.src = "Images/2-Calculator/Blanco.png";
        lbp.id = "lbtp"+i;
        lbp.style = `position: absolute; left: ${leftPos}vw; top: ${topPos}vw;
        max-width:4vw`;
        leftPos += 3;
        document.body.appendChild(lbp);
        lbpArray.push(lbp.id);
    }

    leftPos = 30;
    topPos = 30;
    let lep = document.createElement('img'); //left equal image
    lep.src = "Images/2-Calculator/Blanco.png";
    lep.id = "lepp";
    lep.style = `position: absolute; left: ${leftPos}vw; top: ${topPos}vw;
    max-width:4vw`;
    document.body.appendChild(lep);

    leftPos = 3;
    topPos = 33;
    for(let i = 1; i < 41; i++) { 
        if (i === 11) {
          leftPos = 3;
          topPos = 36;
        }
        else if (i === 21) {
          leftPos = 3;
          topPos = 39;
        }
        else if (i === 31) {
            leftPos = 3;
            topPos = 42;
          }
        let lrp = document.createElement('img'); //left-result images
        lrp.src = "Images/2-Calculator/Blanco.png";
        lrp.id = "lrsp"+i;
        lrp.style = `position: absolute; left: ${leftPos}vw; top: ${topPos}vw;
        max-width:4vw`;
        leftPos += 3;
        document.body.appendChild(lrp);
        lrpArray.push(lrp.id);
    }

//-----------------------------RIGHT SIDE
    leftPos = 52;
    topPos = 3;
    for(let i = 1; i < 41; i++) { 
        if (i === 11) {
          leftPos = 52;
          topPos = 6;
        }
        else if (i === 21) {
          leftPos = 52;
          topPos = 9;
        }
        else if (i === 31) {
            leftPos = 52;
            topPos = 12;
          }
        let rtp = document.createElement('img'); // right-top images
        rtp.src = "Images/2-Calculator/Blanco.png";
        rtp.id = "rtpp"+i;
        rtp.style = `position: absolute; left: ${leftPos}vw; top: ${topPos}vw;
        max-width:4vw`;
        leftPos += 3;
        document.body.appendChild(rtp);
        rtpArray.push(rtp.id);
    }

    leftPos = 79;
    topPos = 15;
    let rop = document.createElement('img'); // right operator image
    rop.src = "Images/2-Calculator/Blanco.png";
    rop.id = "ropp";
    rop.style = `position: absolute; left: ${leftPos}vw; top: ${topPos}vw;
    max-width:4vw`;
    document.body.appendChild(rop);

    leftPos = 52;
    topPos = 18;
    for(let i = 1; i < 41; i++) { 
        if (i === 11) {
          leftPos = 52;
          topPos = 21;
        }
        else if (i === 21) {
          leftPos = 52;
          topPos = 24;
        }
        else if (i === 31) {
            leftPos = 52;
            topPos = 27;
          }
        let rbp = document.createElement('img'); // right-bottom images
        rbp.src = "Images/2-Calculator/Blanco.png";
        rbp.id = "rbtp"+i;
        rbp.style = `position: absolute; left: ${leftPos}vw; top: ${topPos}vw;
        max-width:4vw`;
        leftPos += 3;
        document.body.appendChild(rbp);
        rbpArray.push(rbp.id);
    }

    leftPos = 79;
    topPos = 30;
    let rep = document.createElement('img'); // right equal image
    rep.src = "Images/2-Calculator/Blanco.png";
    rep.id = "repp";
    rep.style = `position: absolute; left: ${leftPos}vw; top: ${topPos}vw;
    max-width:4vw`;
    document.body.appendChild(rep);

    leftPos = 52;
    topPos = 33;
    for(let i = 1; i < 41; i++) { 
        if (i === 11) {
          leftPos = 52;
          topPos = 36;
        }
        else if (i === 21) {
          leftPos = 52;
          topPos = 39;
        }
        else if (i === 31) {
            leftPos = 52;
            topPos = 42;
          }
        let rrp = document.createElement('img'); // right result images
        rrp.src = "Images/2-Calculator/Blanco.png";
        rrp.id = "rrsp"+i;
        rrp.style = `position: absolute; left: ${leftPos}vw; top: ${topPos}vw;
        max-width:4vw`;
        leftPos += 3;
        document.body.appendChild(rrp);
        rrpArray.push(rrp.id);
    }
});

let randomNumbers = function () { //removing and adding pictures of digits and numbers
    let count = 1;
    if (phase == 0 && side == 0) { //removing current pictures before setting new ones
        for(let i = 1; i < 41; i++) { 
            document.getElementById("ltpp"+i).src = "Images/2-Calculator/Blanco.png";
        }  
    }
    if (phase == 1 && side == 0) {
        for(let i = 1; i < 41; i++) { 
            document.getElementById("lbtp"+i).src = "Images/2-Calculator/Blanco.png";
        }
    }
    if (phase == 0 && side == 1) {
        for(let i = 1; i < 41; i++) { 
            document.getElementById("rtpp"+i).src = "Images/2-Calculator/Blanco.png";
        }
    }
    if (phase == 1 && side == 1) {
        for(let i = 1; i < 41; i++) { 
            document.getElementById("rbtp"+i).src = "Images/2-Calculator/Blanco.png";
        }
    }

    for (let i of document.getElementById("View").textContent) { // filling in placeholders with pictures
        if (phase === 0 && side === 0) {
            randomPic = Math.floor(Math.random()*5 + 1);
            if (i == ".") {
                document.getElementById("ltpp"+count).src =  `Images/2-Calculator/dot-${randomPic}.png`;
            }
            else if (i == "-") {
                document.getElementById("ltpp"+count).src =  `Images/2-Calculator/minus-${randomPic}.png`;
            }
            else if (i == "+") {
                document.getElementById("ltpp"+count).src =  `Images/2-Calculator/plus-${randomPic}.png`;
            }
            else {
                document.getElementById("ltpp"+count).src =  `Images/2-Calculator/${i}-${randomPic}.png`;
            }
            count++;
        }
        if (phase == 1 && side == 0) {
            randomPic = Math.floor(Math.random()*5 + 1);
            if (i == ".") {
                document.getElementById("lbtp"+count).src =  `Images/2-Calculator/dot-${randomPic}.png`;
            }
            else if (i == "-") {
                document.getElementById("lbtp"+count).src =  `Images/2-Calculator/minus-${randomPic}.png`;
            }
            else if (i == "+") {
                document.getElementById("ltpp"+count).src =  `Images/2-Calculator/plus-${randomPic}.png`;
            }
            else {
                document.getElementById("lbtp"+count).src =  `Images/2-Calculator/${i}-${randomPic}.png`;
            }
            count++;
        }
        if (phase == 0 && side == 1) {
            randomPic = Math.floor(Math.random()*5 + 1);
            if (i == ".") {
                document.getElementById("rtpp"+count).src =  `Images/2-Calculator/dot-${randomPic}.png`;
            }
            else if (i == "-") {
                document.getElementById("rtpp"+count).src =  `Images/2-Calculator/minus-${randomPic}.png`;
            }
            else if (i == "+") {
                document.getElementById("rtpp"+count).src =  `Images/2-Calculator/plus-${randomPic}.png`;
            }
            else {
                document.getElementById("rtpp"+count).src =  `Images/2-Calculator/${i}-${randomPic}.png`;
            }
            count++;
        }
        if (phase == 1 && side == 1) {
            randomPic = Math.floor(Math.random()*5 + 1);
            if (i == ".") {
                document.getElementById("rbtp"+count).src =  `Images/2-Calculator/dot-${randomPic}.png`;
            }
            else if (i == "-") {
                document.getElementById("rbtp"+count).src =  `Images/2-Calculator/minus-${randomPic}.png`;
            }
            else if (i == "+") {
                document.getElementById("rtpp"+count).src =  `Images/2-Calculator/plus-${randomPic}.png`;
            }
            else {
                document.getElementById("rbtp"+count).src =  `Images/2-Calculator/${i}-${randomPic}.png`;
            }
            count++;

        }   
    } 
}

let RemoveToView = function() { //removing last digit or symbol from "View"
    let remove = document.getElementById("View").textContent;
    if (remove == "") {
        document.getElementById("View").textContent = remove
    }
    else {
        document.getElementById("View").textContent = remove.substring(0, remove.length - 1);
        remove = document.getElementById("View").textContent;
        buffer = buffer.substring(0, buffer.length - 1)
        document.getElementById("bf").textContent = buffer;
        randomNumbers();
    }
}

let SquareToView = function() { //squaring "View"
    let square = document.getElementById("View").textContent;
    document.getElementById("View").textContent = square**2;
    buffer = document.getElementById("View").textContent;
    document.getElementById("bf").textContent = buffer;
    randomPic = Math.floor(Math.random()*5 + 1);
    if (side == 0) {
        document.getElementById("lopp").src = `Images/2-Calculator/square-${randomPic}.png`;
    }
    if (side == 1) {
        document.getElementById("ropp").src = `Images/2-Calculator/square-${randomPic}.png`;
    }
    EqualToView();
}

let RootToView = function() { // root of "View"
    let root = document.getElementById("View").textContent;
    document.getElementById("View").textContent = Math.sqrt(root);
    buffer = document.getElementById("View").textContent;
    document.getElementById("bf").textContent = buffer;
    randomPic = Math.floor(Math.random()*5 + 1);
    if (side == 0) {
        document.getElementById("lopp").src = `Images/2-Calculator/root-${randomPic}.png`;
    }
    if (side == 1) {
        document.getElementById("ropp").src = `Images/2-Calculator/root-${randomPic}.png`;
    }
    EqualToView();
}

let ResetToView = function() { //Resetting View
    document.getElementById("View").textContent = "0";
    buffer = 0;
    document.getElementById("bf").textContent = buffer;
    operator = 1;
    operator_equal = 1;
    phase = 0;
    side = 0;
    for(let i = 1; i < 41; i++) { 
        document.getElementById("ltpp"+i).src = "Images/2-Calculator/Blanco.png";
        document.getElementById("lbtp"+i).src = "Images/2-Calculator/Blanco.png";
        document.getElementById("rtpp"+i).src = "Images/2-Calculator/Blanco.png";
        document.getElementById("rbtp"+i).src = "Images/2-Calculator/Blanco.png";
        document.getElementById("rrsp"+i).src = "Images/2-Calculator/Blanco.png";
        document.getElementById("lrsp"+i).src = "Images/2-Calculator/Blanco.png";
    }  
    document.getElementById("lopp").src = "Images/2-Calculator/Blanco.png";
    document.getElementById("lepp").src = "Images/2-Calculator/Blanco.png";
    document.getElementById("repp").src = "Images/2-Calculator/Blanco.png";
    document.getElementById("ropp").src = "Images/2-Calculator/Blanco.png";
}

let numberToView = function(i) { 
    let savedView = document.getElementById("View").textContent;
    if (operator_equal == null) {
        document.getElementById("View").textContent = i;
        buffer=i;
        document.getElementById("bf").textContent = buffer;
        operator_equal++
    }
    else if (operator != null && savedView.toString() == "0" ) {
        document.getElementById("View").textContent = i;
        buffer=i
        document.getElementById("bf").textContent = buffer;
        operator++;
        operator_equal++
    }
    else if (operator != null && savedView.toString() == "-0" ) {
        document.getElementById("View").textContent = "-" + i;
        buffer="-" + i
        document.getElementById("bf").textContent = buffer;
        operator++;
        operator_equal++
    }
    else if (operator != null && savedView.toString() != "0" ) {
        document.getElementById("View").textContent = savedView + i;
        buffer+=i
        document.getElementById("bf").textContent = buffer;
        operator++;
        operator_equal++
    }
    else if (operator == null) {
        document.getElementById("View").textContent = i;
        operator++;
        buffer+=i
        document.getElementById("bf").textContent = buffer;
    }
    randomNumbers();
}

let DotToView = function() { // Adding a dot to View
    let dot = document.getElementById("View").textContent;
    if (dot.includes(".") == true) {
        if (operator == null) {
        document.getElementById("View").textContent = "0.";
        operator++;
        buffer+="."
        document.getElementById("bf").textContent = buffer;
        }
        else if (operator_equal == null) {
            document.getElementById("View").textContent = "0.";
            operator_equal++;
            buffer="0."
            document.getElementById("bf").textContent = buffer;
            } 
        else document.getElementById("View").textContent = dot;
    }
    else{
        if (operator == null) {
            document.getElementById("View").textContent = "0.";
            operator++;
            buffer+="."
            document.getElementById("bf").textContent = buffer;
            }
            else if (operator_equal == null) {
                document.getElementById("View").textContent = "0.";
                operator_equal++;
                buffer="0."
                document.getElementById("bf").textContent = buffer;
                } 
            else {
                document.getElementById("View").textContent = dot + ".";
                buffer+="."
                document.getElementById("bf").textContent = buffer;
            }
    }
    randomNumbers();
}

let pmmdOperatorToView = function(i) { // adding "+" to Buffer
    let savedView = document.getElementById("View").textContent;
    if (buffer != "0" &&
     buffer.endsWith("-") == false &&
     buffer.endsWith("+") == false &&
     buffer.endsWith("*") == false &&
     buffer.endsWith("/") == false) {
        document.getElementById("View").textContent = eval(buffer);
    }
    if (buffer.endsWith("-") == true ||
     buffer.endsWith("+") == true ||
     buffer.endsWith("*") == true ||
     buffer.endsWith("/") == true) {
        buffer = buffer.substring(0, buffer.length - 1)
    }
    buffer = buffer + i;
    document.getElementById("bf").textContent = buffer;
    document.getElementById("View").textContent = savedView;
    operator = null;
    operator_equal++;
    let randomOperator;
    if (i === "+")  randomOperator = "plus";
    if (i === "-")  randomOperator = "minus";
    if (i === "*")  randomOperator = "multiply";
    if (i === "/")  randomOperator = "divide";
    randomPic = Math.floor(Math.random()*5 + 1);
    if (side == 0) {
        document.getElementById("lopp").src = `Images/2-Calculator/${randomOperator}-${randomPic}.png`;
    }
    if (side == 1) {
        document.getElementById("ropp").src = `Images/2-Calculator/${randomOperator}-${randomPic}.png`;
    }
    phase = 1;
}
let EqualToView = function() { // evaluating the expression
    if (buffer.includes("--") == true) {
        buffer = buffer.replace("--", "+");
    }
    document.getElementById("View").textContent = eval(buffer);
    let equal = eval(buffer);
    buffer = document.getElementById("View").textContent;
    document.getElementById("bf").textContent = buffer;
    operator_equal = null;
    operator++;
    let count = 1;
    for (let i of document.getElementById("View").textContent) {
        randomPic = Math.floor(Math.random()*5 + 1);
        if (side == 0) {
            document.getElementById("lepp").src = `Images/2-Calculator/equal-${randomPic}.png`;
            for (let l of lrpArray) {
                if (i == ".") {
                    document.getElementById("lrsp"+count).src =  `Images/2-Calculator/dot-${randomPic}.png`;
                }
                else if (i == "-") {
                    document.getElementById("lrsp"+count).src =  `Images/2-Calculator/minus-${randomPic}.png`;
                }
                else if (i == "+") {
                    document.getElementById("lrsp"+count).src =  `Images/2-Calculator/plus-${randomPic}.png`;
                }
                else if (i == "N" || i == "a") {
                   return null;
                }
                else {
                    document.getElementById("lrsp"+count).src =  `Images/2-Calculator/${i}-${randomPic}.png`;
                }
                count++;
                break;
            }
        }
        if (side == 1) {
            document.getElementById("repp").src = `Images/2-Calculator/equal-${randomPic}.png`;
            for (let l of rrpArray) {
                if (i == ".") {
                    document.getElementById("rrsp"+count).src =  `Images/2-Calculator/dot-${randomPic}.png`;
                }
                else if (i == "-") {
                    document.getElementById("rrsp"+count).src = `Images/2-Calculator/minus-${randomPic}.png`;
                }
                else if (i == "+") {
                    document.getElementById("lrsp"+count).src = `Images/2-Calculator/plus-${randomPic}.png`;
                }
                else if (i == "N" || i == "a") {
                    return null;
                }
                else {
                    document.getElementById("rrsp"+count).src = `Images/2-Calculator/${i}-${randomPic}.png`;
                }
                count++;
                break;
            }
        }
    }
    if (side == 0) {
        for (let i of rtpArray) {
            document.getElementById(i).src = "Images/2-Calculator/Blanco.png";
        }
        for (let i of rbpArray) {
            document.getElementById(i).src = "Images/2-Calculator/Blanco.png";
        }
        for (let i of rrpArray) {
            document.getElementById(i).src = "Images/2-Calculator/Blanco.png";
        }
        document.getElementById("ropp").src = "Images/2-Calculator/Blanco.png";
        document.getElementById("repp").src = "Images/2-Calculator/Blanco.png";
        side = 1;
    }
    else {
        for (let i of ltpArray) {
            document.getElementById(i).src = "Images/2-Calculator/Blanco.png";
        }
        for (let i of lbpArray) {
            document.getElementById(i).src = "Images/2-Calculator/Blanco.png";
        }
        for (let i of lrpArray) {
            document.getElementById(i).src = "Images/2-Calculator/Blanco.png";
        }
        document.getElementById("lopp").src = "Images/2-Calculator/Blanco.png";
        document.getElementById("lepp").src = "Images/2-Calculator/Blanco.png";
        side = 0;
    }
    phase = 0;
}

let Plus_MinusToView = function() { // adding or removing "-" to View
    let plus_minus = document.getElementById("View").textContent;
    if (operator_equal == null) {
        document.getElementById("View").textContent = "-";
        buffer="-";
        document.getElementById("bf").textContent = buffer;
        operator++
        operator_equal++
    }
    else if (operator == null) {
        document.getElementById("View").textContent = "-";
        buffer= buffer + "-";
        document.getElementById("bf").textContent = buffer;
        operator_equal++
        operator++
    }
    else if (operator != null && operator_equal != null && plus_minus.includes("-") == true) {
        buff = buffer.split(""); // splitting string to array to make it mutable
        for (let i = buff.length - 1; i >= 0; i--) {
            if (buff[i] == "-") {
                buff[i] = "";
                document.getElementById("bf").textContent = buffer;
                break;
            }
        }
        buffer = buff.join("");
        document.getElementById("View").textContent = plus_minus.replace("-", "");
        document.getElementById("bf").textContent = buffer;
        operator_equal++
        operator++
    }
    else if (operator != null && operator_equal != null && plus_minus.includes("-") == false) {
        if (buffer.length == undefined || buffer.length == 0) {
            buffer = "-";
            document.getElementById("View").textContent = "-"
        }
        else {
            buff = buffer.split("");
            minusMonitor = false;
            for (let i = buff.length - 1; i >= 0; i--) {
                if (buff[i] == "-") {
                    buff[i] = "--";
                    minusMonitor = false;
                    break;
                }
                else if (buff[i] == "+") {
                    buff[i] = "+-";
                    minusMonitor = false;
                    break;
                }
                else if (buff[i] == "*") {
                    buff[i] = "*-";
                    minusMonitor = false;
                    break;
                }
                else if (buff[i] == "/") {
                    buff[i] = "/-";
                    minusMonitor = false;
                    break;
                }
                else minusMonitor = true;
            }
        if (minusMonitor == true) buff.unshift("-"); 
        buffer = buff.join("");
        document.getElementById("View").textContent = "-" + plus_minus;
    }
    document.getElementById("bf").textContent = buffer;
    operator_equal++
    operator++
    }
    randomNumbers();
}

