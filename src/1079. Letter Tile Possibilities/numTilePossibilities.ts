// Time: O(n*n!)
// Space: O(n*n!)
function numTilePossibilities(tiles: string): number {
  // 為了排除重複序列，使用 set 來記錄找到的組合
  const sequences = new Set<string>();
  const tileUsed = Array.from({ length: tiles.length }, () => false);

  // 實作 backtracking 遞迴
  const backtrack = (currentStr: string) => {
    sequences.add(currentStr);

    // 依照 tiles 長度跑一個 for 迴圈
    for (let i = 0; i < tiles.length; i++) {
      // 使用 used 陣列確認當前字母是否被使用過，若有則跳過
      if (tileUsed[i]) continue;

      tileUsed[i] = true;
      backtrack(`${currentStr}${tiles[i]}`);
      tileUsed[i] = false;
    }
  };

  // 從空字串開始做 backtracking
  backtrack('');

  // 回傳 set size, 減掉一開始的空字串長度
  return sequences.size - 1;
}

// ----

// Time: O(2^n)
// Space: O(n)
const numTilePossibilitiesBetter = (tiles: string): number => {
  const UPPER_CASE_LEN = 26;
  const CHAR_CODE_OFFSET = 'A'.charCodeAt(0);
  const charToNum = Array.from({ length: UPPER_CASE_LEN }, () => 0);

  // 先用一個迴圈計算每個出現字母的 hashing
  for (let tile of tiles) {
    charToNum[tile.charCodeAt(0) - CHAR_CODE_OFFSET] += 1;
  }

  const findTotalByHash = (charToNum: number[]): number => {
    let total = 0;

    for (let i = 0; i < UPPER_CASE_LEN; i++) {
      if (charToNum[i] === 0) continue;

      total++;
      charToNum[i]--;
      total += findTotalByHash(charToNum);
      charToNum[i]++;
    }

    return total;
  };

  return findTotalByHash(charToNum);
};
