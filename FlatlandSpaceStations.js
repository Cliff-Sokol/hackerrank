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

// Complete the flatlandSpaceStations function below.
function flatlandSpaceStations(n, c) {

    var maxDistance = 0;
    var dist = 0;

    // Sort ascending
    var sortStations = c.sort(function(a, b) {return a - b});

    console.log("n", n, "c", c);

    // If there are the same number of cities as space stations then
    // return 0 because every city has a space station so each city is
    // 0 km away from a space station
    if (c.length === n) {
        return 0;
    }

    // Iterate through the sorted Stations calculating the max of half of the 
    // distance between the stations
    for (var i = 0; i < sortStations.length - 1; i++) {
        dist = Math.abs(Math.ceil((sortStations[i + 1] - sortStations[i] - 1) / 2.0));
        maxDistance = Math.max(dist, maxDistance);
    }

    // If max is less than the first Station location then set max to the first
    // Station location
    if (maxDistance < sortStations[0]) {
        maxDistance = sortStations[0];
    }

    // If max is less than the number of cities - 1 - the last station location
    // then set max to the number of cities - 1 - the last station location
    if (maxDistance < (n - 1 - sortStations[sortStations.length - 1])) {
        maxDistance = n - 1 - sortStations[sortStations.length - 1];
    }

    return maxDistance;

}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const nm = readLine().split(' ');

    const n = parseInt(nm[0], 10);

    const m = parseInt(nm[1], 10);

    const c = readLine().split(' ').map(cTemp => parseInt(cTemp, 10));

    let result = flatlandSpaceStations(n, c);

    ws.write(result + "\n");

    ws.end();
}
