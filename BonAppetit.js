'use strict';

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

// Complete the bonAppetit function below.
function bonAppetit(bill, k, b) {
    function sumBill(bill, k) {
        var sumAll = 0;
        var sumAnna = 0;
        for (var i = 0; i < bill.length; i++) {
            sumAll += bill[i];
        }
        sumAnna = sumAll - bill[k];

        return [sumAll, sumAnna];
    }

    var retVal = "";
    var sums = sumBill(bill, k);
    var annaBill = sums[1] / 2;
    if (annaBill === b) {
        retVal = "Bon Appetit";
    } else {
        retVal = b - annaBill;
    }
    console.log(retVal);
}

function main() {
    const nk = readLine().replace(/\s+$/g, '').split(' ');

    const n = parseInt(nk[0], 10);

    const k = parseInt(nk[1], 10);

    const bill = readLine().replace(/\s+$/g, '').split(' ').map(billTemp => parseInt(billTemp, 10));

    const b = parseInt(readLine().trim(), 10);

    bonAppetit(bill, k, b);
}
