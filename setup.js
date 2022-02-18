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
