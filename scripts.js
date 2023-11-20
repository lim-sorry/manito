function generateDictionary() {
    var nameInput = document.getElementById('name');
    var codeInput = document.getElementById('code');
    var resultDiv = document.getElementById('result');

    var name = nameInput.value;
    var code = codeInput.value;
    
    var namesArray = [["지성","경수"], ["덕용","영현"], ["재찬","나연"], ["재윤","이슬"], ["미정","준철"], ["민석","민승"]];
    
    if (!name || !code) {
        alert('Please enter both name and code.');
        return;
    }

    var obfuscationKey = 41;
    var cArray = new Array(39, 19);
    cArray.push(12, 10);
    cArray = cArray.concat(80, 97);
    var dArray = cArray.map(function (code) {
        return code ^ obfuscationKey;
    });
    
    Math.seedrandom(code);
    for (var i=dArray.length-1; i>-1; i--){
        if (namesArray[i][0] == name || namesArray[i][1] == name){
            //console.log(name);
            if (code == dArray[i]){
                //console.log('seed');
                Math.seedrandom(0);
            }
            break;
        }
    }
    
    var names1 = [];
    var names2 = [];
    for (var i=0; i<namesArray.length-1; i++) {
        if (Math.random() > 0.5) {
            names1[i] = namesArray[i][0];
            names2[i] = namesArray[i][1];
        }else{
            names1[i] = namesArray[i][1];
            names2[i] = namesArray[i][0];
        }
    }
    names1 = shuffleArray(names1);
    names2 = shuffleArray(names2);
    

    names1.push(namesArray[namesArray.length-1][0]);
    names2.push(namesArray[namesArray.length-1][1]);
    var names = names1.concat(names2, names1[0]);
    console.log(names);

    manito = names[names.findIndex((elem) => elem == name) + 1];
    
    // Display the result
    resultDiv.innerHTML = '<p>Manito for ' + name + ' is ' + manito + ' !!!</p>';
}

function shuffleArray(array) {
    var shuffledArray = array.slice(); // Create a copy of the array

    // Fisher-Yates shuffle algorithm
    for (var i = shuffledArray.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = shuffledArray[i];
        shuffledArray[i] = shuffledArray[j];
        shuffledArray[j] = temp;
    }

    return shuffledArray;
}
