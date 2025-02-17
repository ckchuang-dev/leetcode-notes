# [M] 1079. 字母瓷磚的可能排列 (Letter Tile Possibilities)

## 題目

- [LeetCode 連結](https://leetcode.com/problems/letter-tile-possibilities)
- **主題**：Backtracking, Permutation
- **難度**：Medium (Rating 1740)
- **Daily**：2025-02-17

## 題目描述

你有 `n` 個瓷磚，每個瓷磚上都有一個字母 `tiles[i]`。

請返回可以使用這些瓷磚組成的 **非空** 字母序列的數量。

### 範例 1

```plain
輸入：tiles = "AAB"
輸出：8
說明：可能的序列為 "A", "B", "AA", "AB", "BA", "AAB", "ABA", "BAA"。

```

### 範例 2

```plain
輸入：tiles = "AAABBC"
輸出：188

```

### 範例 3

```plain
輸入：tiles = "V"
輸出：1

```

### 限制條件

- `1 <= tiles.length <= 7`
- `tiles` 只包含大寫英文字母。

---

## 思路

因為要找排列組合數量，且限制條件中只到 7，可以用 backtracking 來解，只是比較特別的是可能有重複字母，所以會需要另外排除：

- 使用一個 Set 來記錄所有可能的排列方式，並利用排除重複的特性自動去掉，最後 Set 長度即為所求
- 實作一個 backtracking 函式做遞迴，從空字串為 root 開始累加
  - 每次呼叫時將當前累加字串推入 Set
  - 另外在外層 scope 用一個 boolean array 紀錄 tiles 中每個位置的字母是否被取用中
  - 跑一個迴圈遞迴將累加字串往下一層算
  - 該層遞迴結束後將 boolean array 重置

## 實作

```ts
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
```

## 複雜度分析

若 `n` 代表 `tiles` 長度：

- 時間複雜度：參考下面決策樹的範例，會以每個字母為起點跑 `n` 次，其中每次都會做遞迴為 `n!`，所以整題為 `O(n * n!)`
- 空間複雜度：
  - 遞迴的 call stack 深度最深是 `n`
  - 對 Set 而言，最差狀況每個字母都不重複時會有 `n!` 種結果，且每種結果的長度可能最長到 `n`，因此為 `O(n * n!)`

這一版的實際 backtracking 狀況，以 `AAB` 的例子來說會像這樣的決策樹：

```plain
"" ✅
 ├── "A" ✅
 │   ├── "AA" ✅
 │   │   ├── "AAB" ✅
 │   │
 │   ├── "AB" ✅
 │       ├── "ABA" ✅
 │
 ├── "A" (第二個 A，迴圈有跑到，但因為推入 Set 所以自動排除重複)
 │
 ├── "B" ✅
     ├── "BA" ✅
     │   ├── "BAA" ✅
     │
     ├── "BA" (第二個 A，迴圈有跑到，但因為推入 Set 所以自動排除重複)
```

## 優化

從上面可以發現當字母重複時計算有許多浪費，可以用字母的出現次數做個 hashing 來優化：

```ts
const UPPER_CASE_LEN = 26;
const CHAR_CODE_OFFSET = 'A'.charCodeAt(0);

const numTilePossibilities = (tiles: string): number => {
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
```

### 優化後複雜度分析

- 時間複雜度：
  - 一個迴圈計算字母出現順序 `O(n)`
  - 遞迴決定每個字母的取用與否為 `O(2^n)`
- 空間複雜度：額外使用空間只有一些常數變數、常數 hash，動態的部分為遞迴深度 `O(n)`
