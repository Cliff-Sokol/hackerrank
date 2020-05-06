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

// Complete the strangeCounter function below.
function strangeCounter(t) {
    // Start counterTotal at 3, which is where it starts counting down
    var counterTotal = 3;

    // Loop as long as t is > counterTotal
    // If t is less than or equal to counterTotal then stop or don't enter loop
    // to begin with
    // case of t < 3 the loop will not be entered and so the return value will be
    //    3 - t + 1, so a t of 1 will yield 3 - 1 + 1 or 3 which is the first
    //    counter
    // case of t = 17 the loop will enter and:
    //    1st iteration: new t = 17 - 3 or 14, new counterTotal = 3*2 or 6
    //    2nd iteration: new t = 14 - 6 or 8, new counterTotal = 6*2 or 12
    //    no 3rd iteration because t <= 12
    while (t > counterTotal) {
        // Calcluate a new t by subtracting counterTotal from t
        t = t - counterTotal;
        counterTotal *= 2;
    }

    // Now calculate the counter to return
    // If t is 1 then return 3 - 1 + 1 or 3
    // If t is 17 then return 12 - 8 + 1 or 5
    return counterTotal - t + 1;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const t = parseInt(readLine(), 10);

    let result = strangeCounter(t);

    ws.write(result + "\n");

    ws.end();
}
