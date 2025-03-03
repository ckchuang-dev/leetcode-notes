# [M] 2161. Partition Array According to Given Pivot

## 題目

- [LeetCode 連結](https://leetcode.com/problems/partition-array-according-to-given-pivot)
- **主題**：Array, Two Pointers
- **難度**：Medium (Rating: 1337)
- **Daily**：2025-03-03

## 題目描述

給定一個 **0-索引** 的整數陣列 `nums` 和一個整數 `pivot`。請重新排列 `nums`，使其滿足以下條件：

1. **所有小於 `pivot` 的元素** 必須出現在 **所有大於 `pivot` 的元素** 之前。
2. **所有等於 `pivot` 的元素** 必須位於 **小於 `pivot` 和大於 `pivot` 的元素之間**。
3. **小於 `pivot` 的元素** 和 **大於 `pivot` 的元素** 的**相對順序必須保持不變**。

換句話說，對於 `pi` 和 `pj`，如果 `i < j` 並且 `nums[i]` 和 `nums[j]` 都小於或都大於 `pivot`，則 `pi < pj` 必須成立。請返回 **重新排列後的 `nums` 陣列**。

### 範例 1

```plain
輸入：nums = [9,12,5,10,14,3,10], pivot = 10
輸出：[9,5,3,10,10,12,14]
解釋：
- 元素 9、5 和 3 小於 `pivot`，所以它們出現在陣列的左側。
- 元素 12 和 14 大於 `pivot`，所以它們出現在陣列的右側。
- 小於 `pivot` 和大於 `pivot` 的元素的相對順序保持不變：[9, 5, 3] 和 [12, 14]。
```

### 範例 2

```plain
輸入：nums = [-3,4,3,2], pivot = 2
輸出：[-3,2,4,3]
解釋：
- 元素 -3 小於 `pivot`，所以它在陣列的左側。
- 元素 4 和 3 大於 `pivot`，所以它們在陣列的右側。
- 小於 `pivot` 和大於 `pivot` 的元素的相對順序保持不變：[-3] 和 [4, 3]。
```

### 限制條件

- `1 <= nums.length <= 10^5`
- `-10^6 <= nums[i] <= 10^6`
- `pivot` 必定是 `nums` 中的一個元素。

## 問題釐清

- 題目提到直接返回重新排列後的 `nums` 陣列，是否會期待輸出的參考位址與輸入的 `nums` 相同？或可以使用處理後的新陣列

## 提出思路

如果可以回傳新陣列的話，直覺上有個最快的做法是宣告 3 個新陣列，再用一個迴圈去分別放入小於、等於、大於 pivot 的同順序數組，最後回傳組合在一起的結果。這樣的話時間與空間複雜度預期都會是 `O(n)`。

## 實作

```ts
function pivotArray(nums: number[], pivot: number): number[] {
  const preNums: number[] = [];
  let equalCount = 0;
  const postNums: number[] = [];

  for (let num of nums) {
    if (num === pivot) {
      equalCount++;
    } else if (num > pivot) {
      postNums.push(num);
    } else {
      preNums.push(num);
    }
  }

  return [
    ...preNums,
    ...Array.from({ length: equalCount }, () => pivot),
    ...postNums
  ];
}
```

## 其他解法探索

submit 後看起來效率不是到最好，時間複雜度只打敗了 16.67% 的人，看主題有提到 two pointers，再試著用 two pointers 來解解看：

- 提前先宣告好結果陣列
- 利用兩個指標 `lessIndex` 與 `greaterIndex` 來指向這個陣列的頭尾
- 跑一個迴圈從頭尾往中間夾，過程中去判斷當前值與 pivot 的關係並放入結果陣列中
- 最後檢查 `lessIndex` 與 `greaterIndex` 大小關係在中間塞入剩下的 `pivot` 值

```ts
function pivotArray(nums: number[], pivot: number): number[] {
  const ans: number[] = new Array(nums.length).fill(0);
  let lessIndex = 0;
  let greaterIndex = nums.length - 1;

  for (let i = 0, j = nums.length - 1; i < nums.length; i++, j--) {
    if (nums[i] < pivot) {
      ans[lessIndex] = nums[i];
      lessIndex++;
    }
    if (nums[j] > pivot) {
      ans[greaterIndex] = nums[j];
      greaterIndex--;
    }
  }

  while (lessIndex <= greaterIndex) {
    ans[lessIndex] = pivot;
    lessIndex++;
  }

  return ans;
}
```

雖然與原本的做法在時間、空間複雜度來說都是 `O(n)`，但實際上更有效率：

- 原本的做法去宣告三個獨立陣列最後做拼接，在拼接時其實也是要跑過 `O(n)` 的時間
- 用 `push` 的方法塞值實際上會造成記憶體位置破碎，可能造成 CPU 快取效率的問題 (CPU Cache Locality)，相比第二種實作方式一開始就預先配置好固定長度的陣列會更好

實際測試後，時間複雜度上從擊敗 16.67% 提升到 88.33%，演算法的威力呀，雖然我覺得第一版更好讀就是了。
