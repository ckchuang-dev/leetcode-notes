# [M] 1749. 任意子陣列和的最大絕對值 (Maximum Absolute Sum of Any Subarray)

## 題目

- [LeetCode 連結](https://leetcode.com/problems/maximum-absolute-sum-of-any-subarray/)
- **主題**：Array, DP, Kadane's algorithm
- **難度**：Medium (Rating: 1541)
- **Daily**：2025-02-26

## 題目描述

給定一個整數陣列 `nums`。一個子陣列 `[nums_l, nums_{l+1}, ..., nums_{r-1}, nums_r]` 的和的絕對值定義為 `abs(nums_l + nums_{l+1} + ... + nums_{r-1} + nums_r)`。

請你找出 `nums` 中任意子陣列的和的最大絕對值，並返回該最大值。

注意，`abs(x)` 的定義如下：

- 如果 `x` 是負整數，則 `abs(x) = -x`。
- 如果 `x` 是非負整數，則 `abs(x) = x`。

### 範例 1

```plain
輸入：nums = [1, -3, 2, 3, -4]
輸出：5
解釋：子陣列 [2, 3] 的和的絕對值為 abs(2 + 3) = abs(5) = 5。
```

### 範例 2

```plain
輸入：nums = [2, -5, 1, -4, 3, -2]
輸出：8
解釋：子陣列 [-5, 1, -4] 的和的絕對值為 abs(-5 + 1 - 4) = abs(-8) = 8。
```

### 限制條件

- `1 <= nums.length <= 10^5`
- `-10^4 <= nums[i] <= 10^4`

---

## 解題思路

看了題目的提示後可以去求出先不管絕對值的問題，分別去做當前索引為結尾的子陣列的最大值、最小值的 DP 陣列累加。因為當前索引要是最大值就會是前面累加數字加了自己後有超過自己的值本身才能繼續累加。

依照這個方式去實作的話會像這樣：

```ts
function maxAbsoluteSum(nums: number[]): number {
  const n = nums.length;
  const dpMaxSum = Array.from({ length: n }, () => 0);
  const dpMinSum = Array.from({ length: n }, () => 0);
  let absMax = Math.abs(nums[0]);

  // 初始化 DP 陣列第一個值
  dpMaxSum[0] = nums[0];
  dpMinSum[0] = nums[0];

  for (let i = 1; i < n; i++) {
    const max = nums[i] + dpMaxSum[i - 1];
    const min = nums[i] + dpMinSum[i - 1];

    // 累加子陣列總和與當前數值相比，求最大、最小值
    dpMaxSum[i] = Math.max(max, nums[i]);
    dpMinSum[i] = Math.min(min, nums[i]);

    // 在同個迴圈中計算絕對值最大值
    absMax = Math.max(absMax, dpMaxSum[i], Math.abs(dpMinSum[i]));
  }

  return absMax;
}
```

複雜度分析：

- 時間複雜度：只有一個迴圈為 `O(n)`
- 空間複雜度：用了兩個長度 `n` 的陣列，因此也是 `O(n)`
