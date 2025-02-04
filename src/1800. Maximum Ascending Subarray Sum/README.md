# [E] 1800. 最大遞增子陣列總和 (Maximum Ascending Subarray Sum)

## 題目

- [LeetCode 連結](https://leetcode.com/problems/maximum-ascending-subarray-sum)
- **主題**：Array
- **難度**：Easy

## 題目描述

給定一個由正整數組成的陣列 `nums`，請回傳 `nums` 中 **遞增子陣列** 的最大總和。**子陣列** 定義為陣列中連續的一段數字序列。

如果一個子陣列 `[nums[l], nums[l+1], ..., nums[r-1], nums[r]]` 滿足條件 `nums[i] < nums[i+1]`（對於所有 `l <= i < r`），則該子陣列為**遞增子陣列**。特別地，大小為 `1` 的子陣列視為遞增的。

### 範例 1

```plain
輸入：nums = [10,20,30,5,10,50]
輸出：65
說明：[5,10,50] 是總和最大的遞增子陣列，其總和為 65。
```

### 範例 2

```plain
輸入：nums = [10,20,30,40,50]
輸出：150
說明：[10,20,30,40,50] 是總和最大的遞增子陣列，其總和為 150。
```

### 範例 3

```plain
輸入：nums = [12,17,15,13,10,11,12]
輸出：33
說明：[10,11,12] 是總和最大的遞增子陣列，其總和為 33。
```

### 限制條件

- `1 <= nums.length <= 100`
- `1 <= nums[i] <= 100`

---

## 提出思路

跟 3105 的思路有點像，這題要找遞增子陣列，直覺可以用差不多的解法，去兩兩確認是否有遞增關係，有則對當前子陣列加總，並與當前最大值比對。

以註解表示以上的思路：

```ts
function maxAscendingSum(nums: number[]): number {
  // declare max sum and current substring sum
  // run a for loop to check ascending sum
  // check if current num and prev num are in ascending order
  // return final result
}
```

## 實作

```ts
function maxAscendingSum(nums: number[]): number {
  // declare max sum and current substring sum
  let max = nums[0];
  let currentSum = nums[0];

  // run a for loop to check ascending sum
  for (let i = 1; i < nums.length; i++) {
    // check if current num and prev num are in ascending order
    if (nums[i] > nums[i - 1]) {
      currentSum += nums[i];
    } else {
      max = Math.max(max, currentSum);
      currentSum = nums[i];
    }
  }

  // return final result
  return Math.max(max, currentSum);
}
```

## 複雜度分析

- 時間複雜度：`O(n)`，只用了一個迴圈
- 空間複雜度：`O(1)`，只用了常數變數
