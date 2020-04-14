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

// Complete the saveThePrisoner function below.
function saveThePrisoner(n, m, s) {
    // n = #prisoners
    // m = #candies
    // s = starting seat

    var p2W = 0;
    var calcP = 0;

    // console.log("chk", "n", "m", "s", "cP", "p2W");
    if (n >= m) {
        // If the #prisoners is more than or equal to the #candies then
        // The prisoner to warn is the seat + #prisoners - 1
        calcP = (s + m);
        p2W = calcP - 1;
        // If the prisoner to warn is > #prisoners then mod prisoner to warn by #prisoners
        if (p2W > n) {
            p2W = p2W % n;
        }
        // console.log("n>m", n, m, s, calcP, p2W)
    } else {
        // The prisoner to warn is the #candies mod #prisoners plus the seat minus 1
        calcP = (m % n);
        if (calcP === 0) {
            p2W = s - 1;
        } else {
            p2W = (calcP + s) - 1;
            // If the prisoner to warn is > #prisoners then mod prisoner to warn by #prisoners
            if (p2W > n) {
                p2W = p2W % n;
            }
        }
        // console.log("mod", n, m, s, calcP, p2W)
    }
    // If the calculated prisoner to warn is 0 then the prisoner to warn is the last
    // prisoner
    if (p2W === 0) {
        p2W = n;
    }
    return p2W;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const t = parseInt(readLine(), 10);

    for (let tItr = 0; tItr < t; tItr++) {
        const nms = readLine().split(' ');

        const n = parseInt(nms[0], 10);

        const m = parseInt(nms[1], 10);

        const s = parseInt(nms[2], 10);

        let result = saveThePrisoner(n, m, s);

        ws.write(result + "\n");
    }

    ws.end();
}
