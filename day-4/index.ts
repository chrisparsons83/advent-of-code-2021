import * as fs from 'fs';

type BingoRow = [number, number, number, number, number];
type BingoCard = [BingoRow,BingoRow,BingoRow,BingoRow,BingoRow];

const checkBingo = (bingoCard: BingoCard): boolean => {
  for (let i = 0; i < 5; i++) {
    if (bingoCard[i].reduce((a, b) => a + b, 0) === -5) return true;
    if (bingoCard.map(x => x[i]).reduce((a, b) => a + b, 0) === -5) return true;
  }
  return false;
}

const rawData: string[] = fs.readFileSync('./input.txt').toString().split("\n");

const bingoNumbers: number[] = rawData[0].split(',').map(x => +x);
const bingoCards: BingoCard[] = [];

for (let i = 2; i < rawData.length; i += 6) {
  const bingoCard = [];
  for (let j = 0; j < 5; j++) {
    const bingoRow = rawData[i + j].trim().split(/\s+/).map(x => +x) as BingoRow;
    bingoCard.push(bingoRow);
  }
  bingoCards.push(bingoCard as BingoCard);
}

console.log({bingoNumbers});
console.log({bingoCard: bingoCards[0]})

let currentBingoLength = +Infinity;
let currentAnswer = 0;

for (const bingoCard of bingoCards) {
  for (let i = 0; i < bingoNumbers.length; i++) {
    if (i >= currentBingoLength) break;

    // Mark Number by switching to -1
    for (let j = 0; j < 5; j++) {
      const numberIndex = bingoCard[j].indexOf(bingoNumbers[i]);
      if (numberIndex !== -1) bingoCard[j][numberIndex] = -1;
    }
    // If Bingo, then set currentBingoLength and currentAnswer
    if (checkBingo(bingoCard)) {
      currentBingoLength = i;
      const totalRemaining = bingoCard.flat().filter(x => x !== -1).reduce((a, b) => a + b, 0);
      currentAnswer = totalRemaining * bingoNumbers[i];
    }
  }
}
console.log({currentAnswer});

currentBingoLength = -Infinity;
currentAnswer = 0;
parttwoloop:
for (const bingoCard of bingoCards) {
  for (let i = 0; i < bingoNumbers.length; i++) {
    // Mark Number by switching to -1
    for (let j = 0; j < 5; j++) {
      const numberIndex = bingoCard[j].indexOf(bingoNumbers[i]);
      if (numberIndex !== -1) bingoCard[j][numberIndex] = -1;
    }
    // If Bingo, then set currentBingoLength and currentAnswer
    if (checkBingo(bingoCard)) {
      if (currentBingoLength < i) {
        currentBingoLength = i;
        console.log('Found a bingo!');
        console.log(bingoCard);
        const totalRemaining = bingoCard.flat().filter(x => x !== -1).reduce((a, b) => a + b, 0);
        currentAnswer = totalRemaining * bingoNumbers[i];
      }

      continue parttwoloop;
    }
  }
}
console.log({currentAnswer});