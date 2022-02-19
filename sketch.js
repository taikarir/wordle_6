console.log("Welcome to Wordle.6!\nTo choose a new secret word, type 'SECRET_WORD = randomizeWord();'\nTo select a secret word, type 'SECRET_WORD = selectWord('YourWordHere');'");

const NUM_TRIES = 5;
const NUM_LETTERS = 6;
const CANVAS_WIDTH = 500;
const TILE_SIZE = 60;

const H_SPACING = 10;
const V_SPACING = 10;
const LEFT_BOUND = CANVAS_WIDTH/2-NUM_LETTERS/2*TILE_SIZE-H_SPACING*(NUM_LETTERS-1)/2;
const TOP_BOUND = 20;


// get list of valid words
readTextFile("./6_letter_words.txt");
const VALID_WORDS_ = document.getElementById("valid_words").innerHTML.split(" ");
// get list of valid secret words
readTextFile("./6_letter_secret_words.txt");
const VALID_SECRET_WORDS = document.getElementById("valid_words").innerHTML.split("\n    ");
const VALID_WORDS = VALID_WORDS_.concat(VALID_SECRET_WORDS);

var SECRET_WORD;
SECRET_WORD = randomizeWord();

var SECRET_LETTERS = {};
// get letter count of secret word
for (var l of SECRET_WORD) {
    if (SECRET_LETTERS[l]) {
        SECRET_LETTERS[l]+=1;
    } else {
        SECRET_LETTERS[l]=1;
    }
}

const ALPHABET = "abcdefghijklmnopqrstuvwxyz";

var won = 0;
var known_letters = {};
var current_row = 0;
var current_pos = 0;
var current_guess = "";
var grid = [];
var colors = [];
// populate grid
for (var i=0; i<NUM_TRIES; i++) {
    var one_row = [];
    var one_row2 = [];
    for (var j=0; j<NUM_LETTERS; j++) {
        one_row.push(" ");
        one_row2.push(" ");
    }
    grid.push(one_row);
    colors.push(one_row2);
}

function preload() {
    myFont = loadFont("Helvetica-Bold.ttf");
}

function setup() {
    var cnv = createCanvas(CANVAS_WIDTH,windowHeight);
    cnv.style("display","block");
    textFont(myFont);
    textAlign(CENTER,CENTER);
}

function draw() {
    background(70,70,80);
    for (var i=0; i<NUM_LETTERS; i++) {
        if (won === 0 && current_row>0 && colors[current_row-1][i]==="g") {
            if (i<NUM_LETTERS-1) {
                continue;
            }
        } else {
            break;
        }
        console.log("You won");
        won = 1;
    }
    if (won === 0 && current_row === NUM_TRIES) {
        won = 2;
        console.log("You lost. The word was "+SECRET_WORD);
    }
    for (var i=0; i<NUM_TRIES; i++) {
        for (var j=0; j<NUM_LETTERS; j++) {
            strokeWeight(2);
            // colors tiles
            if (colors[i][j]==="y") {
                fill(201,180,88);
                stroke(201,180,88);
            } else if (colors[i][j]==="g") {
                fill(106,170,100);
                stroke(106,170,100);
            } else if (colors[i][j]==="b") {
                fill(120,124,126);
                stroke(120,124,126);
            } else {
                noFill();
                if (grid[i][j]!==" ") {
                    stroke(10,10,10);
                } else {
                    stroke(200,200,200);
                }
            }
            rect(H_SPACING*j+LEFT_BOUND+j*TILE_SIZE, V_SPACING*i+TOP_BOUND+i*TILE_SIZE, TILE_SIZE, TILE_SIZE);
            if (colors[i][j]!==" ") {
                fill(240,240,240);
            } else {
                fill(0,0,0);
            }
            noStroke();
            textSize(45);
            text(grid[i][j], H_SPACING*j+LEFT_BOUND+j*TILE_SIZE+TILE_SIZE/2, V_SPACING*i+TOP_BOUND+i*TILE_SIZE+TILE_SIZE/2);
        }
    }
    showKeyboard();
    if (won === 1) {
        textSize(20);
        fill(240,240,240);
        text("You won! Click to play again", CANVAS_WIDTH/2,TOP_BOUND+TILE_SIZE*(NUM_TRIES+2));
    } else if (won === 2) {
        textSize(20);
        fill(240,240,240);
        text("You lost. The word was "+SECRET_WORD.toUpperCase()+"\nClick to play again", CANVAS_WIDTH/2,TOP_BOUND+TILE_SIZE*(NUM_TRIES+2));
    }
}

function keyPressed() {
    if (won) {
        return false;
    }
    var nkey = key;
    // delete key
    if (key === "Backspace" && current_pos>0) {
        grid[current_row][current_pos-1] = " ";
        current_guess = current_guess.slice(0,-1);
        current_pos -= 1;
    }
    // enter guess
    if (key === "Enter" && current_pos === NUM_LETTERS && current_row<NUM_TRIES) {
        // only valid words are allowed
        if (VALID_WORDS.includes(current_guess)) {
            var letter_count = {};
            for (var l of current_guess) {
                if (letter_count[l]) {
                    letter_count[l]+=1;
                } else{
                    letter_count[l]=1;
                }
            }
            // coloring letters
            for (var i=0; i<NUM_LETTERS; i++) {
                var letter = grid[current_row][i]
                if (SECRET_WORD.includes(letter)) {
                    var ind = SECRET_WORD.indexOf(letter);
                    if (ind === i || SECRET_WORD.indexOf(letter,ind+1) === i || SECRET_WORD.lastIndexOf(letter) === i) {
                        colors[current_row][i] = "g";
                        known_letters[letter] = 2;
                    } else {
                        colors[current_row][i] = "y";
                        known_letters[letter] = 1;
                    }
                } else {
                    colors[current_row][i] = "b";
                    known_letters[letter] = 0;
                }
            }
            console.log("You guessed: "+current_guess);

            current_row += 1;
            current_pos = 0;
            current_guess = "";
        } else {
            console.log("Error: not a word");
        }
    }
    // only letters are allowed
    if (ALPHABET.includes(nkey) && current_pos<NUM_LETTERS && current_row<NUM_TRIES) {
        grid[current_row][current_pos] = nkey;
        current_guess += nkey;
        current_pos += 1;
    }
    return false;
}

function mouseClicked() {
    // resets game state
    if (won !== 0) {
        won = 0;
        SECRET_WORD = randomizeWord();
        current_row = 0;
        current_pos = 0;
        current_guess = "";
        grid = [];
        colors = [];
        for (var i=0; i<NUM_TRIES; i++) {
            var one_row = [];
            var one_row2 = [];
            for (var j=0; j<NUM_LETTERS; j++) {
               one_row.push(" ");
               one_row2.push(" ");
            }
        grid.push(one_row);
        colors.push(one_row2);
        }
    }
    return false;
}
