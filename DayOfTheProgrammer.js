'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function(inputStdin) {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.split('\n');

    main();
});

function readLine() {
    return inputString[currentLine++];
}

// Complete the dayOfProgrammer function below.
function dayOfProgrammer(year) {
    var dayOfP = 41;
    var dateOfP = "";

    console.log(`year: ${year}`);
    if (year === 1918) {
        // The year the Russians messed with time
        dayOfP = dayOfP - 15;
        console.log(`dayOfP: ${dayOfP}`);
    } else if (year > 1918) {
        // if leap year then subtract 29 else subract 28
        // after 1918, leap year calc has two parts
        if ((year % 4 === 0 && year % 100 != 0) || (year % 400 === 0)) {
            dayOfP = dayOfP - 29;
            console.log(`dayOfP Leap: ${dayOfP}`);
        } else {
            dayOfP = dayOfP - 28;
            console.log(`dayOfP Not Leap: ${dayOfP}`);
        }
    } else {
        // before 1918 leap year was just if year was divisible by 4
        if (year % 4 === 0) {
            dayOfP = dayOfP - 29;
            console.log(`dayOfP Leap: ${dayOfP}`);
        } else {
            dayOfP = dayOfP - 28;
            console.log(`dayOfP Not Leap: ${dayOfP}`);
        }
    }

    dateOfP = `${dayOfP}.09.${year}`;
    console.log(`dateOfP: ${dateOfP}`);
    return dateOfP;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const year = parseInt(readLine().trim(), 10);

    const result = dayOfProgrammer(year);

    ws.write(result + '\n');

    ws.end();
}
