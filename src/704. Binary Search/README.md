# [E] 704. 二分搜尋法 (Binary Search)

## 題目

- [LeetCode 連結](https://leetcode.com/problems/binary-search/description/)
- 題目類型：Binary Search
- 難度：Easy

## 題目描述

給定一個 **升冪排序** 的整數陣列 `nums` 和一個整數目標值 `target`，請你實作一個函式來搜尋 `target` 是否存在於 `nums` 中。如果存在，則回傳其索引；否則回傳 `-1`。

你必須設計一個時間複雜度為 **O(log n)** 的演算法。

### 範例 1

```plain
輸入: nums = [-1,0,3,5,9,12], target = 9
輸出: 4
說明: 9 存在於陣列 nums 中，且其索引為 4。
```

### 範例 2

```plain
輸入: nums = [-1,0,3,5,9,12], target = 2
輸出: -1
說明: 2 不存在於陣列 nums 中，因此回傳 -1。
```

### **限制條件**

- `1 <= nums.length <= 10^4`
- `-10^4 < nums[i], target < 10^4`
- 陣列 `nums` 中的所有整數皆 **唯一**。
- 陣列 `nums` 已依照 **升冪** 排序。

## 提出思路

題目蠻單純的，就是做 binary search 演算法的基礎練習，binary search 蠻適合用在**已經排序好**的陣列找資料，實作的思路如下：

- 設定左右指標
- 跑一個 while 迴圈直到 left > right
  - 計算中間 index 值
  - 因為是已排序的陣列，可以直接去比對目標值在中間、左邊、右邊
    - 中間：找到，回傳當前 index
    - 左邊：移動右邊指標，反之
- 迴圈跳出代表找不到則為傳 -1

## 實作

```ts
function binarySearch(nums: number[], target: number): number {
  // declare left and right
  let left = 0;
  let right = nums.length - 1;

  // run a while loop when left position smaller than right
  while (left <= right) {
    const mid = left + Math.floor((left + right) / 2);

    if (nums[mid] === target) {
      return mid;
    }

    // move left or right pointer
    if (nums[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  // return when not found
  return -1;
}
```

## 撰寫測試

```ts
describe('Basic Binary Search', () => {
  test.each([
    [[-1, 0, 3, 5, 9, 12], 9, 4],
    [[-1, 0, 3, 5, 9, 12], 2, -1],
    [[1], 1, 0],
    [[1, 3, 5, 7, 9], 7, 3],
    [[], 10, -1]
  ])('should return %s for search(%s, %s)', (nums, target, expected) => {
    expect(binarySearch(nums, target)).toBe(expected);
  });
});
```

## 複雜度分析

- 時間複雜度：`O(logN)`，因為每次搜尋時都直接減半
- 空間複雜度：`O(1)`，額外使用的變數為定值
