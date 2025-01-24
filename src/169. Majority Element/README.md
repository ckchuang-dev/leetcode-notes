# [E] 169. 多數元素 (Majority Element)

## 題目

- [LeetCode 連結](https://leetcode.com/problems/majority-element)
- **主題**：Array
- **難度**：Easy

## 題目描述

給定一個大小為 `n` 的陣列 `nums`，請返回多數元素。多數元素指的是在陣列中出現次數大於 `⌊n / 2⌋` 的元素。你可以假設陣列中總是存在多數元素。

### 範例 1

```
輸入：nums = [3,2,3]
輸出：3
```

### 範例 2

```
輸入：nums = [2,2,1,1,1,2,2]
輸出：2
```

### 限制條件

- `n == nums.length`
- `1 <= n <= 5 * 10^4`
- `-10^9 <= nums[i] <= 10^9`

### 進一步挑戰

- 你能在 **線性時間** 並使用 `O(1)` **空間** 解決此問題嗎？

---

## 問題釐清

- 在輸入的元素個數會至少大於 1，所以不需處理空陣列狀況？
- 不需考慮多數元素非唯一解的案例？
- 題目提到「多數元素指的是在陣列中出現次數大於 `⌊n / 2⌋` 的元素」，所以可以說當今天計數時某個元素數量超過 `n/2` 就可以即刻回傳，不需真的全部跑完

## **提出測試案例**

- 通過題目兩個範例
- 負數狀況
- 只有一個數的案例

## 提出思路

直覺是跑一個迴圈去計數並以元素值為 key、數量為 value 記入一個 map 中，當計數到超過 `n/2` 時即回傳該元素。

## 實作

雖然 LeetCode 上是不需要回傳 `null` 來處理多組解的，但防呆做一下：

```ts
function majorityElement(nums: number[]): number | null {
  // declare a map
  const countMap = new Map<number, number>();
  const halfLen = nums.length / 2;

  // run a for loop to check whether current num amount > n/2
  for (let num of nums) {
    const count = (countMap.get(num) || 0) + 1;
    countMap.set(num, count);

    if (count > halfLen) {
      return num;
    }
  }

  return null;
}
```

另外原本我單純用一個 object 來實作，但後來發現改用 `Map` 後效能提升不少，所以改成以上這樣。

## 撰寫測試

這裡比較特別的是一開始送出後踩到 `[1]` 這個案例的錯誤，因為原本邏輯有點小 bug，所以也補上這個案例：

```ts
describe('Majority Element', () => {
  test.each([
    [[3, 2, 3], 3],
    [[2, 2, 1, 1, 1, 2, 2], 2],
    [[-1, -1, -1, 3, 3], -1],
    [[1], 1],
    [[1, 1, 2, 2], null],
    [[2147483647, 2147483647, -2147483648, 2147483647], 2147483647]
  ])('%j as input, the result should be %i', (nums: number[], expected) => {
    expect(majorityElement(nums)).toBe(expected);
  });
});
```

另外也補上一個 signed integer 的最大值 (2 的 31 次方減 1) 的案例，確保程式能正常運作。

## 複雜度分析

- 時間複雜度：最壞狀況可能算到最後一個值才確定超過 `n/2`，所以是 `O(n)`
- 空間複雜度：最壞狀況可能 `nums` 內每個非多數元素都是一個，所以會是 `O(n)`

## 進階挑戰或其他解法探索

有點好奇進階挑戰中的「`O(n)` 時間並使用 `O(1)` 空間」解法，看了 LeetCode 官方的教學看起來是一個叫做 Boyer-Moore Voting Algorithm (摩爾投票演算法) 的解法。

```ts
function majorityElement(nums: number[]): number {
  let count = 0;
  let candidate: number | null = null;

  for (let num of nums) {
    if (count === 0) {
      candidate = num;
    }
    count += num === candidate ? 1 : -1;
  }

  return candidate as number;
}
```

理解了下思路，關鍵在於要成為多數元素的數，換個方式想就是這個元素出現次數要比其他元素個數加總還多，因此可以只用一個 `count` 與 `candidate` 來對計數做加減，當減至 0 時則換人當候選人，好像挺聰明的，沒看過還真不知道。
