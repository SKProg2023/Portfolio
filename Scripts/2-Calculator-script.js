let buffer = 0; // collects all information from user's input
let operator = 1; //checks if operator was pressed
let operator_equal = 1; //checks if 'equal' was pressed
let RemoveToView = function() {
    let remove = document.getElementById("View").textContent;
    if (remove == "") {
        document.getElementById("View").textContent = remove
    }
    else {
        document.getElementById("View").textContent = remove.substring(0, remove.length - 1);
        buffer = buffer.substring(0, buffer.length - 1)
    }
}
let SquareToView = function() {
    let square = document.getElementById("View").textContent;
    document.getElementById("View").textContent = square**2;
    buffer = document.getElementById("View").textContent;
}
let RootToView = function() {
    let root = document.getElementById("View").textContent;
    document.getElementById("View").textContent = Math.sqrt(root);
    buffer = document.getElementById("View").textContent;
}
let ResetToView = function() {
    document.getElementById("View").textContent = "0";
    buffer = 0;
    operator = 1;
    operator_equal = 1;
}
let OneToView = function() {
    let one = document.getElementById("View").textContent;
    if (operator_equal == null) {
        document.getElementById("View").textContent = "1";
        buffer="1";
        operator_equal++
    }
    else if (operator != null && one.toString() == "1" ) {
        document.getElementById("View").textContent = "1";
        buffer+="1"
        operator++;
        operator_equal++
    }
    else if (operator != null && one.toString() != "0" ) {
        document.getElementById("View").textContent = one + "1";
        buffer+="1"
        operator++;
        operator_equal++
    }
    else if (operator == null) {
        document.getElementById("View").textContent = "1";
        operator++;
        buffer+="1"
    }
}
let TwoToView = function() {
    let two = document.getElementById("View").textContent;
    if (operator_equal == null) {
        document.getElementById("View").textContent = "2";
        buffer="2";
        operator_equal++
    }
    else if (operator != null && two.toString() == "0" ) {
        document.getElementById("View").textContent = "2";
        buffer+="2"
        operator++;
        operator_equal++
    }
    else if (operator != null && two.toString() != "0" ) {
        document.getElementById("View").textContent = two + "2";
        buffer+="2"
        operator++;
        operator_equal++
    }
    else if (operator == null) {
        document.getElementById("View").textContent = "2";
        operator++;
        buffer+="2"
    }
}
let ThreeToView = function() {
    let three = document.getElementById("View").textContent;
    if (operator_equal == null) {
        document.getElementById("View").textContent = "3";
        buffer="3";
        operator_equal++
    }
    else if (operator != null && three.toString() == "0" ) {
        document.getElementById("View").textContent = "3";
        buffer+="3"
        operator++;
        operator_equal++
    }
    else if (operator != null && three.toString() != "0" ) {
        document.getElementById("View").textContent = three + "3";
        buffer+="3"
        operator++;
        operator_equal++
    }
    else if (operator == null) {
        document.getElementById("View").textContent = "3";
        operator++;
        buffer+="3"
    }
}
let FourToView = function() {
    let four = document.getElementById("View").textContent;
    if (operator_equal == null) {
        document.getElementById("View").textContent = "4";
        buffer="4";
        operator_equal++
    }
    else if (operator != null && four.toString() == "0" ) {
        document.getElementById("View").textContent = "4";
        buffer+="4"
        operator++;
        operator_equal++
    }
    else if (operator != null && four.toString() != "0" ) {
        document.getElementById("View").textContent = four + "4";
        buffer+="4"
        operator++;
        operator_equal++
    }
    else if (operator == null) {
        document.getElementById("View").textContent = "4";
        operator++;
        buffer+="4"
    }
}
let FiveToView = function() {
    let five = document.getElementById("View").textContent;
    if (operator_equal == null) {
        document.getElementById("View").textContent = "5";
        buffer="5";
        operator_equal++
    }
    else if (operator != null && five.toString() == "0" ) {
        document.getElementById("View").textContent = "5";
        buffer+="5"
        operator++;
        operator_equal++
    }
    else if (operator != null && five.toString() != "0" ) {
        document.getElementById("View").textContent = five + "5";
        buffer+="5"
        operator++;
        operator_equal++
    }
    else if (operator == null) {
        document.getElementById("View").textContent = "5";
        operator++;
        buffer+="5"
    }
}
let SixToView = function() {
    let six = document.getElementById("View").textContent;
    if (operator_equal == null) {
        document.getElementById("View").textContent = "6";
        buffer="6";
        operator_equal++
    }
    else if (operator != null && six.toString() == "0" ) {
        document.getElementById("View").textContent = "6";
        buffer+="6"
        operator++;
        operator_equal++
    }
    else if (operator != null && six.toString() != "0" ) {
        document.getElementById("View").textContent = six + "6";
        buffer+="6"
        operator++;
        operator_equal++
    }
    else if (operator == null) {
        document.getElementById("View").textContent = "6";
        operator++;
        buffer+="6"
    }
}
let SevenToView = function() {
    let seven = document.getElementById("View").textContent;
    if (operator_equal == null) {
        document.getElementById("View").textContent = "7";
        buffer="7";
        operator_equal++
    }
    else if (operator != null && seven.toString() == "0" ) {
        document.getElementById("View").textContent = "7";
        buffer+="7"
        operator++;
        operator_equal++
    }
    else if (operator != null && seven.toString() != "0" ) {
        document.getElementById("View").textContent = seven + "7";
        buffer+="7"
        operator++;
        operator_equal++
    }
    else if (operator == null) {
        document.getElementById("View").textContent = "7";
        operator++;
        buffer+="7"
    }
}
let EightToView = function() {
    let eight = document.getElementById("View").textContent;
    if (operator_equal == null) {
        document.getElementById("View").textContent = "8";
        buffer="8";
        operator_equal++
    }
    else if (operator != null && eight.toString() == "0" ) {
        document.getElementById("View").textContent = "8";
        buffer+="8"
        operator++;
        operator_equal++
    }
    else if (operator != null && eight.toString() != "0" ) {
        document.getElementById("View").textContent = eight + "8";
        buffer+="8"
        operator++;
        operator_equal++
    }
    else if (operator == null) {
        document.getElementById("View").textContent = "8";
        operator++;
        buffer+="8"
    }
}
let NineToView = function() {
    let nine = document.getElementById("View").textContent;
    if (operator_equal == null) {
        document.getElementById("View").textContent = "9";
        buffer="9";
        operator_equal++
    }
    else if (operator != null && nine.toString() == "0" ) {
        document.getElementById("View").textContent = "9";
        buffer+="9"
        operator++;
        operator_equal++
    }
    else if (operator != null && nine.toString() != "0" ) {
        document.getElementById("View").textContent = nine + "9";
        buffer+="9"
        operator++;
        operator_equal++
    }
    else if (operator == null) {
        document.getElementById("View").textContent = "9";
        operator++;
        buffer+="9"
    }
}

