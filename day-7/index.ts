import * as fs from 'fs';

const crabPositions: number[] = fs.readFileSync('./input.txt').toString().split(",").map(x => Number.parseInt(x)).sort((a, b) => a - b);
const median = (crabPositions[499] + crabPositions[500]) / 2;

console.log({crabPositions, median});

let minFuel = Infinity;
for (let i = crabPositions[0]; i <= crabPositions[999]; i++) {
  const fuel = crabPositions.reduce((a, b) => a + Math.abs(b - i), 0);
  if (fuel < minFuel) minFuel = fuel;
}

const triangular = (value: number) => {
    const abs = Math.abs(value);
    return ((abs / 2) * (abs + 1)) * (abs / value) || 0;
};

let minTriangularFuel = Infinity;
for (let i = crabPositions[0]; i <= crabPositions[999]; i++) {
  const fuel = crabPositions.reduce((a, b) => a + triangular(Math.abs(b - i)), 0);
  if (fuel < minTriangularFuel) minTriangularFuel = fuel;
}

console.log({minFuel, minTriangularFuel});