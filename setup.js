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
                //console.log(allText);
                //alert(allText);
                //return allText;
            }
        }
    }
    rawFile.send(null);
}
/*function readTextFile(file) {
    var fr = new FileReader();
    fr.onload = function(e) {
        const VALID_WORDS = fr.result;
        //var file1 = e.target.result;
        //alert(fr.result);
    }
    fr.onerror = (e) => alert(e.target.error.name);
    fr.readAsText(file);
}*/
