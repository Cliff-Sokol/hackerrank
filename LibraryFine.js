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

// Complete the libraryFine function below.
function libraryFine(d1, m1, y1, d2, m2, y2) {
    var dueDay = d2;
    var dueMonth = m2;
    var dueYear = y2;
    var returnDay = d1;
    var returnMonth = m1;
    var returnYear = y1;
    var fine = 0;

    if (returnYear > dueYear) {
        // If returned after calendar year due then fine is 10000
        fine = 10000;
    } else if (returnYear < dueYear) {
        // If returned in prior year then fine is 0
        fine = 0;
    } else if (returnMonth > dueMonth) {
        // If returned after month due and in same year then fine is 500 * #months late
        fine = 500 * (returnMonth - dueMonth);
    } else if (returnMonth < dueMonth) {
        // If returned in prior month then fine is 0
        fine = 0;
    } else if (returnDay > dueDay) {
        // If returned after day due then fine is 15 * #days late
        fine = 15 * (returnDay - dueDay);
    } else {
        fine = 0;
    }
    return fine;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const d1M1Y1 = readLine().split(' ');

    const d1 = parseInt(d1M1Y1[0], 10);

    const m1 = parseInt(d1M1Y1[1], 10);

    const y1 = parseInt(d1M1Y1[2], 10);

    const d2M2Y2 = readLine().split(' ');

    const d2 = parseInt(d2M2Y2[0], 10);

    const m2 = parseInt(d2M2Y2[1], 10);

    const y2 = parseInt(d2M2Y2[2], 10);

    let result = libraryFine(d1, m1, y1, d2, m2, y2);

    ws.write(result + "\n");

    ws.end();
}
