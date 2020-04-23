'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', inputStdin => {
    inputString += inputStdin;
});

process.stdin.on('end', _ => {
    inputString = inputString.replace(/\s*$/, '')
        .split('\n')
        .map(str => str.replace(/\s*$/, ''));

    main();
});

function readLine() {
    return inputString[currentLine++];
}

// Complete the biggerIsGreater function below.
function biggerIsGreater(w) {
    // Split the input string into an array
    var letters = w.split("");

    // If the length of the string is 1 then it cannot be improved upon
    if (letters.length <= 1) {
        return "no answer";
    }

    // Start at the end of the string
    var pos1 = letters.length - 1;

    // Check if the string is in descending order - if it is then
    // it cannot be improved upon by shuffling letters
    while (pos1 > 0 && letters[pos1] <= letters[pos1 - 1]) pos1--;

    // If the index is 0 then the string is in descending order
    if (pos1 === 0) {
        return "no answer";
    }

    // Since the string is not in descending order, we will try to
    // create a string that is "bigger" in lexographic order
    // Start by setting j to where the string is no longer descending
    var pos2 = pos1;

    // point to the previous letter
    pos1--;

    // put the value of the letter at which the string stopped being
    // descending into min
    var small = letters[pos2];

    for (var k = pos1 + 2; k < letters.length; k++) {
        if ((letters[k] < small) && (letters[k] > letters[pos1])) {
            pos2 = k;
            small = letters[pos2];
        }
    }

    // Swap letters
    var temp = letters[pos2];
    letters[pos2] = letters[pos1];
    letters[pos1] = temp;

    // The beginning of the array can be left alone
    var beginArr = letters.slice(0, pos1 + 1);
    // Sort the end of the array
    var endArr = letters.slice(pos1 + 1, letters.length);
    endArr = endArr.sort((a, b) => ((a >= b) ? 1 : -1));

    // Build the return string
    var beginString = beginArr.join("");
    var endString = endArr.join("");

    return beginString.concat(endString);
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const T = parseInt(readLine(), 10);

    for (let TItr = 0; TItr < T; TItr++) {
        const w = readLine();

        let result = biggerIsGreater(w);

        ws.write(result + "\n");
    }

    ws.end();
}
