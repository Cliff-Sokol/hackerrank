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

// Complete the workbook function below.
function workbook(n, k, arr) {
    var numChapters = n;
    var probsPerPage = k;
    var probsOnPage = 0;
    var currPage = 1;
    var specialProblems = 0;
    var filledPage = false;

    console.log("nc", numChapters, "pppg", k, "arr", arr);

    // Iterate through array of number of problems in chapter
    for (var i = 0; i < arr.length; i++) {
        // Get number of problems in chapter
        var numProbs = arr[i];
        console.log("i", i, "np", numProbs);
        // Iterate through the problems
        for (var j = 1; j <= numProbs; j++) {
            // Increment the number of problems on this page
            probsOnPage += 1;
            console.log("j", j, "cp", currPage, "sp", specialProblems, "pop", probsOnPage);
            filledPage = false;
            // If the current page equals the problem number then increment special
            if (currPage === j) {
                specialProblems += 1;
            }
            // If the number of problems on this page is the max number of problems
            // per page then reset the problems on this page and increment 
            // the page number
            if (probsOnPage === probsPerPage) {
                probsOnPage = 0;
                currPage += 1;
                filledPage = true;
                console.log("fullpage", "cp", currPage);
            }
        }
        // At the end of chapter, if we have not just gone to the next page
        // increment the page number because each chapter starts on a new page
        currPage += (filledPage) ? 0 : 1;
        // Reset problems on page
        probsOnPage = 0;
    }

    return specialProblems;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const nk = readLine().split(' ');

    const n = parseInt(nk[0], 10);

    const k = parseInt(nk[1], 10);

    const arr = readLine().split(' ').map(arrTemp => parseInt(arrTemp, 10));

    let result = workbook(n, k, arr);

    ws.write(result + "\n");

    ws.end();
}
