import * as fs from 'fs';

const rawFile: string = fs.readFileSync('./input.txt').toString();
const [initialPolymerTemplate, rawRules]: string[] = rawFile.split("\n\n");

const rules: Map<string, string> = new Map();
rawRules.split("\n").forEach(x => {
  const [key, value] = x.split(" -> ");
  rules.set(key, value);
});


let rawPolymerTemplate = initialPolymerTemplate;
for (let n = 0; n < 10; n++) {
  for (let i = rawPolymerTemplate.length - 2; i >= 0; i--) {
    const insert = rules.get(`${rawPolymerTemplate[i]}${rawPolymerTemplate[i+1]}`);
    rawPolymerTemplate = rawPolymerTemplate.substring(0, i+1) + insert + rawPolymerTemplate.substring(i+1);
  }
}

let letterFrequency: Map<string, number> = new Map();
for (let i = 0; i < rawPolymerTemplate.length; i++) {
  letterFrequency.set(rawPolymerTemplate[i], (letterFrequency.get(rawPolymerTemplate[i]) || 0) + 1);
}

const answerOne = Math.max(...letterFrequency.values()) - Math.min(...letterFrequency.values());

const answerTwoString = initialPolymerTemplate;
let mapResultsTwo: Map<string, number> = new Map();
// Initial map seeding
for (let i = answerTwoString.length - 2; i >= 0; i--) {
  const twoCharString = `${answerTwoString[i]}${answerTwoString[i+1]}`
  mapResultsTwo.set(twoCharString, (mapResultsTwo.get(twoCharString) || 0) + 1);
}

for (let i = 0; i < 40; i++) {
  const tempMap: Map<string, number> = new Map();
  mapResultsTwo.forEach((value, key) => {
    const insert = rules.get(key);
    if (!insert) return;
    const firstHalf = key.charAt(0) + insert;
    const secondHalf = insert + key.charAt(1);
    tempMap.set(firstHalf, (tempMap.get(firstHalf) || 0) + value);
    tempMap.set(secondHalf, (tempMap.get(secondHalf) || 0) + value);
  })
  mapResultsTwo = new Map(tempMap);
}
const freqTwo: Map<string, number> = new Map();
mapResultsTwo.forEach((value, key) => {
  freqTwo.set(key.charAt(0), (freqTwo.get(key.charAt(0)) || 0) + value);
})
const lastChar = answerTwoString.charAt(answerTwoString.length - 1);
freqTwo.set(lastChar, (freqTwo.get(lastChar) || 0) + 1);

const answerTwo = Math.max(...freqTwo.values()) - Math.min(...freqTwo.values());

console.log({answerOne, answerTwo});

