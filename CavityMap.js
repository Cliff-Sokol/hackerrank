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

// Complete the cavityMap function below.
function cavityMap(grid) {

    // console.log(grid);

    var newGrid = [];
    var testGrid = [];

    // Split the input parameter grid into an nxn matrix holding a single
    // digit in each ixi position
    for (var i = 0; i < grid.length; i++) {
        newGrid.push(grid[i].split(""));
        testGrid.push(grid[i].split(""));
    }

    // console.log(newGrid);

    // Iterate through the inner portion of the matrix from 1 to n-1 rows
    // and from 1 to n-1 columns
    for (var j = 1; j < grid.length - 1; j++) {
        for (var k = 1; k < grid.length - 1; k++) {
            // console.log("j,k", j,k, "j-1,k", j-1, k, "j+1,k", j+1,k, "j,k-1", j,k-1, "j,k+1", j,k+1);
            // console.log("tgjk", testGrid[j][k], "tgj-1k", testGrid[j-1][k], "tgj+1k", testGrid[j+1][k], "tgjk-1", testGrid[j][k-1], "tgjk+1", testGrid[j][k+1]);
            // Check that the value is greater than the value above, below, right,
            // and left.  If it is then replace the value with an X in the newGrid
            if (testGrid[j][k] > testGrid[j-1][k] && // above
                testGrid[j][k] > testGrid[j+1][k] && // below
                testGrid[j][k] > testGrid[j][k-1] && // left
                testGrid[j][k] > testGrid[j][k+1]) { // right
                // console.log("new");
                newGrid[j][k] = "X"
            }
        }
    }

    // Create a return Grid by joining all columns of the new Grid
    var retGrid = [];
    for (var l = 0; l < grid.length; l ++) {
        retGrid.push(newGrid[l].join(""));
    }
    return retGrid;

}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine(), 10);

    let grid = [];

    for (let i = 0; i < n; i++) {
        const gridItem = readLine();
        grid.push(gridItem);
    }

    let result = cavityMap(grid);

    ws.write(result.join("\n") + "\n");

    ws.end();
}
