'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', inputStdin => {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.replace(/\s*$/, '')
        .split('\n')
        .map(str => str.replace(/\s*$/, ''));

    main();
});

function readLine() {
    return inputString[currentLine++];
}

// Complete the formingMagicSquare function below.
function formingMagicSquare(s) {
    // Get the source magic square to fix
    var sourceSquare = s;
    // Define all 3x3 magic squares
    var magicSquares = [
        [4, 9, 2, 3, 5, 7, 8, 1, 6],
        [2, 9, 4, 7, 5, 3, 6, 1, 8],
        [8, 1, 6, 3, 5, 7, 4, 9, 2],
        [2, 7, 6, 9, 5, 1, 4, 3, 8],
        [6, 7, 2, 1, 5, 9, 8, 3, 4],
        [4, 3, 8, 9, 5, 1, 2, 7, 6],
        [8, 3, 4, 1, 5, 9, 6, 7, 2],
        [6, 1, 8, 7, 5, 3, 2, 9, 4]
    ];
    // Start with a high cost to fix
    var costFix = 100;
    
    // console.log(`sourceSquare: ${sourceSquare}`);
    // console.log(`magicSquares length: ${magicSquares.length}`);

    // Iterate through the rows of the magicSquares matrix and compare the absolute
    // value of the difference between each number in the magic square to the
    // corresponding number of the sourceSquare, allowing for the magicSquares to
    // be one row per square and the sourceSquare to be a 3x3 matrix.
    for(var i = 0; i < magicSquares.length; i++) {
        var tempCost = 0;
        // Use zero offset for first row of sourceSquares
        for (var j = 0; j < 3; j++) {
            tempCost += Math.abs(magicSquares[i][0+j] - sourceSquare[0][j]);
        }

        // Use 3 offset for first row of sourceSquares
        for (var j = 0; j < 3; j++) {
            tempCost += Math.abs(magicSquares[i][3+j] - sourceSquare[1][j]);
        }

        // Use 6 offset for first row of sourceSquares
        for (var j = 0; j < 3; j++) {
            tempCost += Math.abs(magicSquares[i][6+j] - sourceSquare[2][j]); 
        }

        // If the calculated cost is less than the last cost (or initial cost)
        // then set the calculated last cost to the new calculated cost
        if (tempCost < costFix) {
            costFix = tempCost;
        }
    }
    return costFix;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    let s = Array(3);

    for (let i = 0; i < 3; i++) {
        s[i] = readLine().split(' ').map(sTemp => parseInt(sTemp, 10));
    }

    const result = formingMagicSquare(s);

    ws.write(result + '\n');

    ws.end();
}
