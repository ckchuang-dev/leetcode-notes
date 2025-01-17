# [M] 57. 插入區間 (Insert Interval)

## 題目

- [LeetCode 連結](https://leetcode.com/problems/insert-interval)
- **主題**：Array
- **難度**：Medium

## 題目描述

給定一個**非重疊**區間的陣列 `intervals`，其中 `intervals[i] = [starti, endi]` 代表第 `i` 個區間的開始和結束，且 `intervals` 按照 `starti` 的升序排列。你也會給定一個區間 `newInterval = [start, end]`，表示另一個區間的開始和結束。

將 `newInterval` 插入到 `intervals` 中，使得 `intervals` 仍然按 `starti` 的升序排序，並且不包含任何重疊區間（如果有重疊區間，請合併它們）。

返回插入後的 `intervals`。

注意，你不需要就地修改 `intervals`，可以創建一個新的陣列並返回。

### 範例 1

```plain
輸入：intervals = [[1,3],[6,9]], newInterval = [2,5]
輸出：[[1,5],[6,9]]
```

### 範例 2

```plain
輸入：intervals = [[1,2],[3,5],[6,7],[8,10],[12,16]], newInterval = [4,8]
輸出：[[1,2],[3,10],[12,16]]
說明：因為新區間 [4,8] 與 [3,5]、[6,7]、[8,10] 重疊，所以這些區間被合併。
```

### 限制條件

- `0 <= intervals.length <= 10^4`
- `intervals[i].length == 2`
- `0 <= starti <= endi <= 10^5`
- `intervals` 按照 `starti` 升序排序。
- `newInterval.length == 2`
- `0 <= start <= end <= 10^5`

## 問題釐清

- 從限制條件看到 `intervals` 可能為空陣列，若為空陣列，則直接回傳一個陣列裡面包 `newInterval` 嗎？
- 假如範例一中的 `newInterval` 是 `[3, 6]` 則輸出為 `[[1, 9]]` 嗎？
- 如果 `newInterval` 與 `intervals` 都沒有交集則直接插在最前面或最後面嗎？

## **提出測試案例**

- 需要確認原本傳入的陣列是否被改變
- 通過範例一、二
- 確認空陣列輸入
- 新增一個測資是 `newInterval` 是 `[3, 6]` 則輸出為 `[[1, 9]]`
- 新增一個測資是 `newInterval` 與 `intervals` 沒有交集

## 提出思路

看起來可以對 intervals 去跑迴圈，並切分成 left、new、right 三群的區間，分別去檢查值並塞入，最後回傳一個新陣列去把這三群 merge 在一起即可。

以註解表示以上的思路：

```ts
function insertInterval(
  intervals: number[][],
  newInterval: number[]
): number[][] {
  // declare the left and right intervals
  // run a for loop for intervals to compare bound and do merging
  // return merged intervals
}
```

## 實作

```ts
function insertInterval(
  intervals: number[][],
  newInterval: number[]
): number[][] {
  // declare the left and right intervals
  const left: number[][] = [];
  const right: number[][] = [];
  let [start, end] = newInterval;

  // run a for loop for intervals to compare bound and do merging
  for (let interval of intervals) {
    const [currentStart, currentEnd] = interval;

    if (start > currentEnd) {
      left.push(interval);
    } else if (end < currentStart) {
      right.push(interval);
    } else {
      start = Math.min(start, currentStart);
      end = Math.max(end, currentEnd);
    }
  }

  // return merged intervals
  return [...left, [start, end], ...right];
}
```

## 撰寫測試

用 `test.each` 來撰寫單元測試，其中也用 `toBe` 來確認輸出與原本 `intervals` 的參考位址不同：

```ts
describe('Insert Interval', () => {
  test.each([
    [[[1, 3], [6, 9]], [2, 5], [[1, 5], [6, 9]]],
    [[[1, 2], [3, 5], [6, 7], [8, 10], [12, 16]], [4, 8], [[1, 2], [3, 10], [12, 16]]],
    [[], [4, 8], [[4, 8]]],
    [[[1, 3], [6, 9]], [3, 6], [[1, 9]]],
    [[[1, 3], [6, 9]], [12, 15], [[1, 3], [6, 9], [12, 15]]],
  ])(
    'should return %s for insertInterval(%s, %s)',
    (intervals, newInterval, expected) => {
      const result = insertInterval(intervals, newInterval);

      expect(result).toEqual(expected);
      expect(result).not.toBe(intervals);
    }
  );
});
```

## 複雜度分析

若 `intervals` 的長度為 N：

- 時間複雜度：對傳入的 `intervals` 做遍歷，所以是 `O(N)`
- 空間複雜度：另外有用上 `left`、`right` 與最後回傳時宣告的新陣列，若在最壞狀況下為沒有重疊，則會是 `O(N)`
