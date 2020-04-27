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

// Complete the timeInWords function below.
function timeInWords(h, m) {

    var timeWords = ["o' clock", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "", "sixteen", "seventeen", "eighteen", "nineteen", "twenty", "twenty one", "twenty two", "twenty three", "twenty four", "twenty five", "twenty six", "twenty seven", "twenty eight", "twenty nine", ""];

    var timeWord = "";

    if (m === 0) {
        timeWord = timeWords[h] + " " + timeWords[m];
    } else if (m === 1) {
        timeWord = timeWords[m] + " minute past " + timeWords[h];
    } else if (m === 30) {
        timeWord = " half past " + timeWords[h];
    } else if (m <= 30) {
        timeWord = timeWords[m] + ((m === 15) ? " quarter past " : " minutes past ") + timeWords[h];
    } else if (60 - m === 1) {
        timeWord = timeWords[60-m] + ((60-m === 15) ? " quarter to " : " minute to ") + timeWords[(h + 1 > 12) ? 1 : h + 1];
    } else {
        timeWord = timeWords[60-m] + ((60-m === 15) ? " quarter to " : " minutes to ") + timeWords[(h + 1 > 12) ? 1 : h + 1];
    }

    return timeWord.trim();
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const h = parseInt(readLine(), 10);

    const m = parseInt(readLine(), 10);

    let result = timeInWords(h, m);

    ws.write(result + "\n");

    ws.end();
}
