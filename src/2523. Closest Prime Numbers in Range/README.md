# \[M\] 2523. Closest Prime Numbers in Range

## 題目

- [LeetCode 連結](https://leetcode.com/problems/closest-prime-numbers-in-range)
- **主題**：Math, Prime Numbers
- **難度**：Medium (Rating: 1649)
- **Daily**：2025-03-07
- 公司：只有 TikTok 半年前考過

## 題目描述

給定兩個正整數 `left` 和 `right`，請找到兩個整數 `num1` 和 `num2`，滿足以下條件：

1. `left <= num1 < num2 <= right`
2. `num1` 和 `num2` 都是質數。
3. `num2 - num1` 是所有符合條件的數對中最小的。

請返回一個正整數陣列 `ans = [num1, num2]`。如果有多組符合條件的數對，請選擇 `num1` 最小的那一組。如果沒有符合條件的數對，則返回 `[-1, -1]`。

### 範例 1

```plain
輸入：left = 10, right = 19
輸出：[11,13]
說明：10 到 19 之間的質數為 11、13、17 和 19。
最接近的一對數間距為 2，可以是 [11,13] 或 [17,19]。
由於 11 小於 17，因此返回 [11,13]。
```

### 範例 2

```plain
輸入：left = 4, right = 6
輸出：[-1,-1]
說明：在這個範圍內只有一個質數，無法滿足條件。
```

### 限制條件

- `1 <= left <= right <= 10^6`

---

## 提出思路

又，又數學題，已經忘了質數的特性，看了教學後需要用一個 Sieve of Eratosthenes 演算法的做法先找出符合範圍的質數們，再根據這些質數來找最短距離。

而這個找質數的演算法，看到 PJCHEN [這篇](https://pjchender.blogspot.com/2017/09/algorithm-sieve-of-eratosthenes.html)寫的蠻簡潔易懂的，基本上就是先宣告一個最大邊界的 boolean array，然後從每個質數開始去把他的倍數都設成 false，且只要找到根號 n 範圍即可 (質數特性)，最後回傳 filter 後的索引陣列，這邊因為題目有最小邊界也順便篩選一下：

```ts
// find primes with Sieve of Eratosthenes algo.
function findPrimes(min: number, max: number): number[] {
  if (max < 2) return [];

  const isPrimeArr = Array.from({ length: max + 1 }, () => true);

  isPrimeArr[0] = false;
  isPrimeArr[1] = false;

  for (let i = 2; i <= Math.sqrt(max); i++) {
    if (isPrimeArr[i]) {
      for (let j = 2; i * j <= max; j++) {
        isPrimeArr[i * j] = false;
      }
    }
  }

  return isPrimeArr.reduce<number[]>((accu, curr, index) => {
    if (curr && index >= min) {
      accu.push(index);
    }
    return accu;
  }, []);
}
```

最後根據這個質數陣列再跑個迴圈找最小距離，基本上如果是找到最小的 `num1` 且距離等於 2 即可 break loop：

```ts
function closestPrimes(left: number, right: number): number[] {
  const primes = findPrimes(left, right);

  if (primes.length < 2) {
    return [-1, -1];
  }

  let minDiff = Infinity;
  let [num1, num2] = [-1, -1];

  for (let i = 1; i < primes.length; i++) {
    const newDiff = primes[i] - primes[i - 1];
    if (newDiff < minDiff) {
      minDiff = newDiff;
      [num1, num2] = [primes[i - 1], primes[i]];
    }

    if (newDiff === 2) {
      break;
    }
  }

  return [num1, num2];
}
```

## 複雜度分析

如果 left 代表 L、right 代表 R：

- 時間複雜度：`O(R * log(log(R)) + (R - L))`
  - 找質數的部分看起來是個小複雜的數學推導，覺得又脫離演算法了先不研究，結果為 `O(R * log(log(R)))`
  - 找最短距離為一個 `R - L` 的迴圈，因此為 `O(R - L)`
- 空間複雜度：找質數時另外宣告的陣列最大為 `O(R)`

## 心得

這題有點太偏門了，不是很值得回頭刷。
