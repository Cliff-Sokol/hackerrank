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

// Complete the cutTheSticks function below.
function cutTheSticks(arr) {
    var outputSticks = [];
    var lengthToCut = 0;

    // console.log(arr);
    // Sort the sticks in descending order
    var sortSticks = arr.sort(function(a, b) {return b-a});
    // console.log(sortSticks);
    var sticksRemain = true;

    while (sticksRemain) {
        // Push the number of sticks onto the output array
        outputSticks.push(sortSticks.length);
        // console.log(sticksRemain);
        // Get the length to cut = shortest stick
        lengthToCut = sortSticks[sortSticks.length-1];
        // console.log(lengthToCut);
        // Cut the sticks in the array
        for (var i = 0; i < sortSticks.length; i++) {
            sortSticks[i] = sortSticks[i] - lengthToCut;
        }
        // console.log(sortSticks);
        // Remove the zero length sticks from the array
        for (var i = sortSticks.length-1; i >= 0; i--) {
            if (sortSticks[i] == 0) {
                sortSticks.pop();
            }
        }
        // console.log(sortSticks);
        if (sortSticks.length === 0) {
            sticksRemain = false;
        }
    }
    
    return outputSticks;

}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine(), 10);

    const arr = readLine().split(' ').map(arrTemp => parseInt(arrTemp, 10));

    let result = cutTheSticks(arr);

    ws.write(result.join("\n") + "\n");

    ws.end();
}
