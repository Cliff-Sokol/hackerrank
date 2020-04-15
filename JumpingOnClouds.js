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
function jumpingOnClouds(c, k) {
    var energyUsed = 100;
    var backHome = false;
    var numClouds = c.length;

    // console.log(`clouds: ${c}`);
    // console.log(`k: ${k}`);

    var i = 0;
    var j = 0;
    // Loop until i is once again 0, the starting point.
    while (!backHome) {
        // The cloud to jump to 
        i = ((i + k) % numClouds);
        j++;
        backHome = (i === 0) ? true : false;
        // energyUsed for jump is 1 plus 2 * the type of cloud (0 or 1)
        energyUsed = energyUsed - (1 + (2 * c[i]));
        // console.log(`jump ${j} cloud: ${i} eU: ${energyUsed}`);
    }

    // console.log(`energy: ${energyUsed}`);
    return energyUsed;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const nk = readLine().split(' ');

    const n = parseInt(nk[0], 10);

    const k = parseInt(nk[1], 10);

    const c = readLine().split(' ').map(cTemp => parseInt(cTemp, 10));

    let result = jumpingOnClouds(c, k);

    ws.write(result + "\n");

    ws.end();
}
