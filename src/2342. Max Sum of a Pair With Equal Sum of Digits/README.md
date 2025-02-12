# [M] 2342. 相同數位和的數對的最大和 (Max Sum of a Pair With Equal Sum of Digits)

## 題目

- [LeetCode 連結](https://leetcode.com/problems/max-sum-of-a-pair-with-equal-sum-of-digits/)
- **主題**：Hash Table, Sorting
- **難度**：Medium
- **Daily**：2025-02-12

## 題目描述

給定一個 **0 索引** 的數組 `nums`，其中包含正整數。你可以選擇兩個不同的索引 `i` 和 `j` (`i ≠ j`)，並且 `nums[i]` 和 `nums[j]` 的數位和相等。

請返回滿足條件的數對 `(nums[i], nums[j])` 的最大總和。如果找不到任何符合條件的數對，則返回 `-1`。

### 範例 1

```
輸入：nums = [18,43,36,13,7]
輸出：54
說明：
符合條件的數對為：
- (0, 2)，因為 18 和 36 的數字總和皆為 9，且其總和為 18 + 36 = 54。
- (1, 4)，因為 43 和 7 的數字總和皆為 7，且其總和為 43 + 7 = 50。
所以最大可獲得的總和為 54。
```

### 範例 2

```
輸入：nums = [10,12,19,14]
輸出：-1
說明：
沒有符合條件的數對，所以返回 -1。
```

### 限制條件

- `1 <= nums.length <= 10^5`
- `1 <= nums[i] <= 10^9`

---

## 提出思路

- 跑一個 for loop 去計算每個數字的每位數和
- 使用一個 hash map 去紀錄，以 sum 為 key、以符合的數存到陣列中
- 再對 hash map 的值跑三層迴圈去計算最大總和 (暫時沒想到的直覺暴力解)

## 實作 1. 暴力解

```ts
function maximumSum(nums: number[]): number {
  // declare hash map
  const sumDigitsToNumber: Record<number, number[]> = {};
  let max = -1;

  // run a for loop to calculate sum of digits, push into hash map
  for (let num of nums) {
    let sum = 0;
    let currentNum = num;

    while (currentNum > 0) {
      sum += currentNum % 10;
      currentNum = Math.floor(currentNum / 10);
    }
    if (sumDigitsToNumber[sum]) {
      sumDigitsToNumber[sum].push(num);
    } else {
      sumDigitsToNumber[sum] = [num];
    }
  }

  // check each combination sum, return the max
  for (let numbers of Object.values(sumDigitsToNumber)) {
    if (numbers.length < 2) {
      continue;
    }

    for (let i = 0; i < numbers.length - 1; i++) {
      for (let j = i + 1; j < numbers.length; j++) {
        max = Math.max(max, numbers[i] + numbers[j]);
      }
    }
  }

  return max;
}
```

這個解法的時間複雜度有點過高，因為最後計算最大值時用了三層迴圈。

## 實作 2. 一個迴圈邊算邊取代最大值

後來研究了下其他更有效率的解法，發現有個比較聰明的方式是可以在 key 存在時就去計算最大值，而 hash map 的 value 只要存當前最大值即可，就能省去重複的問題：

```ts
function maximumSum(nums: number[]): number {
  // declare hash map
  const sumToMaxNum: Record<number, number> = {};
  let maxSum = -1;

  // run a for loop to calculate sum of digits, push into hash map
  for (let num of nums) {
    let digitsSum = 0;
    let remaining = num;

    // sum up each digit
    while (remaining > 0) {
      digitsSum += remaining % 10;
      remaining = Math.floor(remaining / 10);
    }

    // pair exist, calculate max sum
    if (sumToMaxNum[digitsSum]) {
      maxSum = Math.max(maxSum, num + sumToMaxNum[digitsSum]);
    }

    // replace max num if needed
    sumToMaxNum[digitsSum] = Math.max(num, sumToMaxNum[digitsSum] ?? 0);
  }

  return maxSum;
}
```
