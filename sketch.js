const NUM_TRIES = 6;
const NUM_LETTERS = 6;
const CANVAS_WIDTH = 500;
const TILE_SIZE = 70;

const LEFT_BOUND = CANVAS_WIDTH/2-NUM_LETTERS/2*TILE_SIZE;
const TOP_BOUND = 20;

readTextFile("./6_letter_words.txt");
const VALID_WORDS = document.getElementById("valid_words").innerHTML.split(" ");
console.log(VALID_WORDS.length);
const SECRET_WORD = "cursed";

const ALPHABET = "abcdefghijklmnopqrstuvwxyz";

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
    background(0,0,0);
    for (var i=0; i<NUM_TRIES; i++) {
        for (var j=0; j<NUM_LETTERS; j++) {
            strokeWeight(2);
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
                fill(240,240,240);
                stroke(200,200,200);
            }
            rect(LEFT_BOUND+j*TILE_SIZE, TOP_BOUND+i*TILE_SIZE, TILE_SIZE, TILE_SIZE);
            fill(0,0,0);
            noStroke();
            textSize(45);
            text(grid[i][j], LEFT_BOUND+j*TILE_SIZE+TILE_SIZE/2, TOP_BOUND+i*TILE_SIZE+TILE_SIZE/2);
        }
    }
}

function keyPressed() {
    var nkey = key;
    if (key === "Backspace" && current_pos>0) {
        grid[current_row][current_pos-1] = " ";
        current_guess = current_guess.slice(0,-1);
        current_pos -= 1;
    }
    if (key === "Enter" && current_pos === NUM_LETTERS && current_row<NUM_TRIES) {
        if (VALID_WORDS.includes(current_guess)) {
            for (var i=0; i<NUM_LETTERS; i++) {
                if (SECRET_WORD.includes(grid[current_row][i])) {
                    if (SECRET_WORD.indexOf(grid[current_row][i]) === i) {
                        colors[current_row][i] = "g";
                    } else {
                        colors[current_row][i] = "y";
                    }
                } else {
                    colors[current_row][i] = "b";
                }
            }
            console.log(current_guess);

            current_row += 1;
            current_pos = 0;
            current_guess = "";
        } else {
            console.log("not a word");
        }
    }
    if (ALPHABET.includes(nkey) && current_pos<NUM_LETTERS && current_row<NUM_TRIES) {
        grid[current_row][current_pos] = nkey;
        current_guess += nkey;
        current_pos += 1;
    }
    console.log(current_guess);
    return false;
}
