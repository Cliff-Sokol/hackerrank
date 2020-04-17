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

// Complete the equalizeArray function below.
function equalizeArray(arr) {

    // Initialize a new array to hold the frequency of the occurrences
    // of each digit in arr
    var frequencyArray = new Array(100).fill(0);

    // console.log(arr);

    // Calculate the frequency of each digit in arr
    for (var i = 0; i < arr.length; i++) {
        frequencyArray[arr[i]] += 1;
    }

    // console.log(frequencyArray);

    // Sort the frequencyArray descending so the 0th element will have the
    // greatest frequency occurrence
    var sortFreqArray = frequencyArray.sort(function(a, b) {return b - a});

    // console.log(sortFreqArray);

    // Return the length of the original array minus the greatest frequency
    // of a digit occurring
    return arr.length - sortFreqArray[0];
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine(), 10);

    const arr = readLine().split(' ').map(arrTemp => parseInt(arrTemp, 10));

    let result = equalizeArray(arr);

    ws.write(result + "\n");

    ws.end();
}
