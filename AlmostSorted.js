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

// Complete the almostSorted function below.
function almostSorted(arr) {

    // Return true if the array can be sorted by swapping
    // the ith and jth elements
    function canSwap(arr, i, j) {
        // Set holding values so we can unswap
        var k = arr[i];
        var l = arr[j];
        // Swap the ith and jth elements
        var temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
        // If the array is now sorted then return true
        // else unswap and return false
        if (isArraySorted(arr)) {
            return true;
        } else {
            arr[i] = k;
            arr[j] = l;
            return false;
        }
    }

    // Check whether the array is sorted
    function isArraySorted(arr) {
        var isSorted = true;
        for (var i = 0; i < arr.length-1; i++) {
            if (arr[i] > arr[i+1]) {
                isSorted = false;
                break;
            }
        }
        return isSorted;
    }

    // Check whether the array can be sorted by
    // reversing the segment from b to e
    function canReverseArraySegment(arr, b, e) {
        var i = b;
        var j = e;
        while (i <= j) {
            var temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
            i += 1;
            j -= 1;
        }
        return isArraySorted(arr);
    }

    var startIdx = 0;
    var endIdx = 0;

    // Find the first out of order number from beginning of array
    for (var i = 0; i < arr.length-1; i++) {
        if (arr[i] > arr[i+1]) {
            startIdx = i;
            break;
        }
    }

    // Find the first out of order number from end of array
    for (var i = arr.length-1; i > 0; i--) {
        if (arr[i] < arr[i-1]) {
            endIdx = i;
            break;
        }
    }

    // If the array is already sorted then output "yes"
    // Else if a swap or reverse can sort array then
    // output "yes" and the values to swap or range
    // to reverse
    if (isArraySorted(arr)) {
        console.log("yes");
    } else if (canSwap(arr, startIdx, endIdx)) {
        console.log("yes");
        console.log(`swap ${startIdx+1} ${endIdx+1}`);
    } else if (canReverseArraySegment(arr, startIdx, endIdx)) {
        console.log("yes");
        console.log(`reverse ${startIdx+1} ${endIdx+1}`);
    } else {
        console.log("no");
    }

    return;
}

function main() {
    const n = parseInt(readLine(), 10);

    const arr = readLine().split(' ').map(arrTemp => parseInt(arrTemp, 10));

    almostSorted(arr);
}
