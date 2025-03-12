# \[E\] 2529. Maximum Count of Positive Integer and Negative Integer

## 題目

- [LeetCode 連結](https://leetcode.cn/problems/maximum-count-of-positive-integer-and-negative-integer/)
- **主題**：Binary Search
- **難度**：Easy (Rating: 1195)
- **Daily**：2025-03-12

## 題目描述

給定一個按非遞減順序排列的陣列 `nums`，請返回正整數數目和負整數數目中的最大值。

換句話說，如果 `nums` 中正整數的數目是 `pos`，而負整數的數目是 `neg`，則返回 `pos` 和 `neg` 兩者中的最大值。

注意：`0` 既不是正整數也不是負整數。

### 範例 1

```plain
輸入：nums = [-2, -1, -1, 1, 2, 3]
輸出：3
解釋：共有 3 個正整數和 3 個負整數。計數得到的最大值是 3。
```

### 範例 2

```plain
輸入：nums = [-3, -2, -1, 0, 0, 1, 2]
輸出：3
解釋：共有 2 個正整數和 3 個負整數。計數得到的最大值是 3。
```

### 範例 3

```plain
輸入：nums = [5, 20, 66, 1314]
輸出：4
解釋：共有 4 個正整數和 0 個負整數。計數得到的最大值是 4。
```

### 限制條件

- `1 <= nums.length <= 2000`
- `-2000 <= nums[i] <= 2000`
- `nums` 按非遞減順序排列

## 提出思路

最直覺的想法是可以跑一個迴圈然後分別對正負數計數回傳兩者的最大值即可，但這樣會是 `O(n)` 的時間複雜度而且浪費掉了題目原本就有「非遞減排序」的優勢。

如果嘗試用 binary search 來做的話就可以把時間複雜度壓到 `O(log n)`：

```ts
function binarySearch(nums: number[], target: number): number {
  let left = 0,
    right = nums.length;

  while (left < right) {
    let mid = Math.floor((left + right) / 2);
    if (nums[mid] < target) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }
  return left;
}

function maximumCountBinarySearch(nums: number[]): number {
  let posIndex = binarySearch(nums, 1);
  let positives = nums.length - posIndex;
  let negIndex = binarySearch(nums, 0);
  let negatives = negIndex;

  return Math.max(positives, negatives);
}
```
