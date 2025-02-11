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

- time: `O(n^2/m)`，如果 n 代表 `s` 字串長度，m 代表 `part` 的長度，在最差的狀況下 `s` 幾乎由 `part` 所組成，會需要進行 n 次 n/m 的操作，因此複雜度為 `O(n^2/m)`，如果 m 的長度為常數可忽略的話即為 `O(n^2)`。
- space: `O(n)`，每次 slice 或 replace 操作都可能產生一次新字串，最差狀況下可能同時使用 `O(n)` 的記憶體。

## 其他優化方法

好奇為什麼這題是 Medium，看了[官方教學](https://leetcode.com/problems/remove-all-occurrences-of-a-substring/editorial/)後覺得是剛好這題輸入的限制條件在長度 1000 內所以沒有 TLE，如果今天 `s` 長度很長的話就可能要用更有效率的 Stack 或 KMP 演算法來改寫。

改用 Stack 的方式可以提升效能，因為：

- 移除元素時接近 `O(1)` 時間，只要 `part` 出現在 stack 頂部，就能快速移除，而不需重新建構字串。
- 遍歷 `s` 一次就能完成處理，可避免多次掃描 `s`，減少不必要的運算。

演算法思路：

- 每次讀取 `s` 的字元時，將它推入 stack。
- 每次加入字元後，檢查 stack 頂部是否與 `part` 相同，如果相同則刪除。


```ts
// method 2: stack simulation
function checkMatch(stack: string[], part: string, partLength: number): boolean {
    for (let i = 0; i < partLength; i++) {
        if (stack[stack.length - partLength + i] !== part[i]) {
            return false;
        }
    }
    return true;
}

function removeOccurrences(s: string, part: string): string {
    const stack: string[] = [];
    const partLength = part.length;

    for (const char of s) {
        stack.push(char);

        // 當 stack 長度大於等於 part 長度時，檢查是否與 part 匹配
        if (stack.length >= partLength && checkMatch(stack, part, partLength)) {
            stack.splice(stack.length - partLength, partLength);
        }
    }

    return stack.join('');
}
```
