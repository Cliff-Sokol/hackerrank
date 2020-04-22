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

// Complete the organizingContainers function below.
function organizingContainers(container) {
    var result = true;
    // Create arrays to hold sum of rows & cols.  Make them
    // BigInt values because it is possible numbers could get larger than int
    var rowSum = new Array(container.length).fill(0n);
    var colSum = new Array(container.length).fill(0n);

    // Add the row and column values
    for (var i = 0; i < container.length; i++) {
        for (var j = 0; j < container.length; j++) {
            rowSum[i] += BigInt(container[i][j]);
            colSum[i] += BigInt(container[j][i]);
        }
    }

    // console.log("row", rowSum);
    // console.log("col", colSum);

    // Sort them
    rowSum.sort();
    colSum.sort();

    // console.log("s row", rowSum);
    // console.log("s col", colSum);

    // if the row & col values are the same then result stays true
    // otherwise result becomes false - The objects can be swapped using the
    // pair-swap method only if there are same number of values in each
    // position of the row & col arrays
    for (var k = 0; k < rowSum.length && result; k++) {
        result = rowSum[k] === colSum[k] ? true : false;
    }

    return result ? "Possible" : "Impossible";

}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const q = parseInt(readLine(), 10);

    for (let qItr = 0; qItr < q; qItr++) {
        const n = parseInt(readLine(), 10);

        let container = Array(n);

        for (let i = 0; i < n; i++) {
            container[i] = readLine().split(' ').map(containerTemp => parseInt(containerTemp, 10));
        }

        let result = organizingContainers(container);

        ws.write(result + "\n");
    }

    ws.end();
}
