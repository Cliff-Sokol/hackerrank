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

// Complete the minimumDistances function below.
function minimumDistances(a) {

    // Start with a current distance of zero
    var curDist = 0;
    // Start with the minimum distance of the maximum value (so any distance found
    // will be less)
    var minimumDist = Number.MAX_VALUE;

    // Iterate from the beginning of the array to one less than the end
    for (var i = 0; i < a.length - 1; i++) {
        // Iterate from the outer index to the end of the array
        for(var j = i + 1; j < a.length; j++) {
            // If the ith and jth values match then get the absolute value of the
            // difference between i and j, get the miniumum of the current
            // distance and the current minimum distance and break out of the
            // inner loop
            if (a[i] == a[j]) {
                curDist = Math.abs(i - j);
                minimumDist = Math.min(curDist, minimumDist);
                break;
            }
        }
    }
    // return the minimum distance unless it hasn't changed from initial value
    return (minimumDist == Number.MAX_VALUE) ? -1 : minimumDist;

}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine(), 10);

    const a = readLine().split(' ').map(aTemp => parseInt(aTemp, 10));

    let result = minimumDistances(a);

    ws.write(result + "\n");

    ws.end();
}
