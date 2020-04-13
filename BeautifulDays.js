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

// Complete the beautifulDays function below.
function beautifulDays(i, j, k) {
    var numBDs = 0;
    var absDiff = 0;
    var bDString = "";
    var bDArray = [];
    var bDArrayReversed = [];
    var bDStringReversed = "";
    var bDReversed = 0;
    for (var bD = i; bD <= j; bD++) {
        // Create a string from the current value to check
        bDString = bD.toString();
        // Make it an array so it can be reversed
        bDArray = bDString.split("");
        // Reverse the array
        bDArrayReversed = bDArray.reverse();
        // Make it a string
        bDStringReversed = bDArrayReversed.join("");
        // Make it a number
        bDReversed = Number(bDStringReversed);

        absDiff = Math.abs(bD - bDReversed);
        // console.log(bD, bDReversed, absDiff, k, (absDiff % k));
        // If the absolute value of the difference between the current value and
        // its reverse is divisible by k then it is a beautifulDay
        if ((absDiff % k) === 0) {
            numBDs += 1;
        }
    }
    return numBDs;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const ijk = readLine().split(' ');

    const i = parseInt(ijk[0], 10);

    const j = parseInt(ijk[1], 10);

    const k = parseInt(ijk[2], 10);

    let result = beautifulDays(i, j, k);

    ws.write(result + "\n");

    ws.end();
}
