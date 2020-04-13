'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function(inputStdin) {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.split('\n');

    main();
});

function readLine() {
    return inputString[currentLine++];
}

// Complete the birthday function below.
function birthday(s, d, m) {
    var chocSegs = s; // array of chocolate segments with integer values
    var birthDay = d; // day of birth - must equal sum of integer values
    var birthMonth = m; // month of birth - must equal number of segments
    var numSegs = 0; // number of segments used
    var totalOfSegs = 0; // total of integers in segments
    var countMatchingPieces = 0; // number of segments that can match criteria
    var index = 0;
    
    // iterate through chocolate bar segments
    for (var i = 0; i < chocSegs.length; i++) {
        numSegs = 0;
        totalOfSegs = 0;
        index = i; // start inner while loop at current segment
        // starting at the current segment, loop while both numSegs and totalOfSegs
        // are less than their limits
        while (numSegs <= birthMonth && totalOfSegs <= birthDay) {
            numSegs += 1; // increment numSegs
            totalOfSegs += chocSegs[index]; // sum integer values
            // if the numSegs and totalOfSegs satisfy requirements thn
            // increment countMatchingPieces
            if (numSegs === birthMonth && totalOfSegs === birthDay) {
                countMatchingPieces += 1;
            }
            index += 1;
        }
    }
    return countMatchingPieces;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine().trim(), 10);

    const s = readLine().replace(/\s+$/g, '').split(' ').map(sTemp => parseInt(sTemp, 10));

    const dm = readLine().replace(/\s+$/g, '').split(' ');

    const d = parseInt(dm[0], 10);

    const m = parseInt(dm[1], 10);

    const result = birthday(s, d, m);

    ws.write(result + '\n');

    ws.end();
}
