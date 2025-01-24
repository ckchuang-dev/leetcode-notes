# [M] 3. 最長不重複字元子字串 (Longest Substring Without Repeating Characters)

## 題目

- [LeetCode 連結](https://leetcode.com/problems/longest-substring-without-repeating-characters)
- **主題**：String
- **難度**：Medium

## 題目描述

給定一個字串 `s`，找出其中 **不包含重複字元** 的最長子字串的長度。

### 範例 1

```
輸入：s = "abcabcbb"
輸出：3
解釋：最長不重複字元子字串為 "abc"，長度為 3。
```

### 範例 2

```
輸入：s = "bbbbb"
輸出：1
解釋：最長不重複字元子字串為 "b"，長度為 1。
```

### 範例 3

```
輸入：s = "pwwkew"
輸出：3
解釋：最長不重複字元子字串為 "wke"，長度為 3。注意答案必須是子字串，"pwke" 是子序列而非子字串。
```

### 限制條件

- `0 <= s.length <= 5 * 10^4`
- `s` 由英文字母、數字、符號和空格組成。

## 問題釐清

- 輸入空字串應該得到 0？
- 大小寫應該視為不同的字元？
- 字串內容應不需考慮 ASCII code 之外的編碼格式 (像是 emoji、特殊文字等等)？

## **提出測試案例**

- 能通過三個範例
- 空字串應得到 0
- 同時有大小寫、數字、符號、空格的案例

## 提出思路

因為是找「最長子字串」，一開始除了暴力解沒想到其他解法，可以分別以每個字元為起點後檢查每個不重複字元子字串的最大長度，最後再取最大值即為所求。實作上可能需要兩個迴圈：

以註解表示以上的思路：

```ts
export function lengthOfLongestSubstring(s: string): number {
  // if empty string, return 0
  // declare max length
  // run nested 2 loop to calculate max length of each substrings
  // return result
}
```

## 實作

```ts
function lengthOfLongestSubstring(s: string): number {
  // if empty string, return 0
  if (s.length === 0) {
    return 0;
  }

  // declare max length
  let maxLength = 0;

  // run nested 2 loop to calculate max length of each substrings
  for (let i = 0; i < s.length; i++) {
    const seenChar = new Set<string>();

    for (let j = i; j < s.length; j++) {
      if (seenChar.has(s[j])) {
        break;
      }

      maxLength = Math.max(maxLength, j - i + 1);
      seenChar.add(s[j]);
    }
  }

  // return result
  return maxLength;
}
```

## 撰寫測試

```ts
describe('lengthOfLongestSubstring', () => {
  test.each([
    ['abcabcbb', 3],
    ['bbbbb', 1],
    ['pwwkew', 3],
    ['', 0],
    ['aA1! aA', 5],
    ['!@#$%^&*()', 10],
    ['AaBbCc', 6]
  ])("input '%s' should return %i", (input, expected) => {
    expect(lengthOfLongestSubstring(input)).toBe(expected);
  });
});
```

## 複雜度分析

- 時間複雜度：因為用了兩個迴圈，會是 `O(n^2)`
- 空間複雜度：額外用了個 Set 來紀錄是否看過重複字元，最長可能到 `O(n)`

## 進階挑戰或其他解法探索

因為上面的暴力解應不是最佳解，後來查了下這題算是經典的 sliding window 問題，可以使用這個演算法將時間複雜度降到 `O(n)`，另外筆記一下解法之後回來複習下：

```ts
function lengthOfLongestSubstring(s: string): number {
  const seen = new Map<string, number>();
  let maxLength = 0;
  let start = 0;

  for (let end = 0; end < s.length; end++) {
    const char = s[end];

    // 如果字元已存在，更新起始位置為上一個出現位置的下一個
    if (seen.has(char) && seen.get(char)! >= start) {
      start = seen.get(char)! + 1;
    }

    // 記錄字元的最新位置
    seen.set(char, end);

    // 計算當前視窗的長度
    maxLength = Math.max(maxLength, end - start + 1);
  }

  return maxLength;
}
```
