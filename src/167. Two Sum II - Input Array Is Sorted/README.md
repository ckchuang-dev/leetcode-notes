# \[M\] 167. Two Sum II - Input Array Is Sorted

## 題目

- [LeetCode 連結](https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/)
- **主題**：Array, Two Pointers, Binary Search
- **難度**：Medium (以前好像是 Easy)

## 題目描述

給定一個從 1 開始索引的整數數組 `numbers`，該數組已按非遞減順序排列，請你從數組中找出滿足相加之和等於目標數 `target` 的兩個數，並返回這兩個數的下標值，作為長度為 2 的整數數組 `[index1, index2]`。

測試用例生成的數據保證只存在唯一的解，且你不能重複使用數組中的同一個元素。

你的解決方案必須只使用常量級別的額外空間。

### 範例 1

```plain
輸入：numbers = [2,7,11,15], target = 9
輸出：[1,2]
解釋：2 與 7 相加等於目標數 9。因此 index1 = 1, index2 = 2。
```

### 範例 2

```plain
輸入：numbers = [2,3,4], target = 6
輸出：[1,3]
解釋：2 與 4 相加等於目標數 6。因此 index1 = 1, index2 = 3。
```

### 範例 3

```plain
輸入：numbers = [-1,0], target = -1
輸出：[1,2]
解釋：-1 與 0 相加等於目標數 -1。因此 index1 = 1, index2 = 2。
```

### 限制條件

- `2 <= numbers.length <= 3 * 10^4`
- `-1000 <= numbers[i] <= 1000`
- `numbers` 按非遞減順序排列
- `-1000 <= target <= 1000`

- 只存在唯一一組符合條件的答案

## 問題釐清

- 數列中是否可能會有重複元素，雖然不影響解題
- 若沒有提供限制條件
  - 數列長度是否一定大於 2，是否需處理邊界條件
  - 想了解數列的最大長度
  - 數列是否可能存在多組解符合相加為 target
  - 是否一定存在解，如果找不到解回傳什麼？
- **注意：**題目要求解決方案必須只使用 `O(1)` 的額外空間

## 提出思路

最直接的去暴力解的話，可以是雙層迴圈，依序用每個數去跟剩下的數相加確認是否等於 target，雖然空間複雜度為 `O(1)`，但時間複雜度會到 `O(n)`，效率不高。

因為數列已經是由小到大排序過，所以可以嘗試用 two pointer 來限縮範圍：

- 宣告 left 指向最左邊、right 指向最右邊
- 跑一個 while 迴圈直到 left ≥ right
  - 檢查當前指到的數相加與 target 的大小關係
    - 比 target 大，則 right 左移
    - 比 target 小，則 left 左移
    - 相等時，直接回傳 `[left + 1, right + 1]`
- 預期時間複雜度會在 `O(n)`，而額外使用的空間只有兩個指針所以符合題目要求

## 實作

```ts
function twoSum(numbers: number[], target: number): number[] {
  let left = 0;
  let right = numbers.length - 1;

  while (left < right) {
    const sum = numbers[left] + numbers[right];
    if (sum > target) {
      right--;
    } else if (sum < target) {
      left++;
    } else {
      return [left + 1, right + 1];
    }
  }

  // edge case
  return [];
};
```

## 其他解法探索

參考了 [NeetCode 的教學](https://neetcode.io/solutions/two-sum-ii-input-array-is-sorted)，看起來 two pointer 是本題的最佳解，但其他解法也可以使用 binary search 或 hash map 來解。

hash map 就像是經典第 1 題 Two Sum 的做法用減法來記錄，但會額外使用 `O(n)` 的空間，因此不符合這題要求。

而 binary search 也算適用在這類已排序數列，核心概念像這樣：

- 遍歷當前數列，對每個數計算 `target - num[i]` 的值
- 使用 binary search 的方式在 `i + 1` 到數列最末端中是否存在這個值，找到的話直接返回該索引

但最差狀況時間複雜度會到 `O(N log N)`：

```ts
function twoSumBinarySearch(numbers: number[], target: number): number[] {
  for (let i = 0; i < numbers.length; i++) {
    let l = i + 1
    let r = numbers.length - 1;
    let targetValue = target - numbers[i];

    while (l <= r) {
      let mid = l + Math.floor((r - l) / 2);

      if (numbers[mid] === targetValue) {
        return [i + 1, mid + 1];
      } else if (numbers[mid] < targetValue) {
        l = mid + 1;
      } else {
        r = mid - 1;
      }
    }
  }

  return [];
}
```
