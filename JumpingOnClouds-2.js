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

// Complete the jumpingOnClouds function below.
function jumpingOnClouds(c) {
    // Initialize
    var numJumps = 0;
    var curCloud = 0;

    // While we are not at the end of the clouds
    while (curCloud < c.length) {
        // Increment number of jumps
        numJumps += 1;
        // Go to the next safe cloud, first looking at a jump of 2 because
        // that is faster/shorter
        curCloud += (c[curCloud+2] === 0) ? 2 : 1;
    }
    
    // Return calculated number of jumps minus 1
    return numJumps - 1;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine(), 10);

    const c = readLine().split(' ').map(cTemp => parseInt(cTemp, 10));

    let result = jumpingOnClouds(c);

    ws.write(result + "\n");

    ws.end();
}
