'use strict';

const fs = require('fs');

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

/*
 * Complete the 'gradingStudents' function below.
 *
 * The function is expected to return an INTEGER_ARRAY.
 * The function accepts INTEGER_ARRAY grades as parameter.
 */

function gradingStudents(grades) {
    // Write your code here
    var roundedGrades = [];
    var tempGrade = 0;
    var doneGrade = false;
    var j = 100;
    for (var i = 0; i < grades.length; i++) {
        tempGrade = grades[i];
        // console.log("grade: " + tempGrade);
        if (tempGrade < 38) {
            // console.log("low: " + tempGrade);
            roundedGrades.push(tempGrade);
        } else {
            doneGrade = false;
            j = 100;
            do {
                // console.log("j: " + j);
                if (j - tempGrade < 3 && j - tempGrade > 0) {
                    // console.log("rounding: " + tempGrade + " to " + j);
                    roundedGrades.push(j);
                    doneGrade = true;
                }
                j -= 5;
            } while (!doneGrade && j > tempGrade && j >= 40);
            if (!doneGrade) {
                // console.log("keeping: " + tempGrade)
                roundedGrades.push(tempGrade);
            }
        }
    }
    return roundedGrades;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const gradesCount = parseInt(readLine().trim(), 10);

    let grades = [];

    for (let i = 0; i < gradesCount; i++) {
        const gradesItem = parseInt(readLine().trim(), 10);
        grades.push(gradesItem);
    }

    const result = gradingStudents(grades);

    ws.write(result.join('\n') + '\n');

    ws.end();
}
