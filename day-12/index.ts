import * as fs from 'fs';

const paths: [string, string][] = fs.readFileSync('./input.txt').toString().split("\n").map(x => x.split('-') as [string, string]);

console.log({paths});

const isSmallCave = (path: string): boolean => {
  return path === path.toLowerCase();
}

const recPath = (currentPoint: string, visitedSmallCaves: string[]): number => {
  if (currentPoint === 'end') return 1;
  if (visitedSmallCaves.includes(currentPoint)) return 0;

  if (isSmallCave(currentPoint)) visitedSmallCaves.push(currentPoint);

  const pathsToVisit = paths.filter(x => x[0] === currentPoint || x[1] === currentPoint);
  
  let pathsToEnd = 0;
  for (const currentPath of pathsToVisit) {
    const nextPoint = currentPath.find(x => x !== currentPoint);
    if (!nextPoint) continue;
    pathsToEnd += recPath(nextPoint, [...visitedSmallCaves]);
  }

  return pathsToEnd;
}

const recPathTwo = (currentPoint: string, visitedSmallCaves: string[], hasDoubleVisit: boolean): number => {
  if (currentPoint === 'start' && visitedSmallCaves.length > 0) return 0;
  if (currentPoint === 'end') return 1;
  if (visitedSmallCaves.includes(currentPoint)) {
    if (hasDoubleVisit) return 0;
    hasDoubleVisit = true;
  }

  if (isSmallCave(currentPoint)) visitedSmallCaves.push(currentPoint);

  const pathsToVisit = paths.filter(x => x[0] === currentPoint || x[1] === currentPoint);
  
  let pathsToEnd = 0;
  for (const currentPath of pathsToVisit) {
    const nextPoint = currentPath.find(x => x !== currentPoint);
    if (!nextPoint) continue;
    pathsToEnd += recPathTwo(nextPoint, [...visitedSmallCaves], hasDoubleVisit);
  }

  return pathsToEnd;
}

const answerOne = recPath('start', []);
const answerTwo = recPathTwo('start', [], false);

console.log({answerOne, answerTwo});