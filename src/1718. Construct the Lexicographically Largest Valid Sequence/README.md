# [M] 1718. 構造字典序最大的有效序列 (Construct the Lexicographically Largest Valid Sequence)

## 題目

- [LeetCode 連結](https://leetcode.com/problems/construct-the-lexicographically-largest-valid-sequence)
- **主題**：Backtracking
- **難度**：Medium (Rating: 2080)
- **Daily**：2025-02-16

## 題目描述

給定一個整數 `n`，找出一個滿足以下條件的序列：

1. 整數 `1` 在序列中只出現一次。
2. 介於 `2` 到 `n` 之間的每個整數在序列中恰好出現兩次。
3. 對於每個 `i` (2 ≤ i ≤ n)，`i` 的兩個出現位置之間的距離必須正好為 `i`。
4. 序列中兩個數 `a[i]` 和 `a[j]` 之間的距離定義為其索引的絕對差值，即 `|j - i|`。

請返回 **字典序最大的有效序列**。可以保證在給定的約束條件下，總能找到一個解。

**字典序比較**：
若兩個相同長度的序列 `a` 和 `b`，在第一個不同的位置上，`a` 的數字比 `b` 的對應數字大，則 `a` 被認為是字典序更大的。例如：

- `[0,1,9,0]` 比 `[0,1,5,6]` 字典序更大，因為它們在第三個數字開始不同，而 `9 > 5`。

## 範例

### 範例 1

```plain
輸入: n = 3
輸出: [3,1,2,3,2]
解釋: [2,3,2,1,3] 也是一個有效序列，但 [3,1,2,3,2] 是字典序最大的有效序列。
```

### 範例 2

```plain
輸入: n = 5
輸出: [5,3,1,4,3,5,2,4,2]
```

## 限制條件

- `1 <= n <= 20`

---

## 問題釐清

- 當 `n = 1` 時，題目的條件有辦法滿足嗎？
- 以範例一來理解的話，因為 `n = 3` 所以：
  - 條件 2：2、3 兩個數需剛好出現 2 次
  - 條件 3：2 彼此距離須為 2、3 彼此距離須為 3
- 字典序最大的定義，以範例一來理解的話，因為兩種可能解的第一位 3 > 2，所以是 `[3, 1, 2, 3, 2]`

## 提出思路

先找規律，因為要字典序最大，所以可以考慮從 `n` 開始將數字依照距離塞入陣列：

- `n = 3`：`[3, x, x, 3, x]` → `[3, x, 2, 3, 2]`
  - 因為 2 填入 `arr[1]` 的位置時，下個數沒辦法填入 `arr[3]`，所以只能往前進一位，最後得到 `[3, 1, 2, 3, 2`
- `n = 4`：`[4, x, x, x, 4, x, x]` → `[4, x, 3, x, 4, 3, x]` → `[4, 2, 3, 2, 4, 3, 1]`
- `n = 5`：
  - `[5, x, x, x, x, 5, x, x, x]` → `[5, x, 4, x, x, 5, 4, x, x]` → `[5, 3, 4, x, 3, 5, 4, x, x`
    - 這組解沒辦法填入距離為 2 的兩個 2，因此要找另一組
  - `[5, x, x, x, x, 5, x, x, x]` → `[5, x, x, 4, x, 5, x, 4, x]` → `[5, 3, 1, 4, 3, 5, 2, 4, 2]`
    - 將 4 往前遞進一位，剛好找到解

對 backtracking 還不太熟，參考 LC 官方教學寫一下筆記，可以用這樣的演算法來解題：

- 初始化
  - 一個符合長度的陣列：`2 * (n - 1) + 1` → `2n - 1`
  - 一個確認當前 `num` 是否已被填過的 bool array
- 因為題目限制 `1 ≤ n ≤ 20`，可以實作一個 backtracking function：
  - 設定 base case：當前索引與目標陣列長度相等時則完成，回傳 `true`
  - 因為要找最大字典序列，用一個迴圈從 `n` 開始依序填入每個數字 `num`
  - 填入過程中確認當前數字是否能找到距離剛好為 `num` 的兩個位置
  - 若當前位置被佔用，則往下個 index 遞進，並回溯當前修改
  - 反覆執行直到找到最佳解

## 實作

```ts
function constructDistancedSequence(n: number): number[] {
  // 依照 n 初始化目標陣列
  const length = 2 * n - 1;
  const resultSequence = Array.from({ length }, () => 0);
  const isNumberUsed = Array.from({ length: n + 1 }, () => false);

  // 利用 backtracking 來尋找最大字典序列
  function findSequence(currentIndex: number): boolean {
    // base case：已經找到最後一位且都能正確填滿，則完成
    if (currentIndex === length) {
      return true;
    }
    // 當前位置被佔用，尋找下一位
    if (resultSequence[currentIndex] !== 0) {
      return findSequence(currentIndex + 1);
    }

    // 從 n 開始往下填，直接就能是最大字典序列
    for (let num = n; num >= 1; num--) {
      if (isNumberUsed[num]) {
        continue;
      }

      // num = 1 時只出現一次
      if (num === 1) {
        resultSequence[currentIndex] = 1;
        isNumberUsed[1] = true;

        // 確認剩餘位置能被正確填入，否則重置
        if (findSequence(currentIndex + 1)) {
          return true;
        }

        resultSequence[currentIndex] = 0;
        isNumberUsed[1] = false;
      } else {
        const secondIndex = currentIndex + num;

        // 確認第二的數位置在邊界內，且還沒被佔用
        if (secondIndex < length && resultSequence[secondIndex] === 0) {
          resultSequence[currentIndex] = num;
          resultSequence[secondIndex] = num;
          isNumberUsed[num] = true;

          // 確認剩餘位置能被正確填入，否則重置
          if (findSequence(currentIndex + 1)) {
            return true;
          }

          resultSequence[currentIndex] = 0;
          resultSequence[secondIndex] = 0;
          isNumberUsed[num] = false;
        }
      }
    }

    return false;
  }

  findSequence(0);

  return resultSequence;
}
```

## 複雜度分析

- 時間複雜度：
  - 因為使用遞迴的方式去找在 `2n - 1` 個位置中，從 `n` 到 `1` 去放入數字的排列組合，從大到小去找的話，第一個數字有 `n` 種選擇 (因為距離須為 `n`)、第二個數字有 `n - 1` 種選擇…，所以找出每種組合的時間複雜度是 `O(n!)`
  - 但因為在部份不符合需求的狀況會提前被中斷，實際的時間複雜度應該大約介於 `O(n!)` 至 `O(2^n)` 之間
  - 那 `O(2^n)` 是怎麼來的？**舉例：當 `n = 3`**
    - 我們有一個長度為 `5` 的陣列：`[_, _, _, _, _]`
    - **第一層選擇數字 `3`**：
      - `3` 可以放在 `0` 和 `3`，或 `1` 和 `4` → **有 2 種選擇**
    - **第二層選擇數字 `2`**：
      - `2` 需要放置在相隔 2 的位置 → **有 2 種選擇**
    - **第三層選擇數字 `1`**：
      - `1` 只有 1 個位置可以選擇 → **1 種選擇**
    - 這樣的決策樹高度接近 `n`，每層最多有 2 個選擇，因此這種結構的**時間複雜度近似 `O(2^n)`**。
- 空間複雜度：
  - 結果陣列：`O(n)`
  - 狀態陣列：`O(n)`
  - 遞迴 call stack 空間：最壞狀況深度為 `O(2n - 1)`，約等於 `O(n)`
  - 總計：約為 `O(n)`

## 解題心得

這題也太難…，看了 rating 後是 2080，應該可以算是以前的 hard 了，有點超出自己目前能力太多，覺得與其刷 daily 還是先乖乖回頭刷完 Grind 75 實在些。
