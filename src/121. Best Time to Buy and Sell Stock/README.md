# [E] 121. 買賣股票的最佳時機 (Best Time to Buy and Sell Stock)

## 題目

- [LeetCode 連結](https://leetcode.com/problems/best-time-to-buy-and-sell-stock)
- **主題**：Array
- **難度**：Easy

## 題目描述

給你一個整數陣列 `prices`，其中 `prices[i]` 表示第 `i` 天的股票價格。你只能選擇某一天買入這支股票，並選擇另一個未來的不同一天賣出，以獲取最大的利潤。請回傳你所能獲得的最大利潤。如果無法獲利，則回傳 0。

### 範例 1:

**輸入：** `prices = [7,1,5,3,6,4]`\
**輸出：** `5`\
**解釋：** 在第 2 天（價格為 1）買入，在第 5 天（價格為 6）賣出，獲利為 `6 - 1 = 5`。\
請注意，不能在第 2 天買入並在第 1 天賣出，因為必須先買後賣。

### 範例 2:

**輸入：** `prices = [7,6,4,3,1]`\
**輸出：** `0`\
**解釋：** 在這種情況下，沒有進行任何交易，最大利潤為 0。

### 限制條件：

- `1 <= prices.length <= 10^5`
- `0 <= prices[i] <= 10^4`

## 問題釐清

- 從限制條件中看到輸入的 prices 陣列應一定為數字陣列，應不需要處理其他非預期格式？
- 從限制條件中看到輸入的 prices 陣列不會是空陣列，應不需要處理空陣列狀況？
- 從範例 2 看起來如果今天算出來的最佳解都沒有大於 0，則輸出最小不會低於 0？

## **提出測試案例**

- 通過題目範例
- 確認 10^5 的 prices 陣列

## 提出思路

正所謂「股票要賺錢很簡單，就是低買高賣」，遵循著這個思路來實作這題的演算法，最直覺的做法就是對 prices 陣列跑迴圈並記錄下過程中的最低價格，並沿途算出每次的賣出差價是否為最大值即可。轉換成註解簡單表示如下：

```ts
function maxProfit(prices: number[]): number {
  // declare min price
  // declare max profit value
  // run a for loop for prices to calculate max profit
  // return max profit
}
```

## 實作

```ts
export function maxProfit(prices: number[]): number {
  // declare min price
  let min = Number.MAX_SAFE_INTEGER;
  // declare max profit value
  let max = 0;

  // run a for loop for prices to calculate max profit
  for (let price of prices) {
    min = Math.min(min, price);
    max = Math.max(max, price - min);
  }

  // return max profit
  return max;
}
```

## 撰寫測試

根據前面提出的測試案例撰寫單元測試：

```ts
describe('Best Time to Buy and Sell Stock', () => {
  test.each([
    // [input, expected output]
    [[7, 1, 5, 3, 6, 4], 5],
    [[7, 6, 4, 3, 1], 0],
    [[1], 0],
    [[100, 1, 2, 3, 4, 5], 4]
  ])('maxProfit(%j) should return %i', (prices, expected) => {
    expect(maxProfit(prices)).toBe(expected);
  });

  test('handles large input of size 10^5', () => {
    // 產生 [1, 2, 3, ..., 100000]
    const prices = Array.from({ length: 10 ** 5 }, (_, i) => i + 1);
    // 最低點買（1），最高點賣（100000），最大獲利應為 99999
    const expected = 10 ** 5 - 1;

    expect(maxProfit(prices)).toBe(expected);
  });
});
```
