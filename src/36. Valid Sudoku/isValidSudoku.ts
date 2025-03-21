function isValidSudoku(board: string[][]): boolean {
  const len = board.length;
  const rowSet = Array.from({ length: len }, () => new Set<string>());
  const colSet = Array.from({ length: len }, () => new Set<string>());
  const boxSet = Array.from({ length: len }, () => new Set<string>());

  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len; j++) {
      const val = board[i][j];

      if (val === '.') continue;
      if (rowSet[i].has(val) || colSet[j].has(val)) return false;

      const boxRow = Math.ceil((i + 1) / 3);
      const boxCol = Math.ceil((j + 1) / 3);
      const boxIndex = 3 * (boxRow - 1) + boxCol - 1;

      if (boxSet[boxIndex].has(val)) return false;

      rowSet[i].add(val);
      colSet[j].add(val);
      boxSet[boxIndex].add(val);
    }
  }

  return true;
};