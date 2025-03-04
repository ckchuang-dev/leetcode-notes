# [M] 1780. Check if Number is a Sum of Powers of Three

## 題目

- [LeetCode 連結](https://leetcode.com/problems/check-if-number-is-a-sum-of-powers-of-three)
- **主題**：Math, Recursion
- **難度**：Medium (Rating: 1505)
- **Daily**：2025-03-04

## 題目描述

給定一個整數 `n`，如果可以用 **不同的** 3 的冪次總和來表示 `n`，則返回 `true`，否則返回 `false`。

一個整數 `y` 是 3 的冪次，當且僅當存在一個整數 `x` 使得 `y == 3^x`。

### 範例 1

```plain
輸入：n = 12
輸出：true
解釋：12 = 3^1 + 3^2
```

### 範例 2

```plain
輸入：n = 91
輸出：true
解釋：91 = 3^0 + 3^2 + 3^4
```

### 範例 3

```plain
輸入：n = 21
輸出：false
```

### 限制條件

- `1 <= n <= 10^7`

---

## 解題思路

題目蠻單純的，直覺想到的做法是 backtracking，也就是從 0 去加總做一棵決策樹，每個冪次來做決定取或不取，終止條件為當前加總與 `n` 相等，或當前冪次超越 `n`：

## 實作

```ts
function checkPowersOfThree(n: number): boolean {
  // apply backtracking algo. to check all cases for powers of three
  const backtrack = (power: number, sum: number): boolean => {
    if (sum === n) {
      return true;
    }
    if (Math.pow(3, power) > n) {
      return false;
    }

    const addCurrent = backtrack(power + 1, sum + Math.pow(3, power));
    const skipCurrent = backtrack(power + 1, sum);

    return addCurrent || skipCurrent;
  };

  return backtrack(0, 0);
}
```

## 複雜度分析

- 時間複雜度：
  - 這個時間複雜度有點難分析，後來參考了官方教學後才知道是 `O(2 ^ log3​n) ≈ O(n)`
  - 因為所有考慮的狀況為 `3^n` 不超過 `n`，也就是當今天可以選擇的數是 `3^0, 3^1, 3^2…3^k`，而其中最大的 `3^k` 不能超過 `n`，也就是 `3^k ≤ n`，可以推得 `k ≤ log3n`
  - 而這幾個 3 的冪次決策是「選」或「不選」，因此對每個數而言都有兩種選擇，也就是說整個決策樹跑完最差的狀況會到 `O(2 ^ log3n)`
  - 而對數變換的性質是 `A ^ logbX = X ^ logbA`，也就是 `2 ^ log3n` = `n ^ log3(2)` = `n^(0.63)`，所以可以推得約等於 `O(n)`
  - 完全在複習高中數學了嗎…
- 空間複雜度：
  - 同上敘述最多有 `log3(n)` 個遞迴深度的 call stack，因此空間服雜度為 `O(log3(n))`

## 其他解法

因為題目有提到需要為「不同」的冪次相加，因此看到一種利用數學特性的更優時間複雜度的解法，主要是用 greedy 的方式找出最靠近 `n` 的 `power`，再依序往下減去確認沒有一個冪次被使用兩次就能確認該值是否為 3 的冪次的加總。

```ts
function checkPowersOfThree(n: number): boolean {
  let power = 0;
  let num = n;

  // find the largest power closed to n
  while (3 ** power <= n) {
    power++;
  }

  while (num > 0) {
    if (num >= 3 ** power) {
      num -= 3 ** power;
    }
    // check the same power appear only once
    if (num >= 3 ** power) {
      return false;
    }

    power--;
  }

  return true;
}
```

看說明這是因為這跟三進位數字特性有關，當一個十進位數字轉成三進位後，數字中只有 `0` 與 `1` 則這個數就一定可以被不同的 3 的冪次相加組成，這是因為當今天有個三進位數字中含有 `2` 時，代表其中的某個冪次會被用上兩次，也就與題目要求不相符。

- 時間複雜度：迴圈最多跑到最接近 `n` 的 `3^k`，因此是 `O(log3 N)`
- 空間複雜度：只有用上額外的常數變數，所以是 `O(1)`

而參考上面的這個數學特性的話，其實還有更簡便的寫法：

```ts
function checkPowersOfThree(n: number): boolean {
  let num = n;

  while (num > 0) {
    if (num % 3 === 2) {
      return false;
    }
    num = Math.floor(num / 3);
  }

  return true;
}
```

這題真的是在考數學特性呢…
