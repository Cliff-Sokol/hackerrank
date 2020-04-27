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

// Complete the chocolateFeast function below.
function chocolateFeast(n, c, m) {

    // Initially buy n / c choclate bars
    var nBought = Math.floor(n / c);
    // Eat all of them
    var nEaten = nBought;
    // Now there are nEaten wraps
    var nWraps = nEaten;
    // While we have more wraps than the # wraps needed to trade, keep trading and eating
    while (nWraps >= m) {
        // Trade for nWraps / m bars
        nBought = Math.floor(nWraps / m);
        // The new number of wraps is the number traded + the remainder
        nWraps = nBought + (nWraps % m);
        // The number eaten goes up by the number of bars traded and eaten
        nEaten += nBought;
    }

    return nEaten;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const t = parseInt(readLine(), 10);

    for (let tItr = 0; tItr < t; tItr++) {
        const ncm = readLine().split(' ');

        const n = parseInt(ncm[0], 10);

        const c = parseInt(ncm[1], 10);

        const m = parseInt(ncm[2], 10);

        let result = chocolateFeast(n, c, m);

        ws.write(result + "\n");
    }

    ws.end();
}
