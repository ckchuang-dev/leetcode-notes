# \[E\] 2965. Find Missing and Repeated Values

## 題目

- [LeetCode 連結](https://leetcode.com/problems/find-missing-and-repeated-values)
- **主題**：Array、Math
- **難度**：Easy (Rating: 1244)
- **Daily**：2025-03-06

## 題目描述

給定一個 0 索引的二維整數矩陣 `grid`，其大小為 `n * n`，值的範圍在 `[1, n^2]`。每個整數恰好出現一次，除了某個數字 `a` 出現了兩次，並且某個數字 `b` 缺失。

題目的主要任務是找到這個重複的數字 `a` 和缺失的數字 `b`。

請返回一個大小為 2 的 0 索引整數數組 `ans`，其中 `ans[0]` 等於 `a`，`ans[1]` 等於 `b`。

### 範例 1

```plain
輸入：grid = [[1,3],[2,2]]
輸出：[2,4]
解釋：數字 2 重複出現，數字 4 缺失，因此答案是 [2,4]。
```

### 範例 2

```plain
輸入：grid = [[9,1,7],[8,9,2],[3,4,6]]
輸出：[9,5]
解釋：數字 9 重複出現，數字 5 缺失，因此答案是 [9,5]。
```

### 限制條件

- `2 <= n == grid.length == grid[i].length <= 50`
- `1 <= grid[i][j] <= n * n`
- 對於所有 `1 <= x <= n * n`，恰好有一個 `x` 不等於任何 `grid` 的元素。
- 對於所有 `1 <= x <= n * n`，恰好有一個 `x` 等於 `grid` 的兩個元素。
- 除了兩個數字外，對於所有 `1 <= x <= n * n`，存在恰好一對 `i, j` 滿足 `0 <= i, j <= n - 1` 且 `grid[i][j] == x`。

---

## 解題思路

沒想到什麼太特別的解法，直覺就是雙層迴圈跑過整個 grid 並做 hash map 計數，因為值剛好是 `1~ n^2` 也可以先宣告一個陣列拿索引當 key 在記憶體使用上會更有效率。

## 實作

```ts
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
```

- 時間複雜度：`O(n^2)`
- 空間複雜度：`O(n^2)`

## 其他解法

看到官方解法在空間上還可以利用推導數學公式來將空間降到 `O(1)`，跟演算法比較沒關就先不研究了，感覺不是太有價值回頭刷的一題。
