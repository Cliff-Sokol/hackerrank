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
    inputString = inputString.trim().split('\n').map(str => str.trim());

    main();
});

function readLine() {
    return inputString[currentLine++];
}

/*
 * Complete the pageCount function below.
 */
function pageCount(n, p) {
    var pageTurns = 0;
    console.log(`book: ${n} page: ${p}`);
    if (p === 1) {
        console.log(`first page`);
        pageTurns = 0;
    } else if (((n % 2) === 0) && (p === n)) {
        console.log(`last page`);
        pageTurns = 0;
    } else if (((n % 2) != 0) && (p === n-1)) {
        console.log(`odd pages, next to last page`);
        pageTurns = 0;
    } else if (((n % 2) === 0) && (p === n-1)) {
        console.log(`even pages, next to last page`);
        pageTurns = 1;
    } else if (p < n/2) {
        console.log(`first half`);
        pageTurns = (p / 2);
    } else {
        console.log(`second half`);
        pageTurns = ((n - p) / 2);
    }
    return Math.trunc(pageTurns);
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine(), 10);

    const p = parseInt(readLine(), 10);

    let result = pageCount(n, p);

    ws.write(result + "\n");

    ws.end();
}
