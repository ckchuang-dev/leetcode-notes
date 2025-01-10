# [E] 242. 合法異位詞 (Valid Anagram)

## **題目**

- [LeetCode 連結](https://leetcode.com/problems/valid-anagram)
- **主題**：String
- **難度**：Easy

## 題目描述

給定兩個字串 `s` 和 `t`，如果 `t` 是 `s` 的**異位詞 (Anagram)**，則回傳 `true`，否則回傳 `false`。

### 範例 1：

**輸入：**
`s = "anagram"`
`t = "nagaram"`

**輸出：**
`true`

### 範例 2：

**輸入：**
`s = "rat"`
`t = "car"`

**輸出：**
`false`

### 限制條件：

- `1 <= s.length, t.length <= 5 * 10^4`
- `s` 和 `t` 只包含小寫英文字母。

### 進階挑戰：

如果輸入包含 Unicode 字元，你會如何調整你的解法來處理這種情況？

## 問題釐清

- Anagram 的意思是兩個字串包含相同的字母且每個字母出現的次數也相同？
- 是否需要連同 Unicode 字元一起考慮，或先針對限制條件實作？

## **出測試案例**

- 通過題目範例
- 進階：確認 Unicode 字元狀況
  - 「你好」、「好你」→ true
  - 「😆🤣」、「🤣😆」→ true

## 提出思路

如果這題只要處理小寫英文字母的話可以蠻單純的用 sort 來做字串比對解決，但如果要實作進階的 Unicode 字元案例暫時沒有想法。

## 實作

```ts
export default function isAnagram(s: string, t: string): boolean {
  const newS = s.split('').sort().join('');
  const newT = t.split('').sort().join('');

  return newS === newT;
}
```

## 撰寫測試

先寫一些基本測試：

```ts
describe('isAnagram', () => {
  test.each([
    ['anagram', 'nagaram', true],
    ['rat', 'car', false]
  ])('should return %s for isAnagram("%s", "%s")', (s, t, expected) => {
    expect(isAnagram(s, t)).toBe(expected);
  });
});
```

## 進階

如果要處理 Unicode 字元查到似乎可以用 [normalize()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/normalize) 這個方法，之後回頭研究下，今天時間不夠。