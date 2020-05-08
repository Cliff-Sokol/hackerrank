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

// Complete the bomberMan function below.
function bomberMan(n, grid) {

    // Create a new iteration of the bomb pattern
    function newBombGrid(grid){
        
        // Initialize a new bomb pattern to be the same
        // size as the original
        let newGrid = new Array (grid.length);
        // Set the first row to be an array of the size of the original rows
        newGrid[0] = new Array (grid[0].length);

        // Iterate over the rows in the original grid
        for (var i = 0; i < grid.length; i++) {
            // If we are not at the end of the original grid
            // then create a new grid row the same size as the original rows
            if (i !== grid.length - 1) { 
                newGrid[i+1] = new Array(grid[i].length); 
            }

            // Iterate through the columns of the row
            for (var j = 0; j < grid[i].length; j++) {

                // If there is a bomb at the i,j location then
                // put a "." in its place and in each of the adjacent spaces
                // We just "blew up" the bomb
                // if (grid[i].charAt(j) === "O") {
                if (grid[i][j] === "O") {
                    newGrid[i][j] = "."; // replace the bomb with empty
                    if (j !== grid[i].length - 1) { 
                        newGrid[i][j+1] = "."; // replace space to right
                    }
                    if (j !== 0) { 
                        newGrid[i][j-1] = "."; // replace space to left
                    }
                    if (i !== 0) { 
                        newGrid[i-1][j] = "."; // replace space above
                    }
                    if (i !== grid.length - 1) { 
                        newGrid[i+1][j] = "."; // replace space below
                    }
                } else if (newGrid[i][j] === undefined) {
                    newGrid[i][j] = "O"; // If space isn't anything yet then make it a bomb
                }
            }
            // If not the first row then join the previous array row into a string
            if (i !== 0) { 
                newGrid[i-1] = newGrid[i-1].join(""); 
            }
            // If the last row then join the array into a string
            if (i === grid.length-1) { 
                newGrid[i] = newGrid[i].join(""); 
            }
        }
        return newGrid;
    }

    // If the time is 1 then nothing has changed so return the original grid
    if (n === 1) { 
        return grid; 
    }

    // If the time minus 1 is divisible by 4 then return two iterations
    // of the new bomb grid pattern
    if ((n - 1) % 4 === 0) {
        var newGrid = newBombGrid(grid);
        return newBombGrid(newGrid);
    }

    // If the time is even then the bomber would have filled all non bomb spaces
    // with bombs so return a filled grid
    if (n % 2 === 0) {
        var str = "";

        for (var i = 0; i < grid[0].length; i++) {
            str += "O";
        }
        for (var i = 0; i < grid.length; i++) {
            grid[i] = str;
        }
        return grid;
    }

    // Otherwise return one iteration of the new bomb pattern
    return newBombGrid(grid);

}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const rcn = readLine().split(' ');

    const r = parseInt(rcn[0], 10);

    const c = parseInt(rcn[1], 10);

    const n = parseInt(rcn[2], 10);

    let grid = [];

    for (let i = 0; i < r; i++) {
        const gridItem = readLine();
        grid.push(gridItem);
    }

    let result = bomberMan(n, grid);

    ws.write(result.join("\n") + "\n");

    ws.end();
}
