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

// Complete the climbingLeaderboard function below.
function climbingLeaderboard(scores, alice) {
    // Make sure the scores are descending
    // var scoresDescending = scores.sort(function(a, b) {return b - a});
    var scoresDescending = scores;
    // Make sure Alice's scores are ascending
    // var aliceAscending = alice.sort(function(a, b) {return a - b});
    var aliceAscending = alice;
    var denseScores = [];
    var aliceRanks = [];
    var j;

    // console.log(`sD: ${scoresDescending}`);
    // console.log(`aA: ${aliceAscending}`);

    // Create a condensed array of unique scores in descending order.
    for (var i = 0; i < scoresDescending.length; i++) {
        if (i === 0) {
            denseScores.push(scoresDescending[i]);
        } else {
            j = denseScores.length;
            if (denseScores[j-1] != scoresDescending[i]) {
                denseScores.push(scoresDescending[i]);
            }
        }
    }
    // Add a zero to the end just in case the lowest score checked is lower than the
    // last score in the array
    denseScores.push(0);

    // console.log(`dS: ${denseScores}`);

    // For all of Alice's scores, find their rank in the condensed array and
    // push them onto the ranks array
    var x = denseScores.length;
    for (var i = 0; i < aliceAscending.length; i++) {
        // console.log(`chk ${aliceAscending[i]} ${denseScores[x-1]}`)
        while (aliceAscending[i] >= denseScores[x-1]) {
            // console.log(`decrement x`);
            x -= 1;
        }
        // if (aliceAscending[i] < denseScores[x]) {
            // console.log(`push x`);
            aliceRanks.push(x+1);
        // }
        // for (var x = 0; x < denseScores.length; x++) {
        //     if (aliceAscending[i] >= denseScores[x]) {
        //         aliceRanks.push(x+1);
        //         break;
        //     }
        // }
    }
    return aliceRanks;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const scoresCount = parseInt(readLine(), 10);

    const scores = readLine().split(' ').map(scoresTemp => parseInt(scoresTemp, 10));

    const aliceCount = parseInt(readLine(), 10);

    const alice = readLine().split(' ').map(aliceTemp => parseInt(aliceTemp, 10));

    let result = climbingLeaderboard(scores, alice);

    ws.write(result.join("\n") + "\n");

    ws.end();
}
