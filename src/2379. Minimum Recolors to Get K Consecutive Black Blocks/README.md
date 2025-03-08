# \[E\] 2379. Minimum Recolors to Get K Consecutive Black Blocks

## 題目

- [LeetCode 連結](https://leetcode.com/problems/minimum-recolors-to-get-k-consecutive-black-blocks)
- **主題**：String、Sliding Window
- **難度**：Easy (Rating: 1360)
- **Daily**：2025-03-08

## 題目描述

給定一個長度為 `n` 的 0 索引字串 `blocks`，其中 `blocks[i]` 為 'W' 或 'B'，分別代表第 `i` 個區塊的顏色是白色或黑色。

同時給定一個整數 `k`，表示期望得到的連續黑色區塊的數量。

在一次操作中，你可以將一個白色區塊重新著色為黑色區塊。

請返回至少出現一次 `k` 個連續黑色區塊所需的最少操作次數。

### 範例 1

```plain
輸入：blocks = "WBBWWBBWBW", k = 7
輸出：3
解釋：
要達到 7 個連續的黑色區塊，可以將第 0、3 和 4 個區塊重新著色，
使得 blocks = "BBBBBBBWBW"。
可以證明，無法以少於 3 次操作達到 7 個連續的黑色區塊。
因此，返回 3。
```

### 範例 2

```plain
輸入：blocks = "WBWBBBW", k = 2
輸出：0
解釋：
已經存在 2 個連續的黑色區塊，因此不需要進行任何更改。
因此，返回 0。
```

### 限制條件

- `n == blocks.length`
- `1 <= n <= 100`
- `blocks[i]` 是 'W' 或 'B'。
- `1 <= k <= n`

## 提出思路

找一個固定長度的子字串的最小操作，直覺可以用 sliding window 來解：

- 假設是用一個 size 為 k 的窗口來確認當前白色字母
- 先以最開頭 k 個去計算後，得到當前需要從白變黑的數量
- 接著用迴圈每次右移 1 位，並去計算移出與移入的字母是黑或白，分別對當前要白變黑的數量加減，再去比對當前最小值
- 最後就能得到所有窗口中的最小操作次數

以註解表示以上的思路：

```ts
function minimumRecolors(blocks: string, k: number): number {
    // apply a sliding window with size k
    // calculate current min operations by current window

    // run a loop to move window and get min operations
        // check head char
        // check tail char
        // check min value

    // return min ops.
}
```

## 實作

```ts
function minimumRecolors(blocks: string, k: number): number {
  // apply a sliding window with size k
  // calculate current min operations by current window
  let currentOperations = blocks
    .slice(0, k)
    .split('')
    .reduce((sum, char) => sum + (char === 'W' ? 1 : 0), 0);
  let minOperations = currentOperations;

  // run a loop to move window and get min operations
  for (let i = k; i < blocks.length; i++) {
    // check head char
    if (blocks[i - k] === 'W') {
      currentOperations--;
    }
    // check tail char
    if (blocks[i] === 'W') {
      currentOperations++;
    }
    // check min value
    minOperations = Math.min(minOperations, currentOperations);
  }

  // return min ops.
  return minOperations;
}
```

複雜度分析：

- 時間複雜度：第一次計算前 `k` 個數量的白色數量耗時 `O(k)`，移動 k 至 n 的窗口的迴圈耗時 `O(n - k)`，因此總計為 `O(n)`
- 空間複雜度：不確定第一次計數時去做 slice、split 的中途操作是否需要計入，如果要的話就會是 `O(k)`，不需要的話就都只有常數變數為 `O(1)`
