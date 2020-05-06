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

// Complete the happyLadybugs function below.
function happyLadybugs(b) {

    // Assume there aren't spaces in the string
    var isSpace = false;
    // Assume that there are at least pairs of the same character
    var sameBeside = true;

    // Iterate through the string
    for (var pos = 0; pos < b.length; pos++) {
        // If the current character is the space then ...
        if (b.charAt(pos) === "_") {
            isSpace = true; 
        } else if (b.indexOf(b.charAt(pos)) === pos) {
            // Else if this is the first instance of the current
            // character then ...
            var charCount = 0;  // set the count of this character to 0
            var nextPos = pos + 1; // start looking at the next character
            let lastPos = pos; // remember where we started

            // Loop while nextPos is not zero.
            while (nextPos != 0){
                // If the current color is not found again then nextPos will
                // be -1, which means that when we add 1 it will be zero which
                // will stop the loop while
                nextPos = b.indexOf(b.charAt(pos), nextPos); // if another found

                // if the position of the next same character is more than 1 away
                // from the last position then they are not beside each other
                if (nextPos - lastPos > 1) { 
                    sameBeside = false; 
                }

                // Set lastPos to the old nextPos                
                lastPos = nextPos;
                // Increment charCount
                charCount += 1;
                // Increment nextPos.  If nextPos was -1 from b.indexOf above 
                // this will stop loop while 
                nextPos += 1;
            }
            // If there is only one instance of a color then return NO because
            // it is not a pair
            if (charCount === 1) {
                return "NO"; 
            }
        }
    }
    // If there is a space OR all colors were paired then ladybugs are happy
    if (isSpace || sameBeside) {
        return "YES";
    } else {
        return "NO";
    }
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const g = parseInt(readLine(), 10);

    for (let gItr = 0; gItr < g; gItr++) {
        const n = parseInt(readLine(), 10);

        const b = readLine();

        let result = happyLadybugs(b);

        ws.write(result + "\n");
    }

    ws.end();
}
