# [M] 2364. Count Number of Bad Pairs

## 題目

- [LeetCode 連結](https://leetcode.com/problems/count-number-of-bad-pairs)
- **主題**：Array, Hash Table, Math
- **難度**：Medium
- **Daily**： 2025-02-09

## 題目描述

給定一個 0-indexed 整數數組 `nums`。當一對索引 `(i, j)` 滿足 `i < j` 且 `j - i != nums[j] - nums[i]` 時，該對 `(i, j)` 是一個 **bad pair**。

請返回 `nums` 中 **bad pairs** 的總數。

### 範例 1

```
輸入：nums = [4,1,3,3]
輸出：5
說明：
- 索引對 (0, 1) 是 bad pair，因為 1 - 0 != 1 - 4。
- 索引對 (0, 2) 是 bad pair，因為 2 - 0 != 3 - 4，2 != -1。
- 索引對 (0, 3) 是 bad pair，因為 3 - 0 != 3 - 4，3 != -1。
- 索引對 (1, 2) 是 bad pair，因為 2 - 1 != 3 - 1，1 != 2。
- 索引對 (2, 3) 是 bad pair，因為 3 - 2 != 3 - 3，1 != 0。
總共有 5 個 bad pairs，因此返回 5。
```

### 範例 2

```
輸入：nums = [1,2,3,4,5]
輸出：0
說明：
沒有 bad pairs，因此返回 0。
```

### 限制條件

- `1 <= nums.length <= 10^5`
- `1 <= nums[i] <= 10^9`

## 提出思路

直接計算 bad pairs 的話直覺只有用兩個迴圈去暴力解來算會花費 `O(n^2)` 時間，看了提示後可以反過來去算 good pairs 嘗試看能不能降低到 `O(n)` 時間內。

bad pair 的算式在調整後也就是 `nums[j] - j !== nums[i] - i`，所以要找到 good pair 就是去找每個 `value - index` 的組合是否大於一組，即可算出組數：

- 算出所有 pairs 數
- 用一個 hash map 來存 `value - index` 為 key，組數為 value

## 實作

```ts
function countBadPairs(nums: number[]): number {
    let n = nums.length;
    let totalPairs = (n * (n - 1)) / 2;
    let goodPairs = 0;

    let countMap = new Map<number, number>();

    for (let i = 0; i < n; i++) {
        let diff = nums[i] - i;
        if (countMap.has(diff)) {
            goodPairs += countMap.get(diff)!;
        }
        countMap.set(diff, (countMap.get(diff) || 0) + 1);
    }

    return totalPairs - goodPairs;
}
```

## 複雜度分析

- 時間複雜度：一個迴圈所以為 `O(n)`
- 空間複雜度：一個 countMap，最差狀況就是大家的差都不同，所以為 `O(n)`
