# [E] 409. 最長回文子串 (Longest Palindrome)

## 題目

- [LeetCode 連結](https://leetcode.com/problems/longest-palindrome)
- **主題**：String
- **難度**：Easy

## 題目描述

給定一個只包含小寫或大寫英文字母的字串 `s`，請回傳可以用這些字母組成的**最長回文串**的長度。字母是**區分大小寫**的，例如 `"Aa"` 並不是回文。

### 範例 1

```plain
輸入：s = "abccccdd"
輸出：7
說明：可以組成的最長回文串之一是 "dccaccd"，其長度為 7。
```

### 範例 2

```plain
輸入：s = "a"
輸出：1
說明：可以組成的最長回文串是 "a"，其長度為 1。
```

### 限制條件

- `1 <= s.length <= 2000`
- `s` 僅包含小寫和/或大寫英文字母。

## 提出思路

今天有點炸，來直接做一題簡單的練練手。

這題直覺上來思考的話，對字串每個字元跑迴圈，用一個 object map 去計算所有字元出現的次數，再將這個 map 分為奇數、偶數兩種狀況：

- 偶數：一定可回文，最大長度加上該字元出現次數
- 奇數：最大長度加上該字元出現次數減一

最後在回傳前檢查輸入字串長度是否比最大長度大，如果是則加一，代表回文字串中有某個奇數位字元。

以註解表示思路的話會像這樣：

```ts
export function longestPalindrome(s: string): number {
  // return edge case

  // calculate each char count in loop

  // check each char for summing up max len
    // even: sum all len
    // odd: sum len - 1

  // check if s.length > max len
}
```

## 實作

```ts
export function longestPalindrome(s: string): number {
  // return edge case
  if (s.length < 2) {
    return s.length;
  }

  const charCountMap: Record<string, number> = {};

  // calculate each char count in loop
  for (let c of s) {
    charCountMap[c] = (charCountMap[c] ?? 0) + 1;
  }

  // check each char for summing up max len
  const maxLen = Object.values(charCountMap).reduce((sum, curr) => {
    if (curr % 2 === 0) {
      // even: sum all len
      return sum + curr;
    } else {
      // odd: sum len - 1
      return sum + curr - 1;
    }
  }, 0);

  // check if s.length > max len
  return s.length > maxLen ? maxLen + 1 : maxLen;
}
```

## 撰寫測試

```ts
describe('Longest Palindrome', () => {
  test.each([
    ['abccccdd', 7],
    ['a', 1],
    ['abc', 1],
    ['aaa', 3],
    ['abb', 3],
    ['abba', 4]
  ])('longestPalindrome("%s") returns %i', (input, expected) => {
    expect(longestPalindrome(input)).toBe(expected);
  });
})
```
