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
 * Complete the 'taumBday' function below.
 *
 * The function is expected to return a LONG_INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER b
 *  2. INTEGER w
 *  3. INTEGER bc
 *  4. INTEGER wc
 *  5. INTEGER z
 */

function taumBday(b, w, bc, wc, z) {
    // Write your code here
    var bigB = BigInt(b);
    var bigW = BigInt(w);
    var bigBC = BigInt(bc);
    var bigWC = BigInt(wc);
    var bigZ = BigInt(z);
    
    var totalCost = 0n;

    if (bigBC === bigWC) {
        // Cost of black & white gift is the same then no conversion
        totalCost = (bigB * bigBC) + (bigW * bigWC);
    } else if ((bigBC <= bigZ) && (bigWC <= bigZ)) {
        // Cost of black & white gift is less than or equal to conversion cost
        // then no conversion
        totalCost = (bigB * bigBC) + (bigW * bigWC);
    } else if ((bigZ < bigWC) && ((bigBC + bigZ) < bigWC)) {
        // Cost of conversion is less than black gift and cost of black gift
        // is less than white gift then buy black & convert
        totalCost = ((bigB + bigW) * bigBC) + (bigW * bigZ);
    } else if ((bigZ < bigBC) && ((bigWC + bigZ) < bigBC)) {
        // Cost of conversion is less than white gift and cost of white gift
        // is less than black gift then buy white & convert
        totalCost = ((bigB + bigW) * bigWC) + (bigB * bigZ);
    } else {
        totalCost = (bigB * bigBC) + (bigW * bigWC);
    }
    return totalCost;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const t = parseInt(readLine().trim(), 10);

    for (let tItr = 0; tItr < t; tItr++) {
        const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

        const b = parseInt(firstMultipleInput[0], 10);

        const w = parseInt(firstMultipleInput[1], 10);

        const secondMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

        const bc = parseInt(secondMultipleInput[0], 10);

        const wc = parseInt(secondMultipleInput[1], 10);

        const z = parseInt(secondMultipleInput[2], 10);

        const result = taumBday(b, w, bc, wc, z);

        ws.write(result + '\n');
    }

    ws.end();
}
