import * as fs from 'fs';

const lines: number[][] = fs.readFileSync('./input.txt').toString().split("\n").map(x => x.split('').map(y => +y));
const flashCheckRow = [false, false, false, false, false, false, false, false, false, false];
const flashCheck: boolean[][] = new Array(10).fill(null).map(() => [...flashCheckRow]);

const recFlashing = (i: number, j: number): void => {
  if (i < 0 || i > 9 || j < 0 || j > 9) return;

  if (lines[i][j] >= 10 && !flashCheck[i][j]) {
    flashCheck[i][j] = true;

    increaseFlash(i-1, j-1);
    increaseFlash(i-1, j);
    increaseFlash(i-1, j+1);
    increaseFlash(i, j-1);
    increaseFlash(i, j+1);
    increaseFlash(i+1, j-1);
    increaseFlash(i+1, j);
    increaseFlash(i+1, j+1);

    recFlashing(i-1, j-1);
    recFlashing(i-1, j);
    recFlashing(i-1, j+1);
    recFlashing(i, j-1);
    recFlashing(i, j+1);
    recFlashing(i+1, j-1);
    recFlashing(i+1, j);
    recFlashing(i+1, j+1);
  }

  return;
}

const increaseFlash = (i: number, j: number): void => {
  if (i < 0 || i > 9 || j < 0 || j > 9) return;
  
  lines[i][j]++;
}

let flashes = 0;
let times = 1;
for (; times <= 1000; times++) {
  let stepFlashes = 0;
  for (let i = 0; i < lines.length; i++) {
    for (let j = 0; j < lines[0].length; j++) {
      lines[i][j]++;
    }
  }

  for (let i = 0; i < lines.length; i++) {
    for (let j = 0; j < lines[0].length; j++) {
      recFlashing(i, j);
    }
  }

  for (let i = 0; i < lines.length; i++) {
    for (let j = 0; j < lines[0].length; j++) {
      if (flashCheck[i][j]) {
        stepFlashes++;
        lines[i][j] = 0;
        flashCheck[i][j] = false;
      }
    }
  }

  if (times <= 100) flashes += stepFlashes;

  if (stepFlashes === 100) break;
}

console.log({answerOne: flashes, answerTwo: times})