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

// Complete the twoPluses function below.
function twoPluses(grid) {

    var crosses = [];
    var resArea = 0;

    // Test whether the point in the grid at r, c plus the offsets i and j
    // is good.  If it is then it is possibly part of a cross
    function isValidCross(grid, points, r, c, i, j) {
        var y = r + i;
        var x = c + j;
        if (y >= 0 && y < grid.length && grid[y][x] === "G") {
            validCross = true;
        } else {
            validCross = false;
        }
        points[[y, x]] = 1;
        return validCross;
    }

    // Iterate through the grid building list of crosses
    for (var i = 0; i < grid.length; i++) {
        for (var j = 0; j < grid[i].length; j++) {
            var points = {};
            var l = 0;
            var validCross = true;
            do {
                // Check the spaces above, below, right, and left
                validCross &= isValidCross(grid, points, i, j, l, 0);
                validCross &= isValidCross(grid, points, i, j, -l, 0);
                validCross &= isValidCross(grid, points, i, j, 0, l);
                validCross &= isValidCross(grid, points, i, j, 0, -l);
                // If all four were good spaces then we have a cross so
                // save it and then increase the offset by 1 so we can
                // check a larger cross
                if (validCross) {
                    crosses.push(Object.assign({}, points));
                    l++;
                }
            } while (validCross);
        }
    }

    // console.log(crosses);

    // For all of the crosses that were found, check for
    // overlaps with another cross.  Only keep the largest
    // cross
    for (var i = 0; i < crosses.length - 1; i++) {
        for (var j = i + 1; j < crosses.length; j++) {
            var crossOverlap = false;
            // console.log("cj", crosses[j]);
            for (const point in crosses[j]) {
                // console.log("p", point, "cip", crosses[i][point]);
                if (crosses[i][point] === 1) {
                    crossOverlap = true;
                    break;
                }
            }
            // If there isn't an overlap then calculate the area of the cross
            if (!crossOverlap) {
                resArea = Math.max(resArea, 
                    Object.keys(crosses[i]).length * Object.keys(crosses[j]).length);
            }
        }
    }
    return resArea;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const nm = readLine().split(' ');

    const n = parseInt(nm[0], 10);

    const m = parseInt(nm[1], 10);

    let grid = [];

    for (let i = 0; i < n; i++) {
        const gridItem = readLine();
        grid.push(gridItem);
    }

    let result = twoPluses(grid);

    ws.write(result + "\n");

    ws.end();
}
