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

// Complete the miniMaxSum function below.
function miniMaxSum(arr) {
    var minSum = 0;
    var maxSum = 0;
    var minArr = [];
    var maxArr = [];

    function getSum(total, num) {
        return total + num;
    }

    const sortArr = arr.sort(function(a, b){return a - b});

    minArr = sortArr.slice(0, sortArr.length-1);
    minSum = minArr.reduce(getSum);
    maxArr = sortArr.slice(1, sortArr.length);
    maxSum = maxArr.reduce(getSum);
    
    console.log(`${minSum} ${maxSum}`);

}

function main() {
    const arr = readLine().split(' ').map(arrTemp => parseInt(arrTemp, 10));

    miniMaxSum(arr);
}
