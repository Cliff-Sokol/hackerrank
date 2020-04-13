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

// Complete the divisibleSumPairs function below.
function divisibleSumPairs(n, k, ar) {
    var numInts = n;
    var divBy = k;
    var numPairs = 0;
    var pairSum = 0;
    var modVal = 0;

    console.log(`num: ${numInts} divBy: ${divBy} ar: ${ar}`);
    // iterate through the array of numbers stopping at n-1
    for (var i = 0; i < ar.length-1; i++) {
        // iterate through the array of numbers starting with i+1 and stopping at n
        for (var j = i+1; j < ar.length; j++) {
            // calculate the sum of the array pair i,j
            pairSum = ar[i] + ar[j];
            modVal = pairSum % divBy;
            console.log(`ar[${i}] + ar[${j}] = ${pairSum}, mod: ${modVal}`);
            // if the pairSum is evenly divisible by divBy then increment pairSum
            if (modVal == 0) {
                numPairs += 1;
            }
        }
    }
    return numPairs;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const nk = readLine().split(' ');

    const n = parseInt(nk[0], 10);

    const k = parseInt(nk[1], 10);

    const ar = readLine().split(' ').map(arTemp => parseInt(arTemp, 10));

    let result = divisibleSumPairs(n, k, ar);

    ws.write(result + "\n");

    ws.end();
}
