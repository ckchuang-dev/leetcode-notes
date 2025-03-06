function findMissingAndRepeatedValues(grid: number[][]): number[] {
  // get n
  const n = grid.length;

  // declare an array to record each integer counts
  const integerCounts = Array.from({ length: n * n + 1 }, () => 0);
  const result = [0, 0];

  // for loop to check counts
  for (let gridRow of grid) {
    for (let num of gridRow) {
      integerCounts[num]++;
      if (integerCounts[num] === 2) {
        result[0] = num;
      }
    }
  }

  // for loop to check which missing
  for (let i = 1; i <= n * n; i++) {
    if (integerCounts[i] === 0) {
      result[1] = i;
      break;
    }
  }
  // return result
  return result;
}
