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

// Complete the gridSearch function below.
function gridSearch(G, P) {

    var numGRows = G.length;
    var numPRows = P.length;
    var rowGLength = G[0].length;
    var rowPLength = P[0].length;

    // Iterate through array G stopping when there aren't enough rows to find array P
    for(var rowOfG = 0; rowOfG < numGRows - numPRows + 1; rowOfG++){
        // Start at the beginning of the row
        var posInRowG = 0;

        // While there is room in the row of array G to find the string in P
        while (posInRowG < rowGLength - rowPLength + 1) {
            // Try to find the string in row of P in row of G
            posInRowG = G[rowOfG].indexOf(P[0], posInRowG);
            // If we don't find it the break out of the while loop and go to the next
            // row of array G
            if(posInRowG === -1) {
                break;
            }

            // Iterate over the next numPRows of array G
            for(var rowToCheck = rowOfG + 1; rowToCheck - rowOfG < numPRows; rowToCheck++){
                // If the string at the same place of the current row of G 
                // does not match the string at the next row of array P then
                // break the for loop but check if the string is later in the row of G
                if(G[rowToCheck].substring(posInRowG, posInRowG + rowPLength) !== P[rowToCheck - rowOfG]){
                    break;
                }
                else if(rowToCheck - rowOfG === numPRows - 1){
                    // Otherwise, if we have checked and found all rows of P in
                    // the same columns in the rows of G then return YES
                    return "YES";
                }
            }
            // Go to the next position in row of G
            posInRowG++;
        }
    }
    // If we get out of the loop then return NO because we didn't match
    return "NO";

}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const t = parseInt(readLine(), 10);

    for (let tItr = 0; tItr < t; tItr++) {
        const RC = readLine().split(' ');

        const R = parseInt(RC[0], 10);

        const C = parseInt(RC[1], 10);

        let G = [];

        for (let i = 0; i < R; i++) {
            const GItem = readLine();
            G.push(GItem);
        }

        const rc = readLine().split(' ');

        const r = parseInt(rc[0], 10);

        const c = parseInt(rc[1], 10);

        let P = [];

        for (let i = 0; i < r; i++) {
            const PItem = readLine();
            P.push(PItem);
        }

        let result = gridSearch(G, P);

        ws.write(result + "\n");
    }

    ws.end();
}
