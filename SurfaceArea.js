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

// Complete the surfaceArea function below.
function surfaceArea(A) {

    var toySurfaceArea = 0;

    var h = A.length;
    var w = A[0].length;

    // console.log("A", A);
    // console.log("A.length", A.length);
    // console.log("A[0].length", A[0].length);

    function calcSurface(i, j, A) {
        // Basic area of column is the height of column times 4 (the four sides)
        // plus 2 (the top and bottom)
        var sArea = (A[i][j] * 4) + 2;
        // Now subtract any adjacent columns
        if (j > 0) {
            sArea -= Math.min(A[i][j-1], A[i][j]) * 2;
        }
        if (i > 0) {
            sArea -= Math.min(A[i-1][j], A[i][j]) * 2;
        }

        return sArea;
    }

    // Calculate the surface area of each column in the toy
    for (var i = 0; i < h; i++) {
        for (var j = 0; j < w; j++) {
            toySurfaceArea += calcSurface(i, j, A);        
        }
    }

    return toySurfaceArea;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const HW = readLine().split(' ');

    const H = parseInt(HW[0], 10);

    const W = parseInt(HW[1], 10);

    let A = Array(H);

    for (let i = 0; i < H; i++) {
        A[i] = readLine().split(' ').map(ATemp => parseInt(ATemp, 10));
    }

    let result = surfaceArea(A);

    ws.write(result + "\n");

    ws.end();
}
