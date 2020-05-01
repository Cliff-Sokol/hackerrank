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

// Complete the fairRations function below.
function fairRations(B) {

    function isOdd (x) {
        return (x % 2 === 1)
    }

    // Initialize total to 0 and pos to -1 since we haven't given anything
    // out
    var totalLoavesGiven = 0;
    var posLoafGiven = -1;

    // console.log("B", B);

    // Iterate through array of bread loaves
    for(var i = 0; i < B.length; i++) {
        // If number of loaves is odd
        // console.log("i", i, "B[i]", B[i], "pLG", posLoafGiven, "tLG", totalLoavesGiven);
        if (isOdd(B[i])) {
            // If we just calculated count or this is the first time through then
            // set posLoafGiven to current position - this is the first odd number
            // of loaves or the next odd number.  Otherwise increment the count
            // of loaves given to be the difference between the current position
            // and the last position multiplied by 2 (since we give out loaves two
            // at a time).  So if we have skipped one even number of loaves then
            // we might be calculating (3 - 1) * 2 or 4 loaves given out.
            if(posLoafGiven === -1) { 
                posLoafGiven = i;
                // console.log("new pLG", posLoafGiven);
            } else {
                totalLoavesGiven += Math.abs(i - posLoafGiven) * 2;
                posLoafGiven = -1;
                // console.log("new tLG", totalLoavesGiven);
            }
        }
    }

    // console.log("ret pLG", posLoafGiven, "tLG", totalLoavesGiven);
    return (posLoafGiven != -1) ? "NO" : totalLoavesGiven;


}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const N = parseInt(readLine(), 10);

    const B = readLine().split(' ').map(BTemp => parseInt(BTemp, 10));

    let result = fairRations(B);

    ws.write(result + "\n");

    ws.end();
}
