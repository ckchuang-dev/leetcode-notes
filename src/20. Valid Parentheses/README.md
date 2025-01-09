# [E] 20. 有效的括號 (Valid Parentheses)

## 題目

- [LeetCode 連結](https://leetcode.com/problems/valid-parentheses)
- 主題：Stack
- 難度：Easy

## 題目描述

給定一個僅包含以下字符的字串 `s`：`'('`、`')'`、`'{'`、`'}'`、`'['` 和 `']'`，判斷輸入字串是否有效。

**一個有效的字串需滿足以下條件：**

1. 左括號必須由相同類型的右括號關閉。
2. 左括號必須以正確的順序關閉。
3. 每個右括號都必須有相應的左括號。

#### **範例 1：**

```
輸入：s = "()"
輸出：true
```

#### 範例 2：

```
輸入：s = "()[]{}"
輸出：true
```

#### 範例 3：

```
輸入：s = "(]"
輸出：false
```

#### 範例 4：

```
輸入：s = "([])"
輸出：true
```

### 限制條件：

- `1 <= s.length <= 10^4`
- `s` 僅由括號字符組成：`'()[]{}'`。

## 問題釐清

- 一定會是先左後右才算是正確配對沒錯吧？如果像 `)(` 這樣就是 `false`
- 因為題目限制，`s` 長度至少為 1，所以不需考慮空字串？

## **提出測試案例**

題目蠻單純的，就依照四個範例寫測資。

## 提出思路

因為括號的配對會有順序性，所以在檢查每個字元時會適合用 stack 這樣的資料結構來做 LIFO：

- 做一個 object map 方便對應括號配對 (右括號為 key，左括號為 value)
- 宣告一個 stack 陣列儲存待配對的括號們
- 對輸入字串跑迴圈
  - 若當前字元在 object map 沒有對應 value，推入 stack
  - 有對應 value 則去 pop stack 檢查是否相等
    - 否則回傳 false 結束函式
    - 是則繼續
- 迴圈能跑完都沒回傳，則代表全部合法，回傳 true

以註解表示：

```ts
// declare parentheses map

export default function isValid(s: string): boolean {
  // declare a stack array to store parentheses

  // run a for loop for each char
    // check current char map to any value with parentheses map or note
      // yes, pop stack value to check if equal
        // yes, continue
        // no, return false
      // no, push current char into stack

  // check whether stack is empty, return true when empty
}
```

## 實作

```ts
// declare parentheses map
const PARENTHESES_MAP: Record<string, string> = {
  ')': '(',
  ']': '[',
  '}': '{'
};

export default function isValidParentheses(s: string): boolean {
  // declare a stack array to store parentheses
  const stack: string[] = [];
  // run a for loop for each char
  for (let c of s) {
    const target = PARENTHESES_MAP[c];
    // check current char map to any value with parentheses map or note
    if (target) {
      // yes, pop stack value to check if equal
      const value = stack.pop();

      if (value !== target) {
        return false;
      }
    } else {
      // no, push current char into stack
      stack.push(c);
    }
  }

  // check whether stack is empty, return true when empty
  return stack.length === 0;
}
```

## 撰寫測試驗證

```ts
import isValidParentheses from './isValidParentheses';

describe('Valid Parentheses', () => {
  test.each([
    ['()', true],
    ['()[]{}', true],
    ['(]', false],
    ['([])', true],
    ['(', false]
  ])('Given "%s" as input, should return %s', (input, expected) => {
    expect(isValidParentheses(input)).toBe(expected);
  });
});
```
