// 1, 4 (4*1), 8 (4*2), 12 (4*3), 16 (4*4), 20 (4*5)
// 1 + (4 * 1) + (4 * 2) + ... + (4 * (n - 1))
// = 1 + 4 * ((1 + (n - 1)) * (n - 1)) / 2
// = 1 + 2 * (n − 1) * n

function coloredCells(n: number): number {
  let sum = 1;

  for (let i = 1; i < n; i++) {
    sum += 4 * i;
  }

  return sum;
}

function coloredCells2(n: number): number {
  return 1 + 2 * (n - 1) * n;
}
