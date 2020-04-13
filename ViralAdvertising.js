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

// Complete the viralAdvertising function below.
function viralAdvertising(n) {

    var likes = 0;
    var recips = 5;
    var cumLikes = 0;

    // console.log("day", "recips", "likes", "cumLikes");
    for (var i = 1; i <= n; i++) {
        likes = Math.floor((recips / 2));
        cumLikes += likes;
        // console.log(i, recips, likes, cumLikes);
        recips = likes * 3;
    }
    return cumLikes;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine(), 10);

    let result = viralAdvertising(n);

    ws.write(result + "\n");

    ws.end();
}
