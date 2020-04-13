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
    inputString = inputString.trim().split('\n').map(str => str.trim());

    main();
});

function readLine() {
    return inputString[currentLine++];
}

/*
 * Complete the getMoneySpent function below.
 */
function getMoneySpent(keyboards, drives, b) {
    // get both arrays and sort them in descending order
    var sortedKs = keyboards.sort(function(a, b){return b-a});
    var sortedDs = drives.sort(function(a, b){return b-a});
    var totalCosts = [];

    // if either the lowest price keyboard or drive is more than the budget
    // then return -1.
    if (sortedKs[sortedKs.length-1] > b || sortedDs[sortedDs.length-1] > b) {
        return -1;
    }
    // if the cost of both the lowest price keyboard and drive is over budget
    // then return -1.
    if (sortedKs[sortedKs.length-1] + sortedDs[sortedDs.length-1] > b) {
        return -1;
    }
    
    // add all of the different keyboards and drives together to get an array
    // of total costs for one of each.
    for (var i = 0; i < sortedKs.length; i++) {
        for (var j = 0; j < sortedDs.length; j++) {
            totalCosts.push(sortedKs[i] + sortedDs[j]);
        }
    }

    // sort the totalCosts in descending order
    var sortTotalCosts = totalCosts.sort(function(a, b){return b-a})

    // now look for the first total cost that is less than budget
    var highestCost = -1;
    var k = 0;
    do {
        if (sortTotalCosts[k] <= b) {
            highestCost = sortTotalCosts[k];
        }
        k += 1;
    }
    while (highestCost === -1 && k < sortTotalCosts.length);

    return highestCost;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const bnm = readLine().split(' ');

    const b = parseInt(bnm[0], 10);

    const n = parseInt(bnm[1], 10);

    const m = parseInt(bnm[2], 10);

    const keyboards = readLine().split(' ').map(keyboardsTemp => parseInt(keyboardsTemp, 10));

    const drives = readLine().split(' ').map(drivesTemp => parseInt(drivesTemp, 10));

    /*
     * The maximum amount of money she can spend on a keyboard and USB drive, or -1 if she can't purchase both items
     */

    let moneySpent = getMoneySpent(keyboards, drives, b);

    ws.write(moneySpent + "\n");

    ws.end();
}
