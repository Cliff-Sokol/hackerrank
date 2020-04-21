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
    var num_attacks = 0;

    // Create an array of queen attack patterns
    var attackPatterns = [[1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [1, -1], [-1, 1], [-1, -1]];

    // console.log(attackPatterns.length, attackPatterns);
    // console.log(obstacles.length, obstacles);
    // For each attack pattern, apply the attack pattern to the queen until
    // either an obstacle or the edge of the board is encountered
    for (var i = 0; i < attackPatterns.length; i++) {
        // Reset to starting point for each attack run
        var continueAttack = true;
        var q_x = r_q;
        var q_y = c_q;
        var ap_x = attackPatterns[i][0];
        var ap_y = attackPatterns[i][1];

        // console.log("start", q_x, q_y);
        // console.log("pattern", ap_x, ap_y);
        while (continueAttack) {
            // get the next square in attack pattern
            q_x += ap_x;
            q_y += ap_y;
            // console.log("next", q_x, q_y);
            // If the next square is within the chess board then continue attack
            // otherwise stop attack
            if (continueAttack && 
                (q_x >= 1 && q_x <= n) && 
                (q_y >= 1 && q_y <= n)) {
                // console.log("attack", q_x, q_y);
                if (obstacles.length > 0) {
                    // If the square is an obstacle then stop that attack pattern
                    // otherwise increment the number of attacks
                    for (var j = 0; j < obstacles.length && continueAttack; j++) {
                        // console.log("obstacle", obstacles[j][0], obstacles[j][1])
                        if (obstacles[j][0] === q_x && obstacles[j][1] === q_y) {
                            // console.log("obstacle", obstacles[j][0], obstacles[j][1]);
                            continueAttack = false;
                        }
                    }
                    num_attacks += (continueAttack) ? 1 : 0;
                } else {
                    num_attacks += 1;
                }
            } else {
                continueAttack = false;
            }
        }
    }
    return num_attacks;

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
