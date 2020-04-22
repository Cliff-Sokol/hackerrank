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

// Complete the encryption function below.
function encryption(s) {
    // console.log("s", s);

    // var noSpace = s.replace(" ", "");
    var noSpace = s;

    // Get the square root of the length of the string
    var sqrRoot = Math.sqrt(noSpace.length);
    // Rows is the floor
    var rows = Math.floor(sqrRoot);
    // Cols is the ceil
    var cols = Math.ceil(sqrRoot);
    // If the rows * cols is less than the length then we need to add 1 to the
    // rows and also pad the string with the number of spaces different
    if (rows * cols < noSpace.length) {
        rows += 1;
        // noSpace = noSpace.concat(" ".repeat((rows * cols) - noSpace.length));
    }
    // console.log("sr:", sqrRoot, "r:", rows, "c:", cols);

    var encString = "";
    var charLoc = 0;
    for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++) {
            // Calculate the next character location
            charLoc = (i + j * cols);
            if (charLoc <= noSpace.length) {
                // console.log("cL:", charLoc);
                // Append the character to the encryption string
                encString = encString.concat(noSpace.charAt(charLoc));
            }
        }
        // After every inner loop add a space
        encString = encString.concat(" ");
    }

    return encString;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const s = readLine();

    let result = encryption(s);

    ws.write(result + "\n");

    ws.end();
}
