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

// Complete the sockMerchant function below.
function sockMerchant(n, ar) {
    var pairsCount = 0;
    
    // Create and init an array to hold the count of socks of each color
    var colorCount = new Array(101);
    for (var i = 0; i < colorCount.length; i++) {
        colorCount[i] = 0;
    }

    // For each sock in ar, increment the corresponding color in colorCount
    for (var j = 0; j < n; j++) {
        colorCount[ar[j]] += 1;
    }

    // Now count the number of sock colors in colorCount that are evenly divisible by 2
    for (var k = 0; k < colorCount.length; k++) {
        // If there isn't at least one pair then skip the color
        if (colorCount[k] >= 2) {
            if (colorCount[k] % 2 === 0) {
                // If evenly divisible by 2 then use value divided by 2
                pairsCount += colorCount[k] / 2;
            } else {
                // Else subtract 1 from count then divide
                pairsCount += (colorCount[k] - 1) / 2;
            }
        }
    }
    return pairsCount;

}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine(), 10);

    const ar = readLine().split(' ').map(arTemp => parseInt(arTemp, 10));

    let result = sockMerchant(n, ar);

    ws.write(result + "\n");

    ws.end();
}
