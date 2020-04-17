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

// Complete the repeatedString function below.
function repeatedString(s, n) {
    // length of string to repeat
    var lengthS = s.length;
    // number of times the string must be repeated
    var numRepeats = n / lengthS;
    var numAs = 0;
    var numLessThanR = 0;
    // length of remainder of string if it doesn't repeat evenly into n
    var remainLength = n % lengthS;

    // calculate the number of "a"s in string and number that are in position less
    // than remainLength
    for (var i = 0; i < s.length; i++) {
        numAs += (s.charAt(i) === "a") ? 1 : 0;
        numLessThanR += ((s.charAt(i) === "a") && (remainLength > 0) && (i < remainLength)) ? 1 : 0;
    }

    var totalAs = numAs * Math.floor(numRepeats) + numLessThanR;

    // console.log("s:", s);
    // console.log("n:", n);
    // console.log("lS:", lengthS);
    // console.log("nR:", numRepeats);
    // console.log("rL:", remainLength);
    // console.log("nAs:", numAs);
    // console.log("nLTR:", numLessThanR);
    // console.log("tAs:", totalAs);

    return totalAs;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const s = readLine();

    const n = parseInt(readLine(), 10);

    let result = repeatedString(s, n);

    ws.write(result + "\n");

    ws.end();
}