let ZeroToView = function() {
    let zero = document.getElementById("View").textContent;
    if (operator_equal == null) {
        document.getElementById("View").textContent = "0";
        buffer="0";
        operator_equal++
    }
    else if (operator != null && zero.toString() == "0" ) {
        document.getElementById("View").textContent = "0";
        buffer+="0"
        operator++;
        operator_equal++
    }
    else if (operator != null && zero.toString() != "0" ) {
        document.getElementById("View").textContent = zero + "0";
        buffer+="0"
        operator++;
        operator_equal++
    }
    else if (operator == null) {
        document.getElementById("View").textContent = "0";
        buffer+="0"
    }
}
let DotToView = function() {
    let dot = document.getElementById("View").textContent;
    if (dot.includes(".") == true) {
        if (operator == null) {
        document.getElementById("View").textContent = "0.";
        operator++;
        buffer+="."
        }
        else if (operator_equal == null) {
            document.getElementById("View").textContent = "0.";
            operator_equal++;
            buffer="0."
            } 
        else {document.getElementById("View").textContent = dot;}
    }
    else{
        if (operator == null) {
            document.getElementById("View").textContent = "0.";
            operator++;
            buffer+="."
            }
            else if (operator_equal == null) {
                document.getElementById("View").textContent = "0.";
                operator_equal++;
                buffer="0."
                } 
            else {
                document.getElementById("View").textContent = dot + ".";
                buffer+="."
            }
    }
}
let PlusToView = function() {
    if (buffer != "0") {
        document.getElementById("View").textContent = eval(buffer);
    }
    let plus = document.getElementById("View").textContent;
    buffer = plus + "+";
    document.getElementById("View").textContent = plus;
    operator = null;
    operator_equal++;
}
let MinusToView = function() {
    if (buffer != "0") {
        document.getElementById("View").textContent = eval(buffer);
    }
    let minus = document.getElementById("View").textContent;
    buffer = minus + "-";
    document.getElementById("View").textContent = minus;
    operator = null;
    operator_equal++;
}
let MultiplyToView = function() {
    if (buffer != "0") {
        document.getElementById("View").textContent = eval(buffer);
    }
    let multiply = document.getElementById("View").textContent;
    buffer = multiply + "*";
    document.getElementById("View").textContent = multiply;
    operator = null;
    operator_equal++;
}
let DivideToView = function() {
    if (buffer != "0") {
        document.getElementById("View").textContent = eval(buffer);
    }
    let divide = document.getElementById("View").textContent;
    buffer = divide + "/";
    document.getElementById("View").textContent = divide;
    operator = null;
    operator_equal++;
}
let EqualToView = function() {
    document.getElementById("View").textContent = eval(buffer);
    let equal = eval(buffer);
    buffer = document.getElementById("View").textContent;
    operator_equal = null;
    operator++;
}
let Plus_MinusToView = function() {
    let plus_minus = document.getElementById("View").textContent;
    if (plus_minus.includes("-") == true) {
        document.getElementById("View").textContent = plus_minus.replace("-", "");
        buffer = buffer.replace("-", "");
    }
    else {
        document.getElementById("View").textContent = "-" + plus_minus;
        buffer = "-" + buffer;
    }
}