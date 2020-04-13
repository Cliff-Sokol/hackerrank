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

// Complete the countingValleys function below.
function countingValleys(n, s) {
    var numSteps = n;
    // make arrUpDown from string s
    var arrUpDown = s.split("");
    // console.log(`UpDowns: [${arrUpDown}]`);

    var numValleys = 0;
    var elevation = 0;
    var inValley = false;

    // iterate through arrUpDown
    for (var i = 0; i < arrUpDown.length; i++) {
        // console.log(`step[${i}]: ${arrUpDown[i]}`);
        // calculate elevation
        elevation += arrUpDown[i] === "U" ? 1 : -1;
        // console.log(`elevation: ${elevation}`);

        // if the elevation is below sea level (less than 0) and we are not currently
        // in a valley then we have entered a valley so bump the numValleys counter
        if (elevation < 0 && !inValley) {
            numValleys += 1;
            // console.log(`numValleys: ${numValleys}`);
        }

        // if elevation less than 0 then we are in a valley
        if (elevation < 0) {
            // set inValley to true
            inValley = true;
        } else {
            // set inValley to false
            inValley = false;
        }
        // console.log(`inValley: ${inValley}`);
    }
    return numValleys;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine(), 10);

    const s = readLine();

    let result = countingValleys(n, s);

    ws.write(result + "\n");

    ws.end();
}
