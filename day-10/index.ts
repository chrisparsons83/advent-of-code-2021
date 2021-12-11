import * as fs from 'fs';

const lines: string[] = fs.readFileSync('./input.txt').toString().split("\n");

const variableMapping: {[key: string]: string} = {
  '(': ')',
  '<': '>',
  '[': ']',
  '{': '}',
};
const points: {[key: string]: number} = {
  ')': 3,
  ']': 57,
  '}': 1197,
  '>': 25137,
};
const autocompletePoints: {[key: string]: number} = {
  '(': 1,
  '[': 2,
  '{': 3,
  '<': 4,
}
const openBrackets = Object.keys(variableMapping);

let score = 0;
const autocompleteScores: number[] = [];
mainloop:
for (const line of lines) {
  const pendingClose: string[] = [];
  for (let i = 0; i < line.length; i++) {
    if (openBrackets.includes(line[i])) {
      pendingClose.push(line[i]);
    } else {
      const currentOpen = pendingClose.pop();
      if (currentOpen) {
        const correctClose = variableMapping[currentOpen];
        if (correctClose !== line[i]) {
          score += points[line[i]];
          continue mainloop;
        }
      }
    }
  }
  pendingClose.reverse();
  const autocompleteScore: number = pendingClose.reduce((a, b) => {
    return (a * 5) + autocompletePoints[b];
  }, 0);
  autocompleteScores.push(autocompleteScore);
}

autocompleteScores.sort((a, b) => b - a);
const middleElement = Math.floor((autocompleteScores.length) / 2);

console.log({answerOne: score, answerTwo: autocompleteScores[middleElement]});