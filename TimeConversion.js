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
 * Complete the timeConversion function below.
 */
function timeConversion(s) {
    /*
     * Write your code here.
     */
    var hour = 0;
    var minute = 0;
    var second = 0;
    var ampm = "";
    console.log(`time: ${s}`);
    var pieces = s.split(":");
    if (pieces.length === 3) {
        hour = parseInt(pieces[0]);
        console.log(`hour: ${hour}`);
        minute = parseInt(pieces[1]);
        console.log(`minute: ${minute}`);
        if (pieces[2].length >= 4) {
            second = parseInt(pieces[2].substring(0, 2));
            ampm = pieces[2].substring(2, 4);
        } else {
            second = parseInt(pieces[2].substring(0, 1));
            ampm = pieces[2].substring(1, 3);
        }
        console.log(`second: ${second}`);
        console.log(`ampm: ${ampm}`);

        if (ampm.toUpperCase() === "PM") {
            if (hour < 12) {
            hour += 12;
            }
        } else if (hour === 12) {
            hour = 0;
        }
        var ret = ("0"+hour).slice(("0"+hour).length-2)+":"+("0"+minute).slice(("0"+minute).length-2)+":"+("0"+second).slice(("0"+second).length-2);
        console.log(ret);
        return ret;
    }
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const s = readLine();

    let result = timeConversion(s);

    ws.write(result + "\n");

    ws.end();
}
