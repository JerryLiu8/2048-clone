var score = 0;
var prevState = ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0",];
var currState = ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0",];
function random2(){
    var id = Math.floor(Math.random() * 16) + 1;
    if(document.getElementById(id).innerHTML.length == 0) {
        document.getElementById("b"+id).classList.add('n2');
        document.getElementById(id).innerHTML = 2;
        gameOver();
    }
    else random2();
}
function initialize() {
    random2();
    random2();
}
function readNum(i) {
    if(document.getElementById(i).innerHTML.length == 0) return "0";
    else return document.getElementById(i).innerHTML;
}
function writeNum(i, val) {
    if(val==0) {
        document.getElementById(i).innerHTML = null;
        document.getElementById("b"+i).className = "";
    }
    else {
        document.getElementById(i).innerHTML = val;
        document.getElementById("b"+i).className = "";
        document.getElementById("b"+i).classList.add("n"+val);
    }
}
function moveRight() {
    for(var i=1; i <= 16; i++) {
        if(i%4 === 1) {
            var sumOne = readNum(i);
            var sumTwo = readNum(i+1);
            var sumThree = readNum(i+2);
            var sumFour = readNum(i+3);
            var row = [parseInt(sumOne), parseInt(sumTwo), parseInt(sumThree), parseInt(sumFour)]
            var filteredRow = row.filter(num => num);
            var missing = 4 - filteredRow.length
            var zeros = Array(missing).fill(0);
            var newRow = zeros.concat(filteredRow);

            writeNum(i, newRow[0]);
            writeNum(i+1, newRow[1]);
            writeNum(i+2, newRow[2]);
            writeNum(i+3, newRow[3]);
        }
    }
}
function moveLeft() {
    for(var i=1; i <= 16; i++) {
        if(i%4 === 1) {
            var sumOne = readNum(i);
            var sumTwo = readNum(i+1);
            var sumThree = readNum(i+2);
            var sumFour = readNum(i+3);
            var row = [parseInt(sumOne), parseInt(sumTwo), parseInt(sumThree), parseInt(sumFour)]
            var filteredRow = row.filter(num => num);
            var missing = 4 - filteredRow.length
            var zeros = Array(missing).fill(0);
            var newRow = filteredRow.concat(zeros);

            writeNum(i, newRow[0]);
            writeNum(i+1, newRow[1]);
            writeNum(i+2, newRow[2]);
            writeNum(i+3, newRow[3]);
        }
    }
}
function moveDown() {
    for(var i=1;i <= 4;i++) {
        var sumOne = readNum(i);
        var sumTwo = readNum(i+4);
        var sumThree = readNum(i+8);
        var sumFour = readNum(i+12);
        var column = [parseInt(sumOne), parseInt(sumTwo), parseInt(sumThree), parseInt(sumFour)]
        var filteredColumn = column.filter(num => num);
        var missing = 4 - filteredColumn.length
        var zeros = Array(missing).fill(0);
        var newColumn = zeros.concat(filteredColumn)

        writeNum(i, newColumn[0]);
        writeNum(i+4, newColumn[1]);
        writeNum(i+8, newColumn[2]);
        writeNum(i+12, newColumn[3]);
    }
}
function moveUp() {
    for(var i=1;i <= 4;i++) {
        var sumOne = readNum(i);
        var sumTwo = readNum(i+4);
        var sumThree = readNum(i+8);
        var sumFour = readNum(i+12);
        var column = [parseInt(sumOne), parseInt(sumTwo), parseInt(sumThree), parseInt(sumFour)]
        var filteredColumn = column.filter(num => num);
        var missing = 4 - filteredColumn.length
        var zeros = Array(missing).fill(0);
        var newColumn = filteredColumn.concat(zeros);

        writeNum(i, newColumn[0]);
        writeNum(i+4, newColumn[1]);
        writeNum(i+8, newColumn[2]);
        writeNum(i+12, newColumn[3]);
    }
}
function combineRow() {
    for(var i=1;i < 16;i++) {
        if(readNum(i) === readNum(i+1)) {
            var combined = parseInt(readNum(i)) + parseInt(readNum(i+1));
            writeNum(i, combined);
            writeNum(i+1, 0);
            score += combined;
            document.getElementById("score").innerHTML = "Score: " + score;
        }
    }
    checkWin();
}
function combineColumn() {
    for(var i=1;i < 13;i++) {
        if(readNum(i) === readNum(i+4)) {
            var combined = parseInt(readNum(i)) + parseInt(readNum(i+4));
            writeNum(i, combined);
            writeNum(i+4, 0);
            score += combined;
            document.getElementById("score").innerHTML = "Score: " + score;
        }
    }
    checkWin();
}

