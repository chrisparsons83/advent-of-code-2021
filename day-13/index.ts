import * as fs from 'fs';

type Point = [number, number];
type Instruction = {
  direction: string;
  line: number;
}

const rawFile: string = fs.readFileSync('./input.txt').toString();
const [rawDots, rawInstructions]: string[] = rawFile.split("\n\n");

let dots: Point[] = rawDots.split("\n").map<Point>(x => x.trim().split(",") as unknown as Point);
const instructions: Instruction[] = rawInstructions.split("\n").map(x => {
  const lastIndex = x.lastIndexOf(" ");
  return {
    direction: x.charAt(lastIndex + 1),
    line: +x.substring(lastIndex + 3),
  }
});

const foldPaper = (points: Point[], instruction: Instruction): Point[] => {
  const tempPoints = [...points];
  for (let i = 0; i < tempPoints.length; i++) {
    if (instruction.direction === 'x') {
      if (tempPoints[i][0] < instruction.line) continue;
      tempPoints[i][0] -= 2 * (tempPoints[i][0] - instruction.line)
    }
    if (instruction.direction === 'y') {
      if (tempPoints[i][1] < instruction.line) continue;
      tempPoints[i][1] -= 2 * (tempPoints[i][1] - instruction.line)
    }
  }
  return [...new Set(tempPoints.map(x => x.join(',')))].map<Point>(x => x.trim().split(",") as unknown as Point);
}

const answerOne = foldPaper(dots, instructions[0]).length;

for (const instruction of instructions) {
  dots = foldPaper(dots, instruction);
}

const answerMatrix = new Array(40).fill(null).map(x => new Array(40));
for (const point of dots) {
  answerMatrix[point[1]][point[0]] = 1;
}

console.log({answerOne})
console.table(answerMatrix);