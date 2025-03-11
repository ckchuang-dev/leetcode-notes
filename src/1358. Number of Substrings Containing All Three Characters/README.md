# \[M\] 1358. Number of Substrings Containing All Three Characters

## 題目

- [LeetCode 連結](https://leetcode.com/problems/number-of-substrings-containing-all-three-characters/)
- **主題**：Sliding Window
- **難度**：Medium (Rating: 1646)
- **Daily**：2025-03-11

## 題目描述

給定一個只包含字元 'a'、'b' 和 'c' 的字串 `s`，請返回包含所有這三個字元至少一次的子字串的數目。

### 範例 1

```plain
輸入：s = "abcabc"
輸出：10
解釋：包含所有字符 'a'、'b' 和 'c' 的子字符串有 "abc"、"abca"、"abcab"、"abcabc"、"bca"、"bcab"、"bcabc"、"cab"、"cabc" 和 "abc"（再次出現）。
```

### 範例 2

```plain
輸入：s = "aaacb"
輸出：3
解釋：包含所有字符 'a'、'b' 和 'c' 的子字符串有 "aaacb"、"aacb" 和 "acb"。
```

### 範例 3

```plain
輸入：s = "abc"
輸出：1
```

### 限制條件

- `3 <= s.length <= 5 x 10^4`
- `s` 只包含字符 'a'、'b' 或 'c'。

---

## 問題釐清

- 從範例一看起來，相同的子字串如果出現在不同索引位置也會視為一組獨立的解？像其中的 `abc`
- 如果輸入字串為 `aaa` 這樣預期回傳 0 嗎？

## 提出思路

如果直接暴力解的話會花費 `O(n^2)` 的時間，也就是用雙層迴圈依序檢查以每個字元為開頭的子字串們是否符合要求。

但如果要再讓演算法更有效率的話就可以使用 sliding window 來解，先以範例一的 `abcabc` 來理解的話會像這樣：

- 用兩個指標 `left` 與 `right` 代表窗口的左右邊界
- 以第一個字元的 `a` 為開頭，開始用一個 hash map 去紀錄三個字元的出現頻率，當此時 hash map 中的次數沒有 a、b、c 都出現一次時，則繼續移動右邊界
- 直到移動至 `c` 時，此時找到第一組解，而要延伸這組解有包含它的其他子字串，就是當前右邊界往後的長度，也就是此時可以累加會有 `s.length - right` 組解
- 接下來開始移動左邊界，並對 hash map 減掉 `a` 一次，此時因為已經不符合需求，於是要再移動右邊界來找到下一組解，如此反覆操作即可找完

整理一下上面的演算法會像這樣的想法：

- 宣告一個 hash map 去存 a、b、c 出現次數
- 宣告兩個指標 `left` 與 `right` 代表窗口的左右邊界
- 宣告累加變數
- 跑一個迴圈去遞增 `right` 邊界直到字串長
  - 將當前字元塞入 hash map 中
  - 檢查 hash map 如果有符合條件的子字串時，跑一個 while 迴圈來縮減左邊界並計數
    - 累加為 `s.length - right`
    - 移動 `left` 並減掉對應的字元次數
    - 直到不符條件後繼續外層迴圈

## 實作

```ts
function numberOfSubstrings(s: string): number {
  // declare hash map
  const charMap: Record<string, number> = {
    a: 0,
    b: 0,
    c: 0
  };
  // declare sliding window left and right pointer
  // declare accumulator
  let left = 0,
    res = 0;

  // for loop for right pointer
  for (let right = 0; right < s.length; right++) {
    charMap[s[right]]++;

    // when match condition, sum up and shrink left pointer
    while (charMap.a > 0 && charMap.b > 0 && charMap.c > 0) {
      res += s.length - right;
      charMap[s[left]]--;
      left++;
    }
  }

  // return result
  return res;
}
```

## 複雜度分析

假設 `n` 是輸入字串的長度：

- 時間複雜度：最壞狀況下左右邊界會各自拜訪過同個字元兩次，因此為 `O(n)`
- 空間複雜度：都是固定常數的額外變數，因此為 `O(1)`

## 心得

一樣是 sliding window，但比昨天的 3306 親切不少，且這題的難度相對是近期大廠會出現的面試題，蠻值得回頭刷的。因為對 sliding window 一直還沒融會貫通，也看了下 neetcode 的[影片版解說](https://www.youtube.com/watch?v=iSf7d2ldp70)，真的有清楚推推。
