## [M] 2375. 根據 DI 字串構造最小數字 (Construct Smallest Number From DI String)

## 題目

- [LeetCode 連結](https://leetcode.com/problems/construct-smallest-number-from-di-string)
- **主題**：Backtracking、Monotonic Stack
- **難度**：Medium (Rating 1641)
- Daily：2025-02-18

## 題目描述

你會得到一個長度為 `n` 的 **0-索引**（0-indexed）字串 `pattern`，其中僅包含字元 `'I'`（表示遞增）和 `'D'`（表示遞減）。

根據以下條件，建立一個長度為 `n + 1` 的 **0-索引** 字串 `num`：

1. `num` 由數字 `'1'` 到 `'9'` 組成，其中每個數字最多使用一次。
2. 如果 `pattern[i] == 'I'`，則需滿足 `num[i] < num[i + 1]`。
3. 如果 `pattern[i] == 'D'`，則需滿足 `num[i] > num[i + 1]`。

請返回 **字典序最小** 的 `num`，使其符合上述條件。

### 範例 1

```plain
輸入：pattern = "IIIDIDDD"
輸出："123549876"
解釋：
- 在索引 0, 1, 2 和 4 位置，需要滿足 `num[i] < num[i+1]`。
- 在索引 3, 5, 6 和 7 位置，需要滿足 `num[i] > num[i+1]`。

一些可能的 `num` 值包括 `"245639871"`, `"135749862"` 和 `"123849765"`。
可以證明 `"123549876"` 是符合條件的最小可能字串。

需要注意 `"123414321"` 不是有效答案，因為數字 `'1'` 被重複使用。
```

### 範例 2

```plain
輸入：pattern = "DDD"
輸出："4321"
解釋：
一些可能的 `num` 值包括 `"9876"`, `"7321"`, 和 `"8742"`。
可以證明 `"4321"` 是符合條件的最小可能字串。
```

### 限制條件

- `1 <= pattern.length <= 8`
- `pattern` 只包含字母 `'I'` 和 `'D'`。

---

## 解題思路

跟前幾天的 [1718](https://leetcode.com/problems/construct-the-lexicographically-largest-valid-sequence) 有點像，也是求具有某種規則的字典序，也限制在長度不大的範圍，因此直覺也是用 DFS 的 backtracking 來找最小符合解。

解法步驟會像這樣：

- 宣告一個長度 10 的 boolean 陣列，存當前數字是否被用過
- 實作一個 backtracking 遞迴函式
  - 參數：當前深度、累加字串
- 從空字串觸發該函式
- 回傳最佳解

## 實作

```ts
function smallestNumber(pattern: string): string {
  // 宣告一個長度 10 的 boolean 陣列，存當前數字是否被用過，從 0~9 第一位不用
  const NUMBER_COUNT = 10;
  const usedNums = Array.from({ length: NUMBER_COUNT }, () => false);
  let result = '';

  // 實作一個 backtracking 遞迴函式
  const findMin = (depth: number, currentStr: string) => {
    if (depth === pattern.length + 1) {
      if (result === '' || currentStr < result) {
        result = currentStr;
      }
      return;
    }

    const prevNum =
      currentStr.length > 0
        ? parseInt(currentStr[currentStr.length - 1])
        : null;

    for (let i = 1; i <= 9; i++) {
      if (usedNums[i]) continue;

      // 確保符合 `I` 和 `D` 條件
      if (prevNum !== null) {
        if (pattern[depth - 1] === 'I' && prevNum >= i) continue;
        if (pattern[depth - 1] === 'D' && prevNum <= i) continue;
      }

      usedNums[i] = true;
      findMin(depth + 1, currentStr + i);
      usedNums[i] = false;
    }
  };

  // 從空字串觸發該函式
  findMin(0, '');

  // 回傳最佳解
  return result;
}
```

複雜度的部份，若 `pattern` 長度為 n：

- 時間複雜度：
  - 遞迴深度，最深會到 `n + 1` 層
  - 每層從 `1~9` 選一個數，越往下一層會遞減
  - 最壞狀況要嘗試總共 `P(9, n + 1)` 的排列數量，也就是 9 個數字選 n + 1 個排列數，算式為 `9! / (9 - (n + 1))!`
  - 以題目限制上 `n = 8`，會是 `P(9, 9)`，也就是 `9!` 共 36 萬多次計算
  - 但因為 `I` 與 `D` 的限制，實際會介於 `O(2^n)` 與 `O(n!)` 之間
- 空間複雜度：
  - 遞迴最大深度為 `O(n)`

## 改善解法

可以使用單調棧 (Greedy Approach with Stack、Monotonic Stack)，時間複雜度能降到 `O(n)`：

```ts
function smallestNumber(pattern: string): string {
  let result = '';
  const stack: number[] = [];

  for (let i = 0; i <= pattern.length; i++) {
    stack.push(i + 1);
    if (i === pattern.length || pattern[i] === 'I') {
      while (stack.length > 0) {
        result += stack.pop();
      }
    }
  }

  return result;
}
```
