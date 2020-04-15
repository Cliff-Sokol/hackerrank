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

// Complete the appendAndDelete function below.
function appendAndDelete(s, t, k) {
    // Get the length of both strings
    var total = s.length + t.length;

    // If the length of both strings is less than or equal to the number of allowed moves
    // then the source string can be converted to target string
    if (total <= k) {
        return "Yes";
    }

    // Find the length of the substring that is common to both source and target
    var lic = 0;
    while ((s[lic] === t[lic]) && (lic < Math.min(s.length, t.length))) {
        lic++;
    }

    // The minimum operation count is the total length - twice the common length
    var minOpCnt = total - 2 * lic;

    // console.log(minOpCnt, total, lic);

    // If the min operation count is less than or equal to the number of allowed moves
    // and the the number of allowed moves minus min operation count is divisible by 2
    // then the source can be converted to the target
    if((minOpCnt <= k) && ((k - minOpCnt) % 2 == 0)) {
        return "Yes";
    } 

    return "No";
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const s = readLine();

    const t = readLine();

    const k = parseInt(readLine(), 10);

    let result = appendAndDelete(s, t, k);

    ws.write(result + "\n");

    ws.end();
}
