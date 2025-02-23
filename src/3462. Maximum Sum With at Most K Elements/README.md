# [M] 3462. Maximum Sum With at Most K Elements

## 題目

- [LeetCode 連結](https://leetcode.com/problems/maximum-sum-with-at-most-k-elements)
- **主題**：Array, Dynamic Programming
- **難度**：Medium (Rating: N/A)
- **Daily**：2025-02-23 單週賽 Q2

## 題目描述

給定一個大小為 `n x m` 的二維整數矩陣 `grid`，一個長度為 `n` 的整數數組 `limits`，以及一個整數 `k`。你的任務是從 `grid` 中選擇最多 `k` 個元素，使得：

- 從 `grid` 的第 `i` 行選取的元素數量不超過 `limits[i]`。

請返回可以獲得的最大總和。

### 範例 1

```plain
輸入：grid = [[1,2],[3,4]], limits = [1,2], k = 2
輸出：7
說明：
從第二行，我們可以選擇最多 2 個元素。選取的元素是 4 和 3。
最多選擇 2 個元素的最大可能總和是 4 + 3 = 7。
```

### 範例 2

```plain
輸入：grid = [[5,3,7],[8,2,6]], limits = [2,2], k = 3
輸出：21
說明：
從第一行，我們可以選擇最多 2 個元素。選取的元素是 7。
從第二行，我們可以選擇最多 2 個元素。選取的元素是 8 和 6。
最多選擇 3 個元素的最大可能總和是 7 + 8 + 6 = 21。
```

### 限制條件

- `n == grid.length == limits.length`
- `m == grid[i].length`
- `1 <= n, m <= 500`
- `0 <= grid[i][j] <= 10^5`
- `0 <= limits[i] <= m`
- `0 <= k <= min(n * m, sum(limits))`

## 提出思路

直覺上有個最暴力的解法就是把所有 row 都排序後，每次 pop 出 limit 個數到一個新的最大值陣列，最後再把最大值陣列做排序，去取出 k 個值相加就完成了，意外地竟然沒有 TLE。

## 實作

```ts
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
```

## 複雜度分析

假如 `N` 代表列數、`M` 代表每列元素個數、`K` 代表 `allMaxNumbers` 陣列長度：

- 時間複雜度：`O(N M log(M) + K log K)`
  - 在雙層迴圈中去排序會是 `O(N M log(M))`
  - 最後對 `allMaxNumbers` 排序為 `O(K log(K))`
- 空間複雜度：`O(N * M + K)`
  - 在雙層迴圈中排序後的新陣列為 `O(N * M)`
  - `allMaxNumbers` 佔用空間為 `K`
