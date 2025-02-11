# [M] 1910. Remove All Occurrences of a Substring

## 題目

- [LeetCode 連結](https://leetcode.com/problems/remove-all-occurrences-of-a-substring)
- **主題**：String
- **難度**Medium
- **Daily**： 2025-02-11

## 解題思路

可以用個 while 迴圈重複判斷直到要回傳的新字串 `newStr` 不包含 `part` 即可：

```ts
function removeOccurrences(s: string, part: string): string {
  let newStr = s;

  while (newStr.includes(part)) {
    const index = newStr.indexOf(part);
    newStr = `${newStr.slice(0, index)}${newStr.slice(index + part.length)}`;
  }

  return newStr;
}
```

或另一種更簡潔的解法是：

```ts
function removeOccurrences(s: string, part: string): string {
  let newStr = s;

  while (newStr.includes(part)) {
    newStr = newStr.replace(part, '');
  }

  return newStr;
}
```

## 複雜度

- time: `O(n^2/m)`，如果 n 代表 `s` 字串長度，m 代表 `part` 的長度，在最差的狀況下 `s` 幾乎由 `part` 所組成，會需要進行 n 次 n/m 的操作，因此複雜度為 `O(n^2/m)`
- space: `O(n)`，每次 slice 或 replace 操作都可能產生一次新字串，最差狀況下可能同時使用 `O(n)` 的記憶體。
