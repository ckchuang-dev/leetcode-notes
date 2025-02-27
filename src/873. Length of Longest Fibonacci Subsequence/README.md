# [M] 873. Length of Longest Fibonacci Subsequence

## 題目

- [LeetCode 連結](https://leetcode.com/problems/length-of-longest-fibonacci-subsequence/)
- **主題**：Array, DP, Hash Table
- **難度**：Medium (Rating: 1911)
- **Daily**：2025-02-27

## 題目描述

如果序列 `X_1, X_2, ..., X_n` 滿足下列條件，就稱它為 Fibonacci 數列：

- `n >= 3`
- 對於所有 `i + 2 <= n`，都有 `X_i + X_{i+1} = X_{i+2}`

給定一個嚴格遞增的正整數數組 `arr`，找到 `arr` 中最長的 Fibonacci 子序列的長度。如果不存在，返回 `0`。

### 範例 1

```plain
輸入：arr = [1,2,3,4,5,6,7,8]
輸出：5
解釋：最長的 Fibonacci 子序列為：[1,2,3,5,8]。
```

### 範例 2

```plain
輸入：arr = [1,3,7,11,12,14,18]
輸出：3
解釋：最長的 Fibonacci 式子序列有：
[1,11,12]，[3,11,14] 和 [7,11,18]。
```

### 限制條件

- `3 <= arr.length <= 1000`
- `1 <= arr[i] < arr[i + 1] <= 10^9`

## 問題釐清

在這道題目中，我們需要在給定的嚴格遞增數組中找到最長的斐波那契式子序列。斐波那契式子序列的定義是，對於任意連續的三個元素 `X_i, X_{i+1}, X_{i+2}`，滿足 `X_i + X_{i+1} = X_{i+2}`。需要注意的是，子序列不要求是連續的，但必須保持原有的順序。

## 提出思路

知道應該可以用 DP 解，但難度有點高第一次做沒想到怎麼做，參考了花花酱的[解說影片](https://www.youtube.com/watch?v=Py3Jj0M1McY)來理解演算法，才了解到要做二維版本的 DP。

也紀錄幾個關鍵點：

- 一個最小的 Fibonacci 序列會需要 3 個數，假設為 i, j, k，且大小關係是 `i < j < k`
- 若原陣列表示為 `A`、長度為 `n`
- 用一個長度 `n` 的二維陣列 `dp` 來記錄，其中 `dp[j][k]` 代表以 `A[j]` 和 `A[k]` 結尾的最長 Fibonacci 子序列長度
- `dp` 一開始的值都初始化為 2，因為至少一定有這兩個元素，若最後最大長度為 2 代表無解
- 當今天可以找到 `A[k] - A[j] = A[i]`，且這個 `A[i]` 存在於 `A` 中，則可以對 DP 陣列做累加，`dp[j][k] = dp[i][j] + 1` 做累加 (加上 `k` 這個長度)

## 實作

```ts
function lenLongestFibSubseq(arr: number[]): number {
  const n = arr.length;
  const numToIndexMap = new Map<number, number>();

  // 宣告一個二維的 DP 陣列
  // dp[j][k] 代表以 A[j] 和 A[k] 結尾的最長 Fibonacci 子序列
  // 因為至少一定有這兩個元素，所以初始長度皆為 2
  // 若最後最大長度為 2 代表無解
  const dp = Array.from({ length: n }, () =>
    Array.from({ length: n }, () => 2)
  );
  let maxLen = 2;

  // 假設 i < j < k，目標要找到 A[i] + A[j] = A[k]
  // 也就是說當 A[k] - A[j] 算出的值存在於 A 中
  // 則可以對 dp[j][k] = dp[i][j] + 1 做累加 (加上 k 這個長度)
  for (let j = 0; j < n; j++) {
    numToIndexMap.set(arr[j], j);

    for (let k = j + 1; k < n; k++) {
      const diff = arr[k] - arr[j];

      if (diff > arr[j]) {
        continue;
      }

      const i = numToIndexMap.get(diff);

      if (i === undefined || i >= j) {
        continue;
      }

      dp[j][k] = dp[i][j] + 1;
      maxLen = Math.max(maxLen, dp[j][k]);
    }
  }

  return maxLen > 2 ? maxLen : 0;
}
```

複雜度分析：

- 時間複雜度：跑兩層迴圈為 `O(n^2)`
- 空間複雜度：另外宣告一個二維的 DP 陣列與一個 hash map，因此最長為 `O(n^2)`
