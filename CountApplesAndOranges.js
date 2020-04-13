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

// Complete the countApplesAndOranges function below.
function countApplesAndOranges(s, t, a, b, apples, oranges) {
    var houseStart = s;
    var houseEnd = t;
    var appleTree = a;
    var orangeTree = b;
    var appleWithinHouse = 0;
    var orangeWithinHouse = 0;
    var appleFalls = 0;
    var orangeFalls = 0;

    for (var i = 0; i < apples.length; i++) {
        appleFalls = appleTree + apples[i]
        if (houseStart <= appleFalls && appleFalls <= houseEnd) {
            appleWithinHouse += 1;
        }
    }
    for (var j = 0; j < oranges.length; j++) {
        orangeFalls = orangeTree + oranges[j];
        if (houseEnd >= orangeFalls && orangeFalls >= houseStart) {
            orangeWithinHouse += 1;
        }
    }

    console.log(appleWithinHouse);
    console.log(orangeWithinHouse);

}

function main() {
    const st = readLine().split(' ');

    const s = parseInt(st[0], 10);

    const t = parseInt(st[1], 10);

    const ab = readLine().split(' ');

    const a = parseInt(ab[0], 10);

    const b = parseInt(ab[1], 10);

    const mn = readLine().split(' ');

    const m = parseInt(mn[0], 10);

    const n = parseInt(mn[1], 10);

    const apples = readLine().split(' ').map(applesTemp => parseInt(applesTemp, 10));

    const oranges = readLine().split(' ').map(orangesTemp => parseInt(orangesTemp, 10));

    countApplesAndOranges(s, t, a, b, apples, oranges);
}
