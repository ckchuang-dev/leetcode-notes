# [E] 1790. 檢查是否能透過一次交換使字符串相等 (Check if One String Swap Can Make Strings Equal)

## 題目

- [LeetCode 連結](https://leetcode.com/problems/check-if-one-string-swap-can-make-strings-equal)
- **主題**：String、Hash Table
- **難度**：Easy
- **Daily**：2025-02-05

## 題目描述

給定兩個長度相等的字串 `s1` 和 `s2`。一次「字串交換」是一個操作，指選擇一個字串中的兩個索引（不一定不同）並交換它們對應的字元。

如果能透過最多一次字串交換使 `s1` 和 `s2` 相等，則返回 `true`，否則返回 `false`。

### 範例 1

```plain
輸入：s1 = "bank", s2 = "kanb"
輸出：true
說明：例如，交換 `s2` 的第一個字元與最後一個字元，使其變為 "bank"。
```

### 範例 2

```plain
輸入：s1 = "attack", s2 = "defend"
輸出：false
說明：無論如何交換，都無法使兩個字串相等。
```

### 範例 3

```plain
輸入：s1 = "kelb", s2 = "kelb"
輸出：true
說明：兩個字串已經相等，因此不需要進行交換。
```

### 限制條件

- `1 <= s1.length, s2.length <= 100`
- `s1.length == s2.length`
- `s1` 和 `s2` 只包含小寫英文字母。

## 提出思路

- 處理能提前回傳的邊界條件
  - 兩字串長度不同：回傳 false
  - 兩字串相等：回傳 true
- 用兩個 hash map 去存每個字串中各個字母出現頻率
- 因為題目要求要在一次交換內讓兩字串相等，相當於在第一次跑每個字母的迴圈過程中發現有兩個以上的不同時，則提早回傳 false
- 最後根據 hash map 再跑一次迴圈比對是否有數量不同的狀況，如果有則一定無解，反之

## 實作

```ts
function areAlmostEqual(s1: string, s2: string): boolean {
  // edge case
  if (s1.length !== s2.length) return false;
  if (s1 === s2) return true;

  // hash map to calculate char frequencies
  const map1 = new Map<string, number>();
  const map2 = new Map<string, number>();
  let diffCount = 0;

  // for loop to check diff count and char frequencies
  for (let i = 0; i < s1.length; i++) {
    const char1 = s1[i];
    const char2 = s2[i];

    if (char1 !== char2) {
      diffCount++;
    }
    // early return because cannot be swapped than once
    if (diffCount > 2) {
      return false;
    }

    map1.set(char1, map1.has(char1) ? map1.get(char1)! + 1 : 1);
    map2.set(char2, map2.has(char2) ? map2.get(char2)! + 1 : 1);
  }

  // check char count
  for (let [k, v] of map1) {
    if (v !== map2.get(k)) {
      return false;
    }
  }

  return true;
}
```

## 複雜度分析

- 時間複雜度：第一個迴圈為 `O(n)`，第二個迴圈因為題目限制為輸入只有小寫字母所以是 `O(1)`，因此整題是 `O(n)`
- 空間複雜度：另外宣告的兩個 map 為常數，所以為 `O(1)`

## 其他解法

後來發現其實也可以不需要計算字母頻率：

```ts
function areAlmostEqual(s1: string, s2: string): boolean {
  if (s1 === s2) return true;

  // 紀錄不同的 index
  let diffIndices: number[] = [];

  for (let i = 0; i < s1.length; i++) {
    if (s1[i] !== s2[i]) {
      diffIndices.push(i);

      if (diffIndices.length > 2) return false;
    }
  }

  const [i, j] = diffIndices;

  // 只比較不同的兩個字母是否能互換為相等
  return s1[i] === s2[j] && s1[j] === s2[i];
}
```
