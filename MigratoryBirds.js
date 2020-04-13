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

// Complete the migratoryBirds function below.
function migratoryBirds(arr) {
    var typeCount = [0, 0, 0, 0, 0];
    var bigBirds = 0;
    var bigType = 0;

    console.log(`arr: [${arr}]`);
    for (var i = 0; i < arr.length; i++) {
        typeCount[arr[i]-1] += 1;
    }

    console.log(`typeCount: [${typeCount}]`);

    bigBirds = typeCount[0];
    bigType = 0;
    for (var j = 1; j < typeCount.length; j++) {
        if (bigBirds < typeCount[j]) {
            bigBirds = typeCount[j];
            bigType = j;
        }
    }

    return bigType + 1;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const arrCount = parseInt(readLine().trim(), 10);

    const arr = readLine().replace(/\s+$/g, '').split(' ').map(arrTemp => parseInt(arrTemp, 10));

    const result = migratoryBirds(arr);

    ws.write(result + '\n');

    ws.end();
}
