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

// Complete the kangaroo function below.
function kangaroo(x1, v1, x2, v2) {

    var k1Pos = x1;
    var k2Pos = x2;

    if (v1 < v2) {
        // K1 starts to left of K2 and is slower so will never catch up
        return "NO";
    } else {
        var jumps = 0;
        var samePlace = false;
        console.log(jumps, k1Pos, k2Pos);
        do {
            if (k1Pos === k2Pos) {
                samePlace = true;
                console.log(samePlace);
            } 
            k1Pos += v1;
            k2Pos += v2;
            
            jumps += 1;
            console.log(jumps, k1Pos, k2Pos)
        } 
        while (!samePlace && jumps <= 10000)

        return samePlace ? "YES" : "NO";
    }
    
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const x1V1X2V2 = readLine().split(' ');

    const x1 = parseInt(x1V1X2V2[0], 10);

    const v1 = parseInt(x1V1X2V2[1], 10);

    const x2 = parseInt(x1V1X2V2[2], 10);

    const v2 = parseInt(x1V1X2V2[3], 10);

    let result = kangaroo(x1, v1, x2, v2);

    ws.write(result + "\n");

    ws.end();
}
