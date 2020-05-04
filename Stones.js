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

// Complete the stones function below.
function stones(n, a, b) {
    // n is number of stones
    // a is first possible difference 
    // b is second possible difference

    // Get the minimum of A and B
    var minAB = Math.min(a, b);
    // Get the maximum of A and B
    var maxAB = Math.max(a, b);

    // The first possible return value
    var resultSet = [minAB * (n - 1)];
    // The maximum possible return value, which is the 
    // number of stones - 1 times the maximum difference
    var maxValue = (n - 1) * maxAB;

    // Difference between Max and Min of A and B
    var diffAB = maxAB - minAB;

    // While the latest value in the result set is less than the
    // maximum possible return value calculate the next possible return
    // value by adding the maximum difference onto the previous return
    // value  and push it onto the array
    var resultPos = resultSet.length - 1;
    while (resultSet[resultPos] < maxValue) {
        // calculate
        var newResult = resultSet[resultPos] + diffAB
        // and push
        resultSet.push(newResult);
        // Get the position of the last element
        resultPos = resultSet.length - 1;
    }

    return resultSet;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const T = parseInt(readLine(), 10);

    for (let TItr = 0; TItr < T; TItr++) {
        const n = parseInt(readLine(), 10);

        const a = parseInt(readLine(), 10);

        const b = parseInt(readLine(), 10);

        let result = stones(n, a, b);

        ws.write(result.join(" ") + "\n");
    }

    ws.end();
}
