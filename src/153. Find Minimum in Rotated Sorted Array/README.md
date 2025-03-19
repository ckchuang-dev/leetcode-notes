# \[M\] 153. Find Minimum in Rotated Sorted Array

## 題目

- [LeetCode 連結](https://leetcode.com/problems/find-minimum-in-rotated-sorted-array)
- **主題**：Binary Search
- **難度**：Medium

## 題目描述

假設有一個長度為 `n` 的陣列，該陣列已按升序排序，並在未知的某個點進行了旋轉。例如，原始陣列 `nums = [0,1,2,4,5,6,7]` 可能變為：

- `[4,5,6,7,0,1,2]`，如果它被旋轉了 4 次。
- `[0,1,2,4,5,6,7]`，如果它被旋轉了 7 次。

注意，將陣列 `[a[0], a[1], a[2], ..., a[n-1]]` 旋轉 1 次會得到陣列 `[a[n-1], a[0], a[1], a[2], ..., a[n-2]]`。

給定一個已排序且旋轉過的陣列 `nums`，其中元素互不相同，請找出此陣列中的最小元素。

你必須設計一個時間複雜度為 O(log n) 的演算法來解決此問題。

### 範例 1

```plain
輸入：nums = [3,4,5,1,2]
輸出：1
解釋：原始陣列為 [1,2,3,4,5]，旋轉了 3 次。
```

### 範例 2

```plain
輸入：nums = [4,5,6,7,0,1,2]
輸出：0
解釋：原始陣列為 [0,1,2,4,5,6,7]，旋轉了 4 次。
```

### 範例 3

```plain
輸入：nums = [11,13,15,17]
輸出：11
解釋：原始陣列為 [11,13,15,17]，旋轉了 4 次。
```

### 限制條件

- `n == nums.length`
- `1 <= n <= 5000`
- `-5000 <= nums[i] <= 5000`
- 所有 `nums` 中的整數都是唯一的。
- `nums` 已排序並旋轉了 1 到 n 次。

## 提出思路

來練習下 binary search 的題目，思路會像是這樣：

1. 設定左右指標 `left` 和 `right`，分別指向陣列的開頭和結尾。
2. 當 `left` 小於 `right` 時，執行以下步驟：
   - 計算中間指標 `mid`。
   - 如果 `nums[mid]` 大於 `nums[right]`，表示最小值位於右半部分，將 `left` 設為 `mid + 1`。
   - 否則，最小值位於左半部分或就是 `mid`，將 `right` 設為 `mid`。
3. 當迴圈結束時，`left` 和 `right` 會指向最小值的位置，返回 `nums[left]` 即可。

## 實作

```ts
function findMin(nums: number[]): number {
    let l = 0;
    let r = nums.length - 1;

    while (l < r) {
        let m = l + Math.floor((r - l) / 2);
        if (nums[m] < nums[r]) {
            r = m;
        } else {
            l = m + 1;
        }
    }

    return nums[l];
};
```

## 複雜度分析

- **時間複雜度**：迴圈中使用了 binary search 進行，時間複雜度為 `O(log n)`。
- **空間複雜度**：只使用了常數額外空間，空間複雜度為 `O(1)`。
