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

// Complete the absolutePermutation function below.
function absolutePermutation(n, k) {

    // Function to return the index of the array plus 1
    // so to construct the ordered array
    function myFunction(num, idx) {
        return idx + 1;
    }

    // Initialize the return array with n slots = 0
    var retArray = new Array(n).fill(0);
    // index through array
    var retIdx = 0;

    // If the difference is to be 0 then just initialize
    // the array to the sequence from 1 to n and return it.
    if(k === 0){
        retArray = retArray.map(myFunction);
        return retArray;
    }

    // If the number of elements (n) divided by the difference to be
    // used to permute is even then we can construct a permutation array
    if ((n / k) % 2 === 0) {
        // Let the initial jth value be the difference plus 1
        var j = 1 + k;

        // While we have not finished inserting numbers into the return array
        while (retIdx < n){
            // Iterate from 0 to the permutation difference and set the
            // current slot in the return array to the current index plus j
            for (var i = 0; i < k; i++) {
                retArray[retIdx] = retIdx + j;
                retIdx++;
            }
            // If the jth value is now 1 more than the difference then set the
            // jth value to 1 minus the difference otherwise set it to
            // one plus the difference
            if (j === 1 + k) {
                j = 1 - k;
            } else {
                j = 1 + k;
            }
        }
        return retArray;
    } else {
        // Return an array with just -1
        return [-1];
    }
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const t = parseInt(readLine(), 10);

    for (let tItr = 0; tItr < t; tItr++) {
        const nk = readLine().split(' ');

        const n = parseInt(nk[0], 10);

        const k = parseInt(nk[1], 10);

        let result = absolutePermutation(n, k);

        ws.write(result.join(" ") + "\n");
    }

    ws.end();
}
