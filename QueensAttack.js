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

// Complete the queensAttack function below.
function queensAttack(n, k, r_q, c_q, obstacles) {
    // Initialize the length of the attacks in each direction, straight up & down,
    // straight right & left, and diagonally up left, up right, down left, and down right
    let up = n - r_q;
    let right = n - c_q;
    let down = r_q - 1;
    let left = c_q - 1;
    let up_left = Math.min(up, left);
    let up_right = n - Math.max(c_q, r_q);
    let down_left = Math.min(c_q, r_q) - 1;
    let down_right = Math.min(r_q - 1, n - c_q);

    // For each obstacle
    for (var i = 0; i < k; i++ ) {
        // Get the row and column of the obstacle
        var r_o = obstacles[i][0];
        var c_o = obstacles[i][1];

        // If the obstacle row is the same as the queen's row then the obstacle
        // is blocking a queen's move
        if (r_o == r_q) {
            if (c_o > c_q) {
                // If the obstacle is "above" the queen then number of attacks the
                // queen has is the minimum between the number of rows available and
                // the difference between the obstacle column and the queen's column
                up = Math.min(up, c_o - c_q - 1);
            } else {
                // If the obstacle is "below" the queen then number of attacks the
                // queen has is the minimum between the number of rows available and
                // the difference between the queen's column and the obstacle column
                down = Math.min(down, c_q - c_o - 1);
            }
        }

        // If the obstacle column is hte same as the queen's column then
        // the obstacle is blocking a queen's move
        if (c_o == c_q) {
            if (r_o > r_q) {
                // If the obstacle is "to the right of" the queen then number of 
                // attacks the queen has is the minimum between the number of 
                // columns available and the difference between the obstacle 
                // row and the queen's row
                right = Math.min(right, r_o - r_q - 1);
            } else {
                // If the obstacle is "to the left of" the queen then number of 
                // attacks the queen has is the minimum between the number of 
                // columnss available and the difference between the queen's 
                // row and the obstacle row
                left = Math.min(left, r_q - r_o - 1);
            }
        }

        // If the absolute value of the difference between the obstacle column
        // and the queen's column is equal to the absolute value of the obstacle
        // row and the queen's row is the same then the up_right, up_left, down_right,
        // and down_left attacks may need to be adjusted
        if (Math.abs(c_o - c_q) == Math.abs(r_o - r_q)) {
            // If the obstacle column is greater than the queen's column and the
            // obstacle row is greater than the queen's row then adjust up_right to
            // be the minimum of up_right and the obstacle column minus the queen's
            // column minus 1
            if ((c_o > c_q) && (r_o > r_q)) {
                up_right = Math.min(up_right, c_o - c_q - 1);
            }
            // If the obstacle column is greater than the queen's column and the
            // obstacle row is less than the queen's row then adjust down_right to
            // be the minimum of down_right and the obstacle column minus the queen's
            // column minus 1
            if ((c_o > c_q) && (r_o < r_q)) {
                down_right = Math.min(down_right, c_o - c_q - 1);   
            }
            // If the obstacle column is less than the queen's column and the
            // obstacle row is greater than the queen's row then adjust up_left
            // to be the the minimum of up_left and the queen's column minus the
            // obstacle column minus 1
            if ((c_o < c_q) && (r_o > r_q)) {
                up_left = Math.min(up_left, c_q - c_o - 1);
            }
            // If the obstacle column is less than the queen's column and the
            // obstacle row is less than the queen's row then adjust down_left
            // to be the minimum of down_left and the queen's column minus the
            // obstacle column minus 1
            if ((c_o < c_q) && (r_o < r_q)) {
                down_left = Math.min(down_left, c_q - c_o - 1);   
            }
        }
    }
    // Return the sum of the eight attack counts
    return right + left + up + down + down_left + up_left + down_right + up_right;

}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const nk = readLine().split(' ');

    const n = parseInt(nk[0], 10);

    const k = parseInt(nk[1], 10);

    const r_qC_q = readLine().split(' ');

    const r_q = parseInt(r_qC_q[0], 10);

    const c_q = parseInt(r_qC_q[1], 10);

    let obstacles = Array(k);

    for (let i = 0; i < k; i++) {
        obstacles[i] = readLine().split(' ').map(obstaclesTemp => parseInt(obstaclesTemp, 10));
    }

    let result = queensAttack(n, k, r_q, c_q, obstacles);

    ws.write(result + "\n");

    ws.end();
}
