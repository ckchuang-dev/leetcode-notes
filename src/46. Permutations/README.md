# \[M\] 46. 排列 (Permutations)

## 題目

- [LeetCode 連結](https://leetcode.com/problems/permutations)
- **主題**：Array、Backtracking、Recursion
- **難度**：Medium

## 題目描述

給定一個由互不相同的整數組成的陣列 `nums`，返回所有可能的排列組合（permutations）。答案可以以任意順序返回。

### 範例 1

```
輸入：nums = [1,2,3]
輸出：[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
```

### 範例 2

```
輸入：nums = [0,1]
輸出：[[0,1],[1,0]]
```

### 範例 3

```
輸入：nums = [1]
輸出：[[1]]
```

### 限制條件

- `1 <= nums.length <= 6`
- `-10 <= nums[i] <= 10`
- `nums` 中的所有整數都是唯一的。

## 問題釐清

- 確認 `nums` 中的所有整數皆為唯一，且輸入的 `nums` 長度夠小 `(< 6)`，可用遞迴解

## **提出測試案例**

- 通過三個範例
- 含有負數且長度為六的案例
- 確認 `nums` 長度到多少會 stack overflow

## 提出思路

直覺是可以用遞迴來解：

- 基本案例：當輸入長度為 1 時，回傳該值
- 對 `nums` 每個值跑迴圈，以當前值 (`num`) 做為開頭的所有組合，用剩餘其他數拿去做遞迴得到結果
- 對回傳回來的所有組合與 `num` 去做 concat，紀錄到最後的 `result` 陣列中
- 回傳 `result`

以註解表示以上的思路：

```ts
function permute(nums: number[]): number[][] {
  // base case for nums length = 1
  // declare result array
  // run a loop for each num as initial value
    // do recursion to get deeper permutations
    // run a loop to push result with current num and result permutations
  // return result
}
```

## 實作

```ts
function permute(nums: number[]): number[][] {
  // base case for nums length = 1
  if (nums.length === 1) {
    return [[...nums]];
  }

  // declare result array
  const result: number[][] = [];

  // run a loop for each num as initial value
  for (let num of nums) {
    // do recursion to get deeper permutations
    const permutations = permute(nums.filter((n) => n !== num));

    // run a loop to push result with current num and result permutations
    for (let permutation of permutations) {
      result.push([num].concat(permutation));
    }
  }

  // return result
  return result;
}
```

## 撰寫測試

```ts
describe('Permutations', () => {
  test.each([
    {
      nums: [1, 2, 3],
      expected: [
        [1, 2, 3],
        [1, 3, 2],
        [2, 1, 3],
        [2, 3, 1],
        [3, 1, 2],
        [3, 2, 1]
      ]
    },
    {
      nums: [0, 1],
      expected: [
        [0, 1],
        [1, 0]
      ]
    },
    { nums: [1], expected: [[1]] },
    { nums: [-1, -2, -3, -4, -5, -6], expectedLength: 720 }
  ])(
    'should generate all permutations for $nums',
    ({ nums, expected, expectedLength }) => {
      const result = permute(nums);

      if (expectedLength) {
        expect(result.length).toEqual(expectedLength);
      } else {
        expect(result).toEqual(expected);
      }
    }
  );
});
```

## 複雜度分析

- 時間複雜度：
  - 對 `nums` 跑迴圈，長度為 `n`
    - 篩選其他值，複雜度是 `O(n)`
    - 做遞迴，可能有 `(n-1)!` 種結果
  - 以上面的複雜度來算會是 `O(n * ((n-1)! + n))`
  - 所以會是 `O(n!)`
- 空間複雜度：主要會有以下兩部分
  - call stack：每次遞迴呼叫會將一個函數推入 call stack 中，遞迴的最大深度是 `n`，所以會是 `O(n)`
  - result 陣列：總共會有 `n!` 種排列，且每個排列的長度是 `n`，所以空間複雜度會是 `O(n*n!)`

## 其他解法探索

後來看了下其他解法，發現上面的方式比較偏向 brute force，如果要讓空間複雜度降低到 `O(n)` 的話，看到這題的經典解法是可以用 Backtracking (回溯法)：

```ts
function permute(nums: number[]): number[][] {
  const result: number[][] = [];

  const backtrack = (start: number) => {
    if (start === nums.length) {
      result.push([...nums]); // 將當前排列加入結果
      return;
    }

    for (let i = start; i < nums.length; i++) {
      [nums[start], nums[i]] = [nums[i], nums[start]]; // 交換
      backtrack(start + 1); // 遞迴處理下一層
      [nums[start], nums[i]] = [nums[i], nums[start]]; // 回退交換
    }
  };

  backtrack(0);
  return result;
}
```

寫筆記不小心花了太多時間，之後再回頭來了解一下。先附上關於 Backtracking 一個看起來[很完整的筆記](https://medium.com/appworks-school/%E9%80%B2%E5%85%A5%E9%81%9E%E8%BF%B4-recursion-%E7%9A%84%E4%B8%96%E7%95%8C-%E4%B8%89-d2fd70b5b171)。
