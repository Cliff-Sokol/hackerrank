'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', inputStdin => {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.replace(/\s*$/, '')
        .split('\n')
        .map(str => str.replace(/\s*$/, ''));

    main();
});

function readLine() {
    return inputString[currentLine++];
}

// Complete the breakingRecords function below.
function breakingRecords(scores) {
    var maxIdx = 0;
    var minIdx = 1;
    var maxScore = 0;
    var minScore = 0;
    var minMax = [0, 0];

    console.log(`Scores: ${scores}`);
    for (var i = 0; i < scores.length; i++) {
        if (i === 0) {
            maxScore = scores[i];
            minScore = scores[i];
            console.log(`index ${i}: set min & max to ${scores[i]}`);
        } else {
            if (maxScore < scores[i]) {
                minMax[maxIdx] += 1;
                maxScore = scores[i];
                console.log(`index ${i}: new max of ${maxScore} minMax: ${minMax}`)
            }
            if (minScore > scores[i]) {
                minMax[minIdx] += 1;
                minScore = scores[i];
                console.log(`index ${i}: new min of ${minScore} minMax: ${minMax}`)
            }
        }
    }

    return minMax;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine(), 10);

    const scores = readLine().split(' ').map(scoresTemp => parseInt(scoresTemp, 10));

    const result = breakingRecords(scores);

    ws.write(result.join(' ') + '\n');

    ws.end();
}