function control(e) {
    if(e.keyCode === 37) {
        keyLeft();
    }
    else if(e.keyCode === 38) {
        keyUp();
    }
    else if(e.keyCode === 39) {
        keyRight();
    }
    else if(e.keyCode === 40) {
        keyDown();
    }
}
document.addEventListener('keyup', control)

function keyRight() {
    moveRight();
    combineRow();
    moveRight();
    updateCurrState();
    if(hasChangeOccurred()) {
        random2();
        updateCurrState();
    }
    updatePrevState();
}
function keyLeft() {
    moveLeft();
    combineRow();
    moveLeft();
    updateCurrState();
    if(hasChangeOccurred()) {
        random2();
        updateCurrState();
    }
    updatePrevState();
}
function keyDown() {
    moveDown();
    combineColumn();
    moveDown();
    updateCurrState();
    if(hasChangeOccurred()) {
        random2();
        updateCurrState();
    }
    updatePrevState();
}
function keyUp() {
    moveUp();
    combineColumn();
    moveUp();
    updateCurrState();
    if(hasChangeOccurred()) {
        random2();
        updateCurrState();
    }
    updatePrevState();
}

function updateCurrState() {
    for(var i=0;i<16;i++) {
        currState[i] = readNum(i+1);
    }
}

function updatePrevState() {
    for(var i=0;i<16;i++) {
        prevState[i] = currState[i];
    }
}

function hasChangeOccurred() {
    logStates();
    for(var i=0;i<16;i++) {
        if(currState[i] != prevState[i]) return true;
    }
    return false;
}

function logStates() {
    var str = ""
    for(var i=0;i<16;i++) {
        str += currState[i] + ", "
    }
    console.log(str);
    str = ""
    for(var i=0;i<16;i++) {
        str += prevState[i] + ", "
    }
    console.log(str)
    console.log("\n")
}
function checkWin() {
    for(var i=1;i<=16;i++) {
        if(readNum(i) === '2048') {
            document.getElementById("results").innerHTML = ("You win!");
            document.removeEventListener('keyup',control)
        }
    }
}
function gameOver() {
    for(var i=1;i<=3;i++) {
        if(readNum(i) == readNum(i+1))
            return;
    }
    for(var i=5;i<=7;i++) {
        if(readNum(i) == readNum(i+1))
            return;
    }
    for(var i=9;i<=11;i++) {
        if(readNum(i) == readNum(i+1))
            return;
    }
    for(var i=13;i<=15;i++) {
        if(readNum(i) == readNum(i+1))
            return;
    }

    for(var i=1;i<=9;i+=4) {
        if(readNum(i) == readNum(i+4))
            return;
    }
    for(var i=2;i<=10;i+=4) {
        if(readNum(i) == readNum(i+4))
            return;
    }
    for(var i=3;i<=11;i+=4) {
        if(readNum(i) == readNum(i+4))
            return;
    }
    for(var i=4;i<=12;i+=4) {
        if(readNum(i) == readNum(i+4))
            return;
    }
    var zeros = 0
    for(var i=1;i<=16;i++) {
        if(readNum(i) == '0') zeros++;
    }
    if(zeros === 0) {
        document.getElementById("results").innerHTML = ("You lose!")
        document.removeEventListener('keyup',control)
    }
}
