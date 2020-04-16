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

/*
 * Complete the 'nonDivisibleSubset' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER k
 *  2. INTEGER_ARRAY s
 */

function nonDivisibleSubset(k, s) {
    // Create and fill a new array with k elements
    var remArray = new Array(k).fill(0);
    var remainder = 0;
    var initRemainder = 0;
    var numInSubset = 0;

    // console.log("k:", k, "s:", s);

    // Fill the remArray with the number of remainders from
    // modulusing each element of s by k
    for (var i = 0; i < s.length; i++) {
        remainder = s[i] % k;
        remArray[remainder] += 1;
    }

    // console.log("rA:", remArray);

    // Set the initRemainder to the first element of remArray
    initRemainder = remArray[0];

    // Set numInSubset to 1 or 0 depending if initRemainder is greater than 0
    numInSubset = (initRemainder > 0) ? 1 : 0;

    // Iterate through the remArray starting with position 1 through k/2
    // If i != k - i then increase numInSubset by the max of remArray[i] or remArray[k-i]
    // else just increment it by 1
    for (var i = 1; i <= (k / 2); i++) {
             
        // console.log("i:", i, "k-i:", (k-i));
             
        if (i != (k - i)) {
            numInSubset += Math.max(remArray[i], remArray[k - i]);
        } else {
            numInSubset++;
        }
 
        // console.log("nIS:", numInSubset);
    }

    return numInSubset;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

    const n = parseInt(firstMultipleInput[0], 10);

    const k = parseInt(firstMultipleInput[1], 10);

    const s = readLine().replace(/\s+$/g, '').split(' ').map(sTemp => parseInt(sTemp, 10));

    const result = nonDivisibleSubset(k, s);

    ws.write(result + '\n');

    ws.end();
}
