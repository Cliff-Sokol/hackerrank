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

/*
 * Complete the 'getTotalX' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER_ARRAY a
 *  2. INTEGER_ARRAY b
 */

function getTotalX(a, b) {
    // Write your code here

    var factorsA = [];
    var sortA = a.sort(function(x, y){return x - y});
    var sortB = b.sort(function(x, y){return x - y});
    var isFactor = true;
    var numFactors = 0;

    console.log(`sortA: ${sortA}`);
    console.log(`sortB: ${sortB}`);

    var sortALen = sortA.length;
    var lastSortA = sortA[sortALen - 1];
    var testFact = 0;
    console.log(`sortALen: ${sortALen} last: ${lastSortA}`);
    // Find the numbers from the last element of the first array 
    // to the first element of the second array for which the elements of the first
    // array are factors
    for (var posFact = lastSortA; posFact <= sortB[0]; posFact++) {
        isFactor = true;
        for (var j = 0; j < sortALen; j++) {
            testFact = posFact % sortA[j];
            console.log(`${j} posFact: ${posFact} sortA: ${sortA[j]} testFact: ${testFact}`);
            if (testFact != 0) {
                isFactor = false;
            }
        }
        if (isFactor) {
            console.log(`pushing factorsA: ${posFact}`)
            factorsA.push(posFact);
        }
    }

    console.log(`factorsA: ${factorsA}`);

    // if we could not find any factors between the two arrays then there can't be
    // factors of the second array
    if (factorsA.length === 0) {
        return 0;
    }
    // Now see if any of those numbers are factors of the second array
    for (var i = 0; i < factorsA.length; i++) {
        isFactor = true;
        for (var j = 0; j < sortB.length; j++) {
            if (sortB[j] % factorsA[i] != 0) {
                isFactor = false;
            }
        }
        if (isFactor) {
            numFactors += 1;
        }
    }
    return numFactors;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

    const n = parseInt(firstMultipleInput[0], 10);

    const m = parseInt(firstMultipleInput[1], 10);

    const arr = readLine().replace(/\s+$/g, '').split(' ').map(arrTemp => parseInt(arrTemp, 10));

    const brr = readLine().replace(/\s+$/g, '').split(' ').map(brrTemp => parseInt(brrTemp, 10));

    const total = getTotalX(arr, brr);

    ws.write(total + '\n');

    ws.end();
}
