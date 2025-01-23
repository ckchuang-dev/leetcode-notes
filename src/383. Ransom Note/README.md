# [E] 383. 贖金信 (Ransom Note)

## 題目

- [LeetCode 連結](https://leetcode.com/problems/ransom-note)
- **主題**：Hash Table
- **難度**：Easy

## 題目描述

給定兩個字串 `ransomNote` 和 `magazine`，若可以使用 `magazine` 的字母來構建 `ransomNote`，則返回 `true`，否則返回 `false`。

`magazine` 中的每個字母在 `ransomNote` 中只能使用一次。

### 範例 1

```
輸入：ransomNote = "a", magazine = "b"
輸出：false
```

### 範例 2

```
輸入：ransomNote = "aa", magazine = "ab"
輸出：false
```

### 範例 3

```
輸入：ransomNote = "aa", magazine = "aab"
輸出：true
```

### 限制條件

- `1 <= ransomNote.length, magazine.length <= 10^5`
- `ransomNote` 和 `magazine` 僅由小寫英文字母組成

## 問題釐清

- 確認輸入只有字母小寫？不需處理大小寫轉換及其他型別輸入？
- 需要處理空字串的輸入嗎？
- `ransomNote` 如果可以是空字串的話，應該會回傳 `true`？
- `magazine` 中的每個字母只能使用一次，就像是從雜誌中去剪字母一樣，用過就不能再用了
- 如果 `ransomNote` 長度大於 `magazine` 是否一定是 `false`？

## 測試案例

- 通過題目三個範例
- 空字母時回傳 `false`
- `ransomNote` 長度大於 `magazine`

## 提出思路

- 排除邊界條件：空字串、`ransomNote` 長度大於 `magazine` 回傳 `false`
- 用一個 map 去記錄 `magazine` 中每個字母出現的次數
- 對 `ransomNote` 跑迴圈去檢查 map 中每個字母的數量是否足夠用
  - 有不夠即回傳 `false`
  - 都夠用則回傳 `true`

用註解表示實作方向如下：

```ts
export function canConstruct(ransomNote: string, magazine: string): boolean {
  // return false when input are empty or ransomNote > magazine
  // declare a hash table to count each char amount
  // run a for loop for ransomNote to check if each char amount are enough
  // return true when pass
}
```

## 實作

```typescript
function canConstruct(ransomNote: string, magazine: string): boolean {
  // return false when input are empty or ransomNote > magazine
  if (
    (ransomNote.length !== 0 && magazine.length === 0) ||
    ransomNote.length > magazine.length
  ) {
    return false;
  }

  // declare a hash table to count each char amount
  const charMap: Record<string, number> = {};

  for (let c of magazine) {
    if (charMap[c]) {
      charMap[c]++;
    } else {
      charMap[c] = 1;
    }
  }

  // run a for loop for ransomNote to check if each char amount are enough
  for (let c of ransomNote) {
    if (charMap?.[c] > 0) {
      charMap[c]--;
    } else {
      return false;
    }
  }
  // return true when pass
  return true;
}
```

## 撰寫測試

```typescript
describe('Ransom Note', () => {
  test.each([
    ['a', 'b', false],
    ['aa', 'ab', false],
    ['aa', 'aab', true],
    ['', 'a', true],
    ['', '', true],
    ['a', '', false],
    ['abc', 'a', false],
    ['abc', 'abc', true]
  ])('should return %i for input %s', (ransomNote, magazine, expected) => {
    expect(canConstruct(ransomNote, magazine)).toBe(expected);
  });
});
```

## 複雜度分析

- 時間複雜度：`O(m + n)`，因為分別跑兩個迴圈，所以是兩個字串長度相加
- 空間複雜度：`O(1)`，因為使用的 hash map 頂多是 26 個小寫字母
