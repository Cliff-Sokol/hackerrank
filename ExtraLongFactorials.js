'use strict';

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

// Complete the extraLongFactorials function below.
function extraLongFactorials(n) {
    var factorial = BigInt(1);
    var i = BigInt(n);
    var stringFactorial = "";

    if (n === 0 || n === 1) {
        stringFactorial = "1";
    } else {
        for (i = n; i > 0; i--) {
            factorial = BigInt(factorial) * BigInt(i);
        }
        stringFactorial = factorial.toString();
    }

    console.log(stringFactorial);
}

function main() {
    const n = parseInt(readLine(), 10);

    extraLongFactorials(n);
}
