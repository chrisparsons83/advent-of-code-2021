import { SSL_OP_NO_SESSION_RESUMPTION_ON_RENEGOTIATION } from 'constants';
import * as fs from 'fs';

type DisplayRow = {
  signalPatterns: string[];
  outputValues: string[];
}

const display: DisplayRow[] = fs.readFileSync('./input.txt').toString().split("\n").map(x => {
  const barPos = x.indexOf("|");
  const signalPatterns = x.substr(0, barPos).trim().split(" ");
  const outputValues = x.substr(barPos + 1).trim().split(" ");
  return {signalPatterns, outputValues};
});

const uniqueLengths = [2, 3, 4, 7];

const answerOne = display.reduce((a, b) => {
  const { outputValues } = b;
  const uniqueNumbers = outputValues.filter(x => uniqueLengths.includes(x.length)).length;
  return a + uniqueNumbers;
}, 0);

const map = {
  0: 6,
  1: 2,
  2: 5,
  3: 5,
  4: 4,
  5: 5,
  6: 6,
  7: 3,
  8: 7,
  9: 6
}

const answerTwo = display.reduce((a, b) => {
  const {signalPatterns, outputValues} = b;
  
  // Figure out the top bar by comparing a 3 length and a 2 length
  const one = signalPatterns.find(x => x.length === 2)?.split("");
  if (!one) return a;
  const seven = signalPatterns.find(x => x.length === 3)?.split("");
  if (!seven) return a;
  const displayTop = seven.find(x => !one.includes(x));

  // Figure out the bottom bar by finding the 6-length that has all the digits of the 4 length
  // then taking out the top that we know
  const four = signalPatterns.find(x => x.length === 4)?.split("");
  if (!four) return a;
  const nine = signalPatterns.filter(x => x.length === 6).find(x => four.every(y => x.split("").includes(y)))?.split("");
  if (!nine) return a;
  const displayBottom = nine.find(x => !four.includes(x) && x !== displayTop);

  // Figure out the 6 and the 0 based on looking at 1.
  const zero = signalPatterns.filter(x => x.length === 6).find(x => !four.every(y => x.split("").includes(y)) && one.every(y => x.split("").includes(y)))?.split("");
  if (!zero) return a;
  const six = signalPatterns.filter(x => x.length === 6).find(x => !four.every(y => x.split("").includes(y)) && !one.every(y => x.split("").includes(y)))?.split("");
  if (!six) return a;

  // Get the left top and left bottom with 6 and 1.
  const displayRightTop = one.find(x => !six.includes(x));
  const displayRightBottom = one.find(x => six.includes(x));

  // Get middle by comparing zero and four
  const displayMiddle = four.find(x => !zero.includes(x));

  const displayLeftTop = four.find(x => ![displayRightTop, displayRightBottom, displayMiddle].includes(x));
  const displayLeftBottom = zero.find(x => ![displayTop, displayBottom, displayLeftTop, displayRightTop, displayRightBottom].includes(x))

  const numberMap: Map<string, string> = new Map();
  numberMap.set([displayTop, displayBottom, displayRightTop, displayRightBottom, displayLeftTop, displayLeftBottom].sort().join(""), '0');
  numberMap.set([displayRightTop, displayRightBottom].sort().join(""), '1');
  numberMap.set([displayTop, displayBottom, displayRightTop, displayMiddle, displayLeftBottom].sort().join(""), '2');
  numberMap.set([displayTop, displayBottom, displayMiddle, displayRightTop, displayRightBottom].sort().join(""), '3');
  numberMap.set([displayRightTop, displayRightBottom, displayMiddle, displayLeftTop].sort().join(""), '4');
  numberMap.set([displayTop, displayBottom, displayRightBottom, displayMiddle, displayLeftTop].sort().join(""), '5');
  numberMap.set([displayTop, displayBottom, displayRightBottom, displayMiddle, displayLeftTop, displayLeftBottom].sort().join(""), '6');
  numberMap.set([displayTop, displayRightTop, displayRightBottom].sort().join(""), '7');
  numberMap.set([displayTop, displayBottom, displayRightTop, displayRightBottom, displayMiddle, displayLeftTop, displayLeftBottom].sort().join(""), '8');
  numberMap.set([displayTop, displayBottom, displayRightTop, displayRightBottom, displayMiddle, displayLeftTop].sort().join(""), '9');

  let resultNumberString = '';
  for (const value of outputValues) {
    const sortedValue = value.split('').sort().join('');
    resultNumberString += numberMap.get(sortedValue);
  }
  
  return a + +resultNumberString;
}, 0)

console.log({answerOne, answerTwo});