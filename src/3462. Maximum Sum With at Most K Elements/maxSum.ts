function maxSum(grid: number[][], limits: number[], k: number): number {
  let max = 0;
  const allMaxNumbers: number[] = [];

  for (let row = 0; row < grid.length; row++) {
    const limit = limits[row];
    const currentRow = [...grid[row]].sort((a, b) => a - b);

    for (let i = 0; i < limit; i++) {
      allMaxNumbers.push(currentRow.pop()!);
    }
  }

  allMaxNumbers.sort((a, b) => a - b);

  for (let i = 0; i < k; i++) {
    max += allMaxNumbers.pop()!;
  }

  return max;
}
