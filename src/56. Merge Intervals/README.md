# [M] 56. 合併區間 (Merge Intervals)

## 題目

- [LeetCode 連結](https://leetcode.com/problems/merge-intervals)
- **主題**：Array
- **難度**：Medium

## 題目描述

給定一個區間的陣列 `intervals`，其中 `intervals[i] = [starti, endi]` 表示區間的起點和終點。請合併所有重疊的區間，並返回一個不重疊的區間陣列，使其能覆蓋輸入中的所有區間。

### 範例 1

```
輸入：intervals = [[1,3],[2,6],[8,10],[15,18]]
輸出：[[1,6],[8,10],[15,18]]
說明：由於區間 [1,3] 和 [2,6] 重疊，將它們合併為 [1,6]。
```

### 範例 2

```
輸入：intervals = [[1,4],[4,5]]
輸出：[[1,5]]
說明：區間 [1,4] 和 [4,5] 被認為是重疊的。
```

### 限制條件

- `1 <= intervals.length <= 10^4`
- `intervals[i].length == 2`
- `0 <= starti <= endi <= 10^4`

## 問題釐清

- 回傳的陣列是否為新陣列，而非對 `intervals` 直接操作？
- `intervals` 的限制看起來至少長度為 1，是否不需要處理空陣列的輸入？
- 是否不需要處理 `intervals[i]` 除了數字外的非法輸入？
- 每個區間的起點會是遞增排序過的嗎？如果不是的話，會需要額外的邏輯與測試案例。
- 輸出的結果會需要對每個區間的起點排序嗎？例如 `[[8,17],[15,18],[1,3],[2,6]]` 會期待輸出是 `[[8,18],[1,6]]` 或是 `[[1,6],[8,18]]` → 以下視為需要排序

## **提出測試案例**

- 能通過兩個範例
- 能通過每個區間的起點並非遞增排序這樣的案例
- 確認輸出陣列與輸入的參考不同
- 能通過區間長度為 `10^4` 的案例

## 提出思路

這題乍看之下跟 [Insert Interval](https://www.codefarmer.tw/topic/leetcode/57-insert-interval) 蠻像的，但考量到 `intervals` 可能是未排序的，在想最直覺的做法應該就是先針對每個區間的起點做升序 sorting，然後對排序後的區間們跑迴圈，一個一個檢查是否需要做合併，如果不需要就推入新陣列。

以註解表示以上的思路：

```ts
function mergeInterval(intervals: number[][]): number[][] {
  // declare result intervals
  // declare current interval
  // sorted intervals with new array
  // run a for loop for sorted intervals
  // push into result when last not overlapping
  // return result
}
```

## 實作

根據上面註解實作如下：

```ts
function mergeInterval(intervals: number[][]): number[][] {
  if (intervals.length === 0) {
    return [];
  }

  // declare result intervals
  const result: number[][] = [];

  // sorted intervals with new array
  const sortedIntervals = [...intervals].sort((a, b) => a[0] - b[0]);
  // declare current interval
  let [start, end] = sortedIntervals[0];

  // run a for loop for sorted intervals
  for (let i = 1; i < sortedIntervals.length; i++) {
    const [currentStart, currentEnd] = sortedIntervals[i];

    if (currentStart <= end) {
      start = Math.min(start, currentStart);
      end = Math.max(end, currentEnd);
    } else {
      result.push([start, end]);
      start = currentStart;
      end = currentEnd;
    }
  }

  if (result.length === 0 || start !== result[result.length - 1][0]) {
    result.push([start, end]);
  }

  // return result
  return result;
}
```

這裡因為 JavaScript 的 `sort` 是會直接對原陣列操作，原本想用 [toSorted](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toSorted)，但好像太新了 TypeScript 會報錯所以改成兼容版的 `[…intervals].sort`

## 撰寫測試

這裡還是加了空陣列的防呆，然後也補了連續相同區間與大陣列的案例：

```ts
describe('Merge Interval', () => {
  test.each([
    [
      [
        [1, 3],
        [2, 6],
        [8, 10],
        [15, 18]
      ],
      [
        [1, 6],
        [8, 10],
        [15, 18]
      ]
    ],
    [
      [
        [1, 4],
        [4, 5]
      ],
      [[1, 5]]
    ],
    [[], []],
    [
      [
        [8, 17],
        [15, 18],
        [1, 3],
        [2, 6]
      ],
      [
        [1, 6],
        [8, 18]
      ]
    ],
    [
      [
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0]
      ],
      [[0, 0]]
    ],
    [
      Array.from({ length: 10000 }, (_, i) => [i, i + 1]),
      Array.from({ length: 1 }, () => [0, 10000])
    ]
  ])('intervals %s as input should return %s', (intervals, expected) => {
    const result = mergeInterval(intervals);

    expect(result).toEqual(expected);
    expect(result).not.toBe(intervals);
  });
});
```

## 複雜度分析

- 時間複雜度：因為有做了排序，所以會是 `O(nlogn)`
- 空間複雜度：有另外使用了排序後的陣列，所以會是 `O(n)`
