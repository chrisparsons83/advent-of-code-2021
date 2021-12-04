import * as fs from 'fs';

const binaryNumbers: string[] = fs.readFileSync('./input.txt').toString().split("\n")

const numberOfEntries = binaryNumbers.length;
const numberOfOnes = new Array(binaryNumbers[0].length).fill(0);

for (let i = 0, j = numberOfEntries; i < j; i += 1) {
  for (let k = 0, l = numberOfOnes.length; k < l; k += 1) {
    numberOfOnes[k] += +binaryNumbers[i].slice(k, k + 1);
  }
}

const gamma = numberOfOnes.reduce((a, b) => {
  return (b / numberOfEntries) >= 0.5 ? a + '1' : a + '0';
}, '');
const epsilon = numberOfOnes.reduce((a, b) => {
  return (b / numberOfEntries) < 0.5 ? a + '1' : a + '0';
}, '');

console.log({gamma, epsilon});

const power = Number.parseInt(gamma, 2) * Number.parseInt(epsilon, 2);
console.log({power});

let filteredEntries = [...binaryNumbers];

const filterFirstDigit = (values: string[], firstDigit: string, position: number): string[] => {
  return values.filter(x => x.substring(position, position + 1) === firstDigit);
}

// Oxygen
let position = 0;
while (filteredEntries.length > 1) {
  const zeroFiltered = filterFirstDigit(filteredEntries, '0', position);
  const oneFiltered = filterFirstDigit(filteredEntries, '1', position);

  if (oneFiltered.length < zeroFiltered.length) {
    filteredEntries = zeroFiltered;
  } else {
    filteredEntries = oneFiltered;
  }

  position++;
}
const oxygenGenerator = Number.parseInt(filteredEntries[0], 2)

// co2 scrubber
position = 0;
filteredEntries = [...binaryNumbers];
while (filteredEntries.length > 1) {
  const zeroFiltered = filterFirstDigit(filteredEntries, '0', position);
  const oneFiltered = filterFirstDigit(filteredEntries, '1', position);

  if (oneFiltered.length < zeroFiltered.length) {
    filteredEntries = oneFiltered;
  } else {
    filteredEntries = zeroFiltered;
  }

  position++;
}

const co2scrubber = Number.parseInt(filteredEntries[0], 2)

console.log({co2scrubber, oxygenGenerator, answer: co2scrubber * oxygenGenerator});