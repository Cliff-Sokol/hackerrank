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

// Complete the acmTeam function below.
function acmTeam(topic) {
    // console.log("topic", topic);

    function bitWiseOr(a, b) {
        var numChunks = 0;
        var chunkA = "";
        var chunkB = "";
        var bitChunkA = 0;
        var bitChunkB = 0;
        var total = 0;
        var orVal = 0;

        // console.log("a", a);
        // console.log("b", b);

        if (a.length > 30) {
            if (a.length % 30 === 0) {
                numChunks = Math.floor(a.length / 30);
            } else {
                numChunks = Math.ceil(a.length / 30);
            }
        } else {
            numChunks = 1;
        }

        // console.log("numChunks", numChunks);

        for (var i = 0; i < numChunks; i++) {
            var numOnes = 0;

            chunkA = parseInt("00" + a.substr(i * 30, 30), 2);
            // console.log("chunkA", chunkA);
            chunkB = parseInt("00" + b.substr(i * 30, 30), 2);
            // console.log("chunkB", chunkB);

            var orVal = chunkA | chunkB;

            var strOrVal = orVal.toString(2);
            // console.log("strOrVal", strOrVal);
            for (var j = 0; j < strOrVal.length; j++) {
                numOnes += (strOrVal.charAt(j) == "1") ? 1 : 0;
            }
            total += numOnes;
        }
        
        return total;
    }

    // var x = bitWiseOr('111111111111111111111111000000', '000000000000000000000000111111');
    // console.log("x", x);

    var tLen = topic.length;
    var maxNumTopics = 0;
    var totalOfMax = 0;
    var numTopics = 0;
    for (var i = 0; i < tLen - 1; i++) {
        for (var j = i + 1; j < tLen; j++) {
            numTopics = bitWiseOr(topic[i], topic[j]);
            if (numTopics > maxNumTopics) {
                maxNumTopics = numTopics;
                totalOfMax = 1;
            } else if (numTopics == maxNumTopics) {
                totalOfMax += 1;
            }
        }
    }
    return [maxNumTopics, totalOfMax];
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const nm = readLine().split(' ');

    const n = parseInt(nm[0], 10);

    const m = parseInt(nm[1], 10);

    let topic = [];

    for (let i = 0; i < n; i++) {
        const topicItem = readLine();
        topic.push(topicItem);
    }

    let result = acmTeam(topic);

    ws.write(result.join("\n") + "\n");

    ws.end();
}
