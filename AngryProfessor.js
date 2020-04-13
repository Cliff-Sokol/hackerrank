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

// Complete the angryProfessor function below.
function angryProfessor(k, a) {
    var threshold = k;
    // sort the arrivals in case arrival times are recorded randomly - this allows
    // the search to only be concerned with values < 1
    var arrivals = a.sort(function(a, b){return a - b});
    var onTimes = 0;
    var i = 0;
    
    // Since arrivals are sorted in ascending order only count up until an arrival
    // time > 0 is found.
    while (arrivals[i++] < 1) {
        onTimes++;
    }
    return (onTimes < threshold) ? "YES" : "NO";
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const t = parseInt(readLine(), 10);

    for (let tItr = 0; tItr < t; tItr++) {
        const nk = readLine().split(' ');

        const n = parseInt(nk[0], 10);

        const k = parseInt(nk[1], 10);

        const a = readLine().split(' ').map(aTemp => parseInt(aTemp, 10));

        let result = angryProfessor(k, a);

        ws.write(result + "\n");
    }

    ws.end();
}
