'use strict';

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

// Complete the plusMinus function below.
function plusMinus(arr) {
    var posN = 0;
    var negN = 0;
    var zerN = 0;

    for (var x = 0; x < arr.length; x++) {
        if (arr[x] > 0) {
            posN += 1;
        } else if (arr[x] < 0) {
            negN += 1;
        } else {
            zerN += 1;
        }
    }
    console.log((posN/arr.length).toFixed(6));
    console.log((negN/arr.length).toFixed(6));
    console.log((zerN/arr.length).toFixed(6));
}

function main() {
    const n = parseInt(readLine(), 10);

    const arr = readLine().split(' ').map(arrTemp => parseInt(arrTemp, 10));

    plusMinus(arr);
}
