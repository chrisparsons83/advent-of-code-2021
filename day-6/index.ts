import * as fs from 'fs';

const lanternfishAges: number[] = fs.readFileSync('./input.txt').toString().split(",").map(x => Number.parseInt(x));
const lanternfishAgesTwo: number[] = fs.readFileSync('./input.txt').toString().split(",").map(x => Number.parseInt(x));




const DAYS_TO_SIMULATE = 9;
for (let i = 0; i < DAYS_TO_SIMULATE; i++) {
  for (let j = 0, k = lanternfishAges.length; j < k; j++) {
    if (lanternfishAges[j] === 0) {
      lanternfishAges[j] = 6;
      lanternfishAges.push(8);
    } else {
      lanternfishAges[j]--;
    }
  }
  // console.log({i, count: lanternfishAges.length});
}
console.log({count: lanternfishAges.length});



const DAYS_TO_SIMULATE_TWO = 256;
const lanternfishAgeMap: number[] = new Array(9).fill(0);
for (let i = 0; i < lanternfishAgesTwo.length; i++) {
  lanternfishAgeMap[lanternfishAgesTwo[i]]++;
}

for (let i = 0; i < DAYS_TO_SIMULATE_TWO; i++) {
  const newLaternfish = lanternfishAgeMap.shift();

  if (typeof newLaternfish === 'undefined') break;

  lanternfishAgeMap[6] += newLaternfish;
  lanternfishAgeMap.push(newLaternfish);
  //console.log({i, answerTwo: lanternfishAgeMap.reduce((a, b) => a + b, 0)});
}

const answerTwo = lanternfishAgeMap.reduce((a, b) => a + b, 0);
console.log({answerTwo});