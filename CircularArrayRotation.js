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

// Complete the circularArrayRotation function below.
function circularArrayRotation(a, k, queries) {
    var newA = [];
    var retA = [];

    // console.log(`a: ${a}`);
    // console.log(`k: ${k}`);
    // console.log(`q: ${queries}`);

    function rightShiftArray(xa) {
        // console.log(`rs xa: ${xa}`);
        // Pop the last element of the array into b
        var b = xa.pop();
        // console.log(`rs b: ${b}`);
        // Insert b into the first position of the array shifting to the right
        var c = xa.unshift(b);
        // console.log(`rs c: ${c}`);
        // console.log(`rs xa: ${xa}`);
        return xa;
    }

    for (var i = 0; i < k; i++) {
        // console.log(`newA before: ${newA}`);
        newA = rightShiftArray(a);
        // console.log(`newA after: ${newA}`);
    }
    // console.log(`newA: ${newA}`);

    for (var i = 0; i < queries.length; i++) {
        retA.push(newA[queries[i]]);
        // console.log(`retA: ${retA}`);
    }    
    // console.log(`return retA: ${retA}`);
    return retA;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const nkq = readLine().split(' ');

    const n = parseInt(nkq[0], 10);

    const k = parseInt(nkq[1], 10);

    const q = parseInt(nkq[2], 10);

    const a = readLine().split(' ').map(aTemp => parseInt(aTemp, 10));

    let queries = [];

    for (let i = 0; i < q; i++) {
        const queriesItem = parseInt(readLine(), 10);
        queries.push(queriesItem);
    }

    const result = circularArrayRotation(a, k, queries);

    ws.write(result.join('\n') + '\n');

    ws.end();
}
