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
