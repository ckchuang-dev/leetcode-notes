# \[M\] 347. Top K Frequent Elements

## 題目

- [LeetCode 連結](https://leetcode.com/problems/top-k-frequent-elements/)
- **主題**：Array
- **難度**：Medium

## 題目描述

給定一個整數數組 `nums` 和一個整數 `k`，請返回其中出現頻率前 `k` 高的元素。你可以按任意順序返回答案。

### 範例 1

```plain
輸入：nums = [1,1,1,2,2,3], k = 2
輸出：[1,2]
```

### 範例 2

```plain
輸入：nums = [1], k = 1
輸出：[1]
```

### 限制條件

- `1 <= nums.length <= 10^5`
- `-10^4 <= nums[i] <= 10^4`
- `k` 的取值範圍是 `[1, 數組中不相同的元素的個數]`
- 題目保證答案是唯一的

### 進階

- 你的演算法時間複雜度必須優於 `O(n log n)`，其中 `n` 是 `nums` 的大小。

---

## 問題釐清

- 如果題目沒給限制條件的話：
  - k 是否一定大於等於 nums 中出現的數字個數？
  - 是否可能會有一樣頻率的數字，像是測資 `nums = [1, 1, 2, 2, 3, 3], k = 2`
- 以範例一來說，回傳 `[1, 2]` 或 `[2, 1]` 都是符合預期的？

## 提出思路

題目主要可以拆兩部份：

- 計算每個數字出現頻率
- 根據每個數的出現頻率找出前 k 名多的數

最直覺的方式就是先跑一個迴圈把 `<num, count>` 存成 hash map，再對這個 map 去做排序去取出前幾個最大的值回傳。時間複雜度預計會是 `O(N + N log N + k)`，分別是計數、排序、取值，約等於 `O(N log N)`；空間複雜度最差可能到 `O(N)` 也就是 `nums` 都是獨立的數。

另外講到取最大值，就想到可以用 heap 來解會更有效率，以這裡的狀況來說用一個 size k 的 min heap 每次只要有更大的值就移除塞新值，最後就能得到前幾大的數值。時間複雜度上可以降低到 `O(N log k)`，但在空間上會增加到 `O(n + k)`。

## 實作

先來嘗試第一種做法：

```ts
function topKFrequent(nums: number[], k: number): number[] {
    const numCountMap = new Map<number, number>();

    // 計算頻率
    for (let num of nums) {
        numCountMap.set(num, (numCountMap.get(num) ?? 0) + 1);
    }

    // 按照頻率排序，取前 k 個
    return Array.from(numCountMap.entries())
        .sort((a, b) => b[1] - a[1])
        .slice(0, k)
        .map(([num]) => num);
}
```

第二種 heap 的做法因為 JS 內建沒有 PQ，還在研究中。

看了下解答還有第三種解法是用 Bucket Sort 可以再把時間複雜度降到 `O(N)`，之後回頭來複習下。
