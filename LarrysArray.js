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

// Complete the larrysArray function below.
function larrysArray(A) {

    // Count the number of swaps needed to sort the array using an insertion sort
    function getSwapCount(a) {
        var swaps = 0;
        // Iterate through the array from 0 to n-1
        for (var i = 0; i < a.length-1; i++) {
            // Iterate through the array from 1 to n
            for (var j = i + 1; j < a.length; j++) {
                // If there would be a swap then add 1
                swaps += (a[i] > a[j]) ? 1 : 0;
                // console.log("swaps", swaps, "ai", a[i], "aj", a[j]);
            }
        }
        return swaps;
    }

    // Get the number of swaps
    var numSwaps = getSwapCount(A);
    // console.log(numSwaps);
    // If the number of swaps is even then the array is sortable using Larry's sort
    // otherwise it is not
    return ((numSwaps % 2) === 0) ? "YES" : "NO";

}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const t = parseInt(readLine(), 10);

    for (let tItr = 0; tItr < t; tItr++) {
        const n = parseInt(readLine(), 10);

        const A = readLine().split(' ').map(ATemp => parseInt(ATemp, 10));

        let result = larrysArray(A);

        ws.write(result + "\n");
    }

    ws.end();
}
