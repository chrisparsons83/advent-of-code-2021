import * as fs from 'fs';

type Instruction = {
  direction: string;
  amount: number;
}

const instructions: Instruction[] = fs.readFileSync('./input.txt').toString().split("\n")
  .map(x => {
    const [direction, amount] = x.split(" ");
    return {
      direction,
      amount: +amount
    }
  });

let depth = 0;
let distance = 0;
let aim = 0;

for (const instruction of instructions) {
  switch (instruction.direction) {
    case 'forward':
      distance += instruction.amount;
      break;
    case 'down':
      depth += instruction.amount;
      break;
    case 'up':
      depth -= instruction.amount;
      break;
  }
}

console.log({depth, distance});
console.log(depth * distance);

depth = 0;
distance = 0;
aim = 0;

for (const instruction of instructions) {
  switch (instruction.direction) {
    case 'down':
      aim += instruction.amount;
      break;
    case 'up':
      aim -= instruction.amount;
      break;
    case 'forward':
      distance += instruction.amount;
      depth += (aim * instruction.amount);
      break;
  }
}

console.log({depth, distance});
console.log(depth * distance);