# \[M\] 128. Longest Consecutive Sequence

## 題目

- [LeetCode 連結](https://leetcode.com/problems/longest-consecutive-sequence/description/)
- **主題**：Array, Hash Table, Union Find
- **難度**：Medium

## 題目描述

給定一個未排序的整數陣列 `nums`，請找出其中最長的連續元素序列的長度。

你必須設計並實現時間複雜度為 O(n) 的算法來解決此問題。

### 範例 1

```plain
輸入：nums = [100, 4, 200, 1, 3, 2]
輸出：4
解釋：最長的連續元素序列是 [1, 2, 3, 4]，因此其長度為 4。
```

### 範例 2

```plain
輸入：nums = [0, 3, 7, 2, 5, 8, 4, 6, 0, 1]
輸出：9
```

### 範例 3

```plain
輸入：nums = [1, 0, 1, 2]
輸出：3
```

### 限制條件

- `0 <= nums.length <= 10^5`
- `-10^9 <= nums[i] <= 10^9`

## 問題釐清

- **輸入陣列可能為空**：在這種情況下，輸出應為 0。

## 提出思路

最直覺的做法有兩種，時間複雜度都沒有在 `O(n)` 內：

- 暴力解：雙層迴圈，依序確認當前數字是否有下一位在陣列中，並紀錄長度最大值後輸出，時間複雜度會是 `O(n^2)`
- 排序：由小到大排序後，尋找有連續遞增關係的最長序列，因為用到排序，時間複雜度會是 `O(N log N)`

題目要求演算法要能在時間複雜度 `O(n)` 內，想到一種用空間換時間的方式是把輸入的 `nums` 轉成 Set，並對這個 Set 去遍歷尋找最長序列。

在尋找最長連續序列的實作上，要決定每個序列增長的方向，因此如果當前數不是起點的話就略過，也就是 Set 中仍有 `num - 1` 的存在。一旦找到起點，再用一個 while 迴圈去持續遞增值確認邊界到哪。

## 實作

```ts
function longestConsecutive(nums: number[]): number {
    const numSet = new Set([...nums]);
    let maxLen = 0;

    for (let num of numSet.values()) {
        // 非起點則略過
        if (numSet.has(num - 1)) {
            continue;
        }

        let currentLen = 1;
        let next = num + 1;

        while (numSet.has(next)) {
            currentLen++;
            next++;
        }

        // 找到當前起點的最長序列後，紀錄到最大長度中
        maxLen = Math.max(maxLen, currentLen);
    }

    return maxLen;
};
```

## 複雜度分析

如果 n 是 `nums` 陣列的長度：

- **時間複雜度**：O(n)。因為每個數最多被訪問兩次，一次是確認是否為序列起點，一次是在序列中被檢查是否存在。
- **空間複雜度**：O(n)，需要額外的空間來儲存 `HashSet`。
