# \[M\] 238. Product of Array Except Self

## 題目

- [LeetCode 連結](https://leetcode.com/problems/product-of-array-except-self/)
- **主題**：Array
- **難度**：Medium

## 題目描述

給定一個整數陣列 `nums`，返回一個陣列 `answer`，其中 `answer[i]` 等於 `nums` 中除 `nums[i]` 之外的所有元素的乘積。

請注意，題目保證任意前綴或後綴的乘積都在 32 位整數範圍內。

你必須設計一個時間複雜度為 O(n) 的算法，且不能使用除法運算。

### 範例 1

```plain
輸入：nums = [1,2,3,4]
輸出：[24,12,8,6]
```

### 範例 2

```plain
輸入：nums = [-1,1,0,-3,3]
輸出：[0,0,9,0,0]
```

### 限制條件

- `2 <= nums.length <= 10^5`
- `-30 <= nums[i] <= 30`
- 保證任意前綴或後綴的乘積都在 32 位整數範圍內。

### 進階

你能在常數級別的額外空間複雜度下完成這個問題嗎？（輸出陣列不被視為額外空間）

---

## 問題釐清

- 確認題目限制不能使用除法，且時間複雜度不能超過 `O(N)`
- 輸入是否包含 0？
- 輸入是否包含超過一個 0？

## 提出思路

因為題目限制不能使用除法，且時間複雜度不能超過 `O(N)`，所以直覺的解法可能偏向暴力解：

- 先宣告出一個長度 N 的結果陣列，初始化為 1
- 先從前往後跑過一次迴圈，計算除了當前數之外的所有前綴乘積，放到結果陣列中
- 再從後往前跑一次迴圈，計算後綴乘積，並與當前結果陣列做相乘，即為題目所求

## 實作

```ts
function productExceptSelf(nums: number[]): number[] {
    const len = nums.length;
    const res = Array(len).fill(1);

    let prefix = 1;
    for (let i = 0; i < len; i++) {
        res[i] = prefix;
        prefix *= nums[i];
    }
    let suffix = 1;
    for (let i = len - 1; i >= 0; i--) {
        res[i] *= suffix;
        suffix *= nums[i];
    }

    return res;
};
```

複雜度分析上，若原始陣列長度為 `N`：

- 時間複雜度：跑過兩個 N 長度的迴圈，因此為 `O(N)`
- 空間複雜度：一開始有宣告一個初始陣列來存結果為 `O(N)`。結果看了官方解答後表示這個是最佳解，另一種解是沒有在同一個陣列中計算所以相對較差，有點神奇的題目。 😆
