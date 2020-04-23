'use strict';

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

// Complete the kaprekarNumbers function below.
function kaprekarNumbers(p, q) {
    var retString = "";
    var ndigits = 0;

    for (var i = p; i <= q; i++) {
        // Get the number of digits in prospective kaprekar number
        if (i < 10) {
            ndigits = 1;
        } else if (i < 100) {
            ndigits = 2;
        } else if (i < 1000) {
            ndigits = 3;
        } else if (i < 10000) {
            ndigits = 4;
        } else if (i < 100000) {
            ndigits = 5;
        } else {
            ndigits = 6;
        }

        // calculate the square
        var sqr = i**2;

        // Convert it to a string
        var strSqr = sqr.toString();

        // Break it into two parts, with the right hand part being ndigits long
        var right = strSqr.substring(strSqr.length-ndigits, strSqr.length);
        // and the right hand part being either ndigits or ndigits-1 in length
        var left = (strSqr.length === 2 * ndigits) ? strSqr.substring(0, ndigits) : strSqr.substring(0, ndigits-1);

        var kSum = parseInt(left, 10) + parseInt(right, 10);

        if (i === 1) {
            retString = "1 ";
        } else if (kSum === i) {
            retString = retString.concat(i.toString(), " ");
        }
    }
    if (retString === "") {
        retString = "INVALID RANGE";
    }
    console.log(retString);
}

function main() {
    const p = parseInt(readLine(), 10);

    const q = parseInt(readLine(), 10);

    kaprekarNumbers(p, q);
}
