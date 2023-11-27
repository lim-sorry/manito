function generateDictionary() {
    var nameInput = document.getElementById('name');
    var codeInput = document.getElementById('code');
    
    var name = nameInput.value;
    var code = codeInput.value;

    var namesArray = [["지성"], ["경수"], ["주현"], ["덕용","영현"], ["재찬","나연"], ["재윤","이슬"], ["미정","준철"], ["민석","민승"]];
    
    if (!name || !code) {
        alert('Please enter both name and code.');
        return;
    }

    var obfuscationKey = 23;
    var cArray = [571521,812382,157843,458434,345615,942556,184217,678138,354649]
    var dArray = cArray.map(function (code) {
        var key = code * obfuscationKey ^ obfuscationKey;
        while (key > 10000) {
            key = Math.round(key/10);
        }
        return key;
    });
    
    Math.seedrandom(code);
    for (var i=namesArray.length-1; i>-1; i--){
        namesArray[i].forEach(elem => {
            if(elem == name){
                if (code == dArray[i]){
                    var sd = dArray.reduce((a,b)=>a+b, 0);
                    Math.seedrandom(sd);
                    console.log(sd);
                    resultExtract(namesArray, name);
                } else {
                    alert('Please enter right code for name.');
                }
            }
        });
    }    

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

function resultExtract(namesArray, name) {
    var resultDiv = document.getElementById('result');

    var name2;
    for (var i=0; i<namesArray.length; i++) {
        if (namesArray[i].length < 2) continue;
        else if (name == namesArray[i][0]) name2 = namesArray[i][1];
        else if (name == namesArray[i][1]) name2 = namesArray[i][0];
    }

    var shuffledNames1 = [];
    var shuffledNames2 = [];
    for (var i=4; i<namesArray.length; i++) {
        if (Math.random() > 0.5) {
            shuffledNames1[i-4] = namesArray[i][0];
            shuffledNames2[i-4] = namesArray[i][1];
        }else{
            shuffledNames1[i-4] = namesArray[i][1];
            shuffledNames2[i-4] = namesArray[i][0];
        }
    }
    shuffledNames1 = shuffleArray(shuffledNames1);
    shuffledNames2 = shuffleArray(shuffledNames2);
    
    shuffledNames1.push(namesArray[3][0]);
    shuffledNames2.push(namesArray[3][1]);

    var shuffledNames = shuffledNames1.concat(shuffledNames2);
    
    for(var i=0; i<3; i++) {
        insertElementAtRandomIndex(shuffledNames, namesArray[i][0]);
    }
    shuffledNames.push(shuffledNames[0]);
    //console.log(shuffledNames);
    
    var manito = shuffledNames[shuffledNames.findIndex((elem) => elem == name) + 1];
    if (!name2){
        resultDiv.innerHTML = `<p>${name} > ${manito}</p>`;
    } else {
        var manito2 = shuffledNames[shuffledNames.findIndex((elem) => elem == name2) + 1];    
        resultDiv.innerHTML = `<p>${name} > ${manito}\t&\t${name2} > ${manito2}</p>`;
    }
}

function insertElementAtRandomIndex(array, element) {
    // Get a random index within the current array length
    var randomIndex = Math.floor(Math.random() * (array.length + 1));

    // Insert the element at the random index
    array.splice(randomIndex, 0, element);
}
