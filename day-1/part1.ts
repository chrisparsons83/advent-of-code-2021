import * as fs from 'fs';

const depths: number[] = fs.readFileSync('./part1input.txt').toString().split("\n").map(x => +x);

let answer = 0;
for (let i = 1, j = depths.length; i < j; i++) {
  if (depths[i] > depths[i-1]) answer += 1;
}

console.log(answer);

let answer2 = 0;
for (let i = 3, j = depths.length; i < j; i++) {
  if (depths[i] > depths[i-3]) answer2 += 1;
}

console.log(answer2);