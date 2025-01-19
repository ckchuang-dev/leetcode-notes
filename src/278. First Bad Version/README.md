# [E] 278. 找出第一個出錯的版本 (First Bad Version)

## 題目

- [LeetCode 連結](https://leetcode.com/problems/first-bad-version)
- **主題**：Binary Search
- **難度**：Easy

## 題目描述

假想一個情境，你是一位產品經理，正在帶領團隊開發一個新產品。不幸的是，最新版本的產品未通過品質檢測。由於每個版本都是基於之前的版本開發的，因此某一版本出現問題後，其後續所有版本都會出現問題。

假設你有 `n` 個版本 \[1, 2, ..., n\]，你需要找到第一個出現問題的版本，這也是導致所有後續版本出現問題的根本原因。

系統提供了一個 API `bool isBadVersion(version)`，會回傳該版本是否存在問題。請實作一個函式來找出第一個出問題的版本，並將 API 呼叫次數降到最低。

```ts
/**
 * The knows API is defined in the parent class Relation.
 * isBadVersion(version: number): boolean {
 *     ...
 * };
 */
const solution = (isBadVersion: any) => {
  return (n: number): number => {};
};
```

### 範例 1

```
輸入：n = 5, bad = 4
輸出：4
解釋：
呼叫 isBadVersion(3) -> false
呼叫 isBadVersion(5) -> true
呼叫 isBadVersion(4) -> true
因此 4 是第一個錯誤的版本。

```

### 範例 2

```
輸入：n = 1, bad = 1
輸出：1
```

### 限制條件

- `1 <= bad <= n <= 2³¹ - 1`

## 問題釐清

一開始從題意不太懂題目想要求實作什麼，從題目給的程式碼來看，意思是希望實作 `solution` 這個函式，輸入的是 `isBadVersion` 這個已實作好的 API function，回傳一個函式 `firstBadVersion` 可以以 `n` 代表版本數量為輸入，並輸出第幾個版本開始出錯，然後希望在其中盡可能少地去呼叫 `isBadVersion` 這樣。

也就是說回傳的版本在 TypeScript 版本改成這樣應該更容易理解：

```ts
type IsBadVersionFunction = (version: number) => boolean;

// isBadVersion = (version: number) => version >= bad;

const solution = (isBadVersion: IsBadVersionFunction) => {
  return function firstBadVersion(n: number): number {
    // write your code here
  };
};
```

這個 `isBadVersion` 應該可以理解成是一個簡單的函示，會依照定義的 bad 來判斷當前傳入的版本是否為不良品。

也補一些其他的問題釐清部分：

- 因為 `bad` 這個輸入定義會跟 `isBadVersion` 有關，是否在寫測試時做 mock 就可以？
- 因為條件限制看起來 `n` 可能會是極大的數，且題目期待「將 API 呼叫次數降到最低」，加上題目設計剛好是「從某個版本開始出錯」，所以會希望時間複雜度比 `O(n)` 更好？也就是需要減少不必要的後續判斷。

## 提出測試案例

- 通過題目兩個範例
- 測試一個 n 的邊界極大值確認效能是否在範圍內

## 提出思路

如果題目沒有效能限制，基本上就是暴力解用迴圈一個一個從頭呼叫 API 確認是否開始出錯，但相對是比較沒效率的，如果最壞狀況出錯的版本在最後一個就會需要跑 `O(n)`。

因此另一個比較有效率的方式應該就是不斷切一半去檢查中間值是否有錯，並往可能有錯的一邊反覆執行切半檢查，也就是做 binary search 的方式：

- 宣告 left、right 分別為 1 跟 n
- 跑 while 迴圈去，直到 left >= right 則停止
  - 找中間值並用 API 檢查是否出錯
  - 出錯：往前半部找，移動 right 為當前中間值
  - 沒出錯：往後半部找，移動 left 為當前中間值

## 實作

```ts
type IsBadVersionFunction = (version: number) => boolean;

const solution = (isBadVersion: IsBadVersionFunction) => {
  return function firstBadVersion(n: number): number {
    // 宣告最左、最右位置
    let left = 1;
    let right = n;

    while (left < right) {
      // 將所有版本切半找出中間值
      const mid = left + Math.floor((right - left) / 2);

      // 使用中間值去 call API 確認是否為不良品
      if (isBadVersion(mid)) {
        // 往前半部找
        right = mid;
      } else {
        // 往後半部找
        left = mid + 1;
      }
    }

    // 當跳出迴圈時最左邊指著的位置即為所求
    return left;
  };
};
```

## 撰寫測試

這裡簡單列出壓測版本的測資，對 `isBadVersion` 做 mock，另外也檢查 `isBadVersion` 呼叫次數能在 `logN` 次以內符合 binary search 的要求：

```ts
it('should handle large input efficiently', () => {
  const bad = 500000;
  const isBadVersion = vi.fn((version: number) => version >= bad);
  const findFirstBadVersion = solution(isBadVersion);

  expect(findFirstBadVersion(1000000)).toBe(bad);
  expect(isBadVersion).toHaveBeenCalledTimes(19);
});
```

## 複雜度分析

- **時間複雜度**：每次檢查後就將範圍縮小一半，所以為 `O(log n)`
- **空間複雜度**：沒有額外的大空間使用，所以為 `O(1)`
