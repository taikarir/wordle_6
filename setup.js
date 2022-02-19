function readTextFile(file) {
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;
                document.getElementById("valid_words").innerHTML = allText;
            }
        }
    }
    rawFile.send(null);
}
function randomizeWord() {
    SECRET_WORD = VALID_SECRET_WORDS[Math.round(Math.random()*(VALID_SECRET_WORDS.length-1))];
    return SECRET_WORD;
}
function selectWord(word) {
    if (word.length !== NUM_LETTERS) {
        console.log("Wrong word length");;
        return SECRET_WORD;
    } else if (VALID_WORDS.includes(word) === false) {
        console.log("Not a valid word");
        return SECRET_WORD;
    } else {
        SECRET_WORD = word;
    } 
    return SECRET_WORD;
}
function showKeyboard() {
    const KEY_SIZE = 40;
    var top_row = "qwertyuiop";
    var mid_row = "asdfghjkl";
    var bot_row = "zxcvbnm";
    var rows = [top_row,mid_row,bot_row];
    textSize(15);
    for (var row of rows) {
        for (var i=0; i<row.length; i++) {
            if (known_letters[row[i]] === 2) {
                fill(106,170,100);
            } else if (known_letters[row[i]] === 1) {
                fill(201,180,88);
            } else if (known_letters[row[i]] === 0) {
                fill(120,124,126);
            } else {
                noFill();
            }
            stroke(200,200,200);
            rect(CANVAS_WIDTH/2-row.length/2*KEY_SIZE+i*KEY_SIZE,TOP_BOUND+TILE_SIZE*(NUM_TRIES+3)+rows.indexOf(row)*KEY_SIZE,KEY_SIZE,KEY_SIZE);
            noStroke();
            fill(240,240,240);
            text(row[i],CANVAS_WIDTH/2-row.length/2*KEY_SIZE+KEY_SIZE/2+i*KEY_SIZE,TOP_BOUND+TILE_SIZE*(NUM_TRIES+3)+rows.indexOf(row)*KEY_SIZE+KEY_SIZE/2);
        }
    }
}
