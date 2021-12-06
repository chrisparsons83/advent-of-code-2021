import * as fs from 'fs';

type Point = [number, number];
type Line = [Point, Point];

const isHorizontalOrVertical = (line: Line): boolean => {
  return (line[0][0] === line[1][0]) || (line[0][1] === line[1][1]);
};

const isDiagonal = (line: Line): boolean => {
  return Math.abs(line[0][0] - line[1][0]) === Math.abs(line[0][1] - line[1][1]);
}

const lineData: Line[] = fs.readFileSync('./input.txt').toString().split("\n").map(x => {
  const firstSpace = x.indexOf(' ');
  const firstPoint = x.substring(0, firstSpace).trim().split(",").map(x => +x) as Point;
  const secondPoint = x.substring(firstSpace + 3).trim().split(",").map(x => +x) as Point;
  const dataLine: Line = [firstPoint, secondPoint];
  return dataLine;
});

const mapOceanFloor: Map<string, number> = new Map();

const subsetOfLineData = lineData.filter(x => isHorizontalOrVertical(x));

for (const line of subsetOfLineData) {
  if (line[0][0] === line[1][0]) {
    // Case of X=X
    const startNumber = Math.min(line[0][1], line[1][1]);
    const endNumber = Math.max(line[0][1], line[1][1]);
    for (let i = startNumber; i <= endNumber; i++) {
      const currentString = `${line[0][0]},${i}`;
      mapOceanFloor.set(currentString, (mapOceanFloor.get(currentString) || 0) + 1);
    }
  }
  if (line[0][1] === line[1][1]) {
    // Case of Y=Y
    const startNumber = Math.min(line[0][0], line[1][0]);
    const endNumber = Math.max(line[0][0], line[1][0]);
    for (let i = startNumber; i <= endNumber; i++) {
      const currentString = `${i},${line[0][1]}`;
      mapOceanFloor.set(currentString, (mapOceanFloor.get(currentString) || 0) + 1);
    }
  }
}

const answerOne = [...mapOceanFloor.values()].filter(x => x >= 2).length;

const diagonalLines = lineData.filter(x => isDiagonal(x));

for (const line of diagonalLines) {
  // find if slope is positive or negative
  const slope = (line[0][1] - line[1][1]) / (line[0][0] - line[1][0]);
  const sideDistance = Math.abs(line[1][1] - line[0][1]);
  const smallestX = Math.min(line[0][0], line[0][1]);
  if (slope === 1) {
    // Positive
    // Start with the smallest X, and the smallest Y
    const smallestY = Math.min(line[0][1], line[1][1]);
    for (let i = 0; i <= sideDistance; i++) {
      const currentString = `${smallestX + i},${smallestY + i}`;
      mapOceanFloor.set(currentString, (mapOceanFloor.get(currentString) || 0) + 1);
    }
  }
  if (slope === -1) {
    // Negative
    // Start with the smallest X and the biggest Y
    const biggestY = Math.max(line[0][1], line[1][1]);
    for (let i = 0; i <= sideDistance; i++) {
      const currentString = `${smallestX + i},${biggestY - i}`;
      mapOceanFloor.set(currentString, (mapOceanFloor.get(currentString) || 0) + 1);
    }
  }
}

const answerTwo = [...mapOceanFloor.values()].filter(x => x >= 2).length;

console.log({answerOne, answerTwo});
