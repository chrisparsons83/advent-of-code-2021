import * as fs from 'fs';

type DisplayRow = number[];

const display: DisplayRow[] = fs.readFileSync('./input.txt').toString().split("\n").map(x => x.split("").map(y => +y));

let sum = 0;
for (let i = 0; i < display.length; i++) {
  for (let j = 0; j < display[0].length; j++) {
    const valueToCheck = display[i][j];
    // check top
    if (i > 0 && display[i-1][j] <= valueToCheck) continue;
    // check bottom
    if (i + 1 < display.length && display[i+1][j] <= valueToCheck) continue;
    // check left
    if (j > 0 && display[i][j-1] <= valueToCheck) continue;
    // check right
    if (j + 1 < display[0].length && display[i][j+1] <= valueToCheck) continue;
    sum += (valueToCheck + 1);
  }
}

const calculateBasin = (i: number, j: number): number => {
  const valueToCheck = display[i][j];
  if (valueToCheck === 9) return 0;
  
  let basinSum = 1;
  display[i][j] = 9;
  if (i > 0) basinSum += calculateBasin(i-1, j);
  if (i + 1 < display.length) basinSum += calculateBasin(i+1, j);
  if (j > 0) basinSum += calculateBasin(i, j-1);
  if (j + 1 < display[0].length) basinSum += calculateBasin(i, j+1);
  
  return basinSum;
}

const resultSet = [];
for (let i = 0; i < display.length; i++) {
  for (let j = 0; j < display[0].length; j++) {
    const result = calculateBasin(i, j);
    if (result > 0) resultSet.push(result);
  }
}


const answerTwo = resultSet.sort((a, b) => b - a).slice(0, 3).reduce((a, b) => a * b, 1);

console.log({answerOne: sum, answerTwo})