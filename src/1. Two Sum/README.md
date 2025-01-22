# [E] 1. 兩數相加 (Two Sum)

## 題目

- [LeetCode 連結](https://leetcode.com/problems/two-sum)
- **主題**：Array、Hash Table
- **難度**：Easy

## 題目描述

給定一個整數陣列 `nums` 和一個整數 `target`，請返回兩個數字的索引，使它們相加的和等於 `target`。

你可以假設每個輸入都只有 **一組解**，且你不能重複使用相同的元素。另外你可以以任意順序返回答案。

### 範例 1

```
輸入：nums = [2,7,11,15], target = 9
輸出：[0,1]
解釋：因為 nums[0] + nums[1] == 9，我們返回 [0, 1]。
```

### 範例 2

```
輸入：nums = [3,2,4], target = 6
輸出：[1,2]
```

### 範例 3

```
輸入：nums = [3,3], target = 6
輸出：[0,1]
```

### 限制條件

- `2 <= nums.length <= 10^4`
- `-10^9 <= nums[i] <= 10^9`
- `-10^9 <= target <= 10^9`
- 保證存在唯一的解。

### 進階挑戰

你能想出時間複雜度小於 `O(n²)` 的解法嗎？

## 問題釐清

- 確認每個測試案例都一定存在唯一解，所以限制輸入的 `nums` 陣列一定會大於 2
- 確認輸出的 index 可以是任意順序，也就是 `[0, 1]` 或 `[1, 0]` 都代表正確？
- 如果存在多組姐的話，返回第一組找到的解嗎？
- 如果輸入不存在唯一解會需要做錯誤處理嗎？或是回傳空陣列即可？

## 提出測試案例

- 能通過題目三個範例
- 設計一個兩組解的案例，確認是否會回傳第一組找到的解
- 設計一個含負數的測試
- 設計一個不存在解的測試

## 提出思路

這題因為相當單純，用兩層迴圈的暴力解去算出每個組合能輕鬆得到結果。

但如果要符合進階挑戰中的「時間複雜度小於 `O(n²)` 的解法」，可以用一個 hash map 去存 key 為當前數值、value 為索引值，跑一個迴圈去檢查 `target - num` 的差值是否對應到 map 的索引值：

- 有對應：當前的兩個索引值即為所求
- 沒對應：放入 map 中

## 實作

```ts
function twoSum(nums: number[], target: number): number[] {
  // declare a hash map with key for current number and value for its index
  const hashMap = new Map<number, number>();

  for (let i = 0; i < nums.length; i++) {
    // find pair with difference
    const diff = target - nums[i];

    if (hashMap.has(diff)) {
      return [hashMap.get(diff) as number, i];
    } else {
      hashMap.set(nums[i], i);
    }
  }

  // prevent edge case
  return [];
}
```

## 撰寫測試

另外再補上幾個邊界條件的測試做基本錯誤處理：

```ts
describe('Two Sum', () => {
  test.each([
    [[2, 7, 11, 15], 9, [0, 1]],
    [[3, 2, 4], 6, [1, 2]],
    [[3, 3], 6, [0, 1]],
    [[1, 5, 3, 6, 8], 11, [1, 3]],
    [[-3, 4, 3, 90], 0, [0, 2]],
    [[1, 5, 3, 6, 8], 99, []]
  ])(
    'should return %j for input %j with target %i',
    (nums: number[], target: number, expected: number[]) => {
      expect(twoSum(nums, target)).toEqual(expected);
    }
  );
});
```

## 複雜度分析

- 時間複雜度：跑一次迴圈所以是 `O(n)`
- 空間複雜度：用了一個 map 存資料最壞狀況可能到 `O(n)`
