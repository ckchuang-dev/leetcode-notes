# [E] 2460. Apply Operations to an Array

## 題目

- [LeetCode 連結](https://leetcode.com/problems/apply-operations-to-an-array)
- **主題**：Array
- **難度**：Easy (Rating: 1223)
- **Daily**：2025-03-01

## 題目描述

給定一個 **0-索引** (`0-indexed`) 的整數陣列 `nums`，其大小為 `n`，且僅包含非負整數。

你需要對這個陣列進行 `n - 1` 次操作，在第 `i` 次操作（**0-索引**）時，對 `nums[i]` 應用以下規則：

- 若 `nums[i] == nums[i + 1]`，則將 `nums[i]` 乘以 2，並將 `nums[i + 1]` 設為 `0`。
- 若 `nums[i] != nums[i + 1]`，則跳過此操作。

所有操作執行完後，將所有 `0` 移動到陣列末尾。

例如，對 `[1,0,2,0,0,1]` 進行移動後，結果為 `[1,2,1,0,0,0]`。

請返回最終的陣列。

**注意**：操作需按照順序逐步執行，而非同時執行。

---

### 範例 1

```plain
輸入：nums = [1,2,2,1,1,0]
輸出：[1,4,2,0,0,0]
解釋：
- i = 0: `nums[0]` 和 `nums[1]` 不相等，跳過。
- i = 1: `nums[1]` 和 `nums[2]` 相等，`nums[1]` 乘以 2，`nums[2]` 變為 0，陣列變為 `[1,4,0,1,1,0]`。
- i = 2: `nums[2]` 和 `nums[3]` 不相等，跳過。
- i = 3: `nums[3]` 和 `nums[4]` 相等，`nums[3]` 乘以 2，`nums[4]` 變為 0，陣列變為 `[1,4,0,2,0,0]`。
- i = 4: `nums[4]` 和 `nums[5]` 相等，`nums[4]` 乘以 2，`nums[5]` 變為 0，陣列變為 `[1,4,0,2,0,0]`。
- 最後，將 `0` 移動到陣列末尾，結果為 `[1,4,2,0,0,0]`。
```

### 範例 2

```plain
輸入：nums = [0,1]
輸出：[1,0]
解釋：無法進行任何操作，只需將 `0` 移動到末尾。
```

---

### 限制條件

- `2 <= nums.length <= 2000`
- `0 <= nums[i] <= 1000`

---

## 提出思路

蠻單純的題目，直覺就是跑過一個迴圈依照邏輯操作原本的 `nums` 陣列 (或另外複製一份避免去 mutate 輸入陣列)，並在過程中另外把非零數也記到另一個陣列。

最後可以直接回傳一個新陣列去串接非零陣列與剩餘長度的 0 即可。

## 實作

```ts
function applyOperations(nums: number[]): number[] {
  const n = nums.length;
  const nonZeroNums: number[] = [];

  for (let i = 0; i < n - 1; i++) {
    if (nums[i] === nums[i + 1]) {
      nums[i] = nums[i] * 2;
      nums[i + 1] = 0;
    }
    if (nums[i] !== 0) {
      nonZeroNums.push(nums[i]);
    }
  }
  // handle edge num
  if (nums[n - 1] !== 0) {
    nonZeroNums.push(nums[n - 1]);
  }

  // concat non-zeros and remaining zeros
  return [
    ...nonZeroNums,
    ...Array.from({ length: n - nonZeroNums.length }, () => 0)
  ];
}
```

## 複雜度分析

若 `nums` 長度代表 `n`

- 時間複雜度：一個迴圈所以為 `O(n)`
- 空間複雜度：另外有用一個 `nonZeroNums` 最長會是 `O(n)`
