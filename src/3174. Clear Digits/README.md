# [E] 3174. Clear Digits

## 題目

- [LeetCode 連結](https://leetcode.com/problems/clear-digits)
- **主題**：String, Stack
- **難度**：Easy
- **Daily**： 2025-02-10

## 解題思路

較基礎的 utility 練習題，一個 stack 去判斷數字或字串即可得到所求。

```ts
function clearDigits(s: string): string {
  const res: string[] = [];

  for (let c of s) {
    if (Number.isNaN(Number(c))) {
      res.push(c);
    } else {
      res.pop();
    }
  }

  return res.join('');
}
```

## 複雜度

- time: `O(n)`
- space: `O(n)`，最差狀況下都沒有數字，另外宣告一個長度為 n 的陣列做為 stack
