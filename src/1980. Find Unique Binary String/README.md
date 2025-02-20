# [M] 1980. Find Unique Binary String

## 題目

- [LeetCode 連結](https://leetcode.com/problems/find-unique-binary-string)
- **主題**：Array、Hash Table、String、Backtracking
- **難度**：Medium (Rating: 1361)
- **Daily**：2025-02-20

## 題目描述

給定一個包含 `n` 個唯一二進位字串的陣列 `nums`，其中每個字串的長度皆為 `n`，請回傳一個長度為 `n` 且**不**存在於 `nums` 中的二進位字串。如果有多個可能的答案，則可以回傳其中任意一個。

### 範例 1

```plain
輸入：nums = ["01","10"]
輸出："11"
說明："11" 不存在於 `nums`。此外，"00" 也是正確答案。
```

### 範例 2

```plain
輸入：nums = ["00","01"]
輸出："11"
說明："11" 不存在於 `nums`。此外，"10" 也是正確答案。
```

### 範例 3

```plain
輸入：nums = ["111","011","001"]
輸出："101"
說明："101" 不存在於 `nums`。此外，"000"、"010"、"100" 和 "110" 也都是正確答案。
```

### 限制條件

- `n == nums.length`
- `1 <= n <= 16`
- `nums[i].length == n`
- `nums[i]` 僅包含 `'0'` 或 `'1'`
- `nums` 中的所有字串皆唯一

---

## 釐清題目

- `n` 代表 `nums` 陣列裡每個數字字串的長度
- 每種測資中的字串都為長度 `n`，範圍在 `1~16` 之間
- 只要求任何一組正確解即可提前返回

## 提出思路

- 簡單處理一下 edge case (`nums` 長度為 0 時做防呆，雖然題目沒要求)
- 主邏輯直覺想到是可以用遞迴的方式去做決策樹，找到第一組遇到的可行解就 early return

以註解表示以上的思路：

```ts
function findDifferentBinaryString(nums: string[]): string {
  // edge case handling
  // get n
  // declare result string
  // implement a function to recursively find any match string and early return
  // base case：current string len === n AND nums not include current string
  // trigger initial func.
  // return result
}
```

## 實作

根據上面註解來實作，並在當前長度還沒到達 `n` 時，繼續下一層遞迴：

```ts
function findDifferentBinaryString(nums: string[]): string {
  // edge case handling
  if (nums.length === 0) {
    return '';
  }

  // get n
  const numLength = nums[0].length;

  // declare result string
  let matchedStr = '';

  // implement a function to recursively find any match string and early return
  const findMatchStr = (len: number, currentStr: string) => {
    // base case：current string len === n AND nums not include current string
    if (currentStr.length === numLength && !nums.includes(currentStr)) {
      matchedStr = currentStr;
      return;
    }

    if (currentStr.length < numLength) {
      findMatchStr(len + 1, currentStr + '0');
      findMatchStr(len + 1, currentStr + '1');
    }
  };

  // trigger initial func.
  findMatchStr(0, '');

  // return result
  return matchedStr;
}
```

雖然上面這個版本可行，但送出時 runtime 飆到 1339 ms。效率不是很好，原因是因為沒有真正做到 early return，因為就算找到時其他遞迴還是會繼續跑完，再稍微改一下：

```ts
function findDifferentBinaryString(nums: string[]): string {
  // edge case handling
  if (nums.length === 0) {
    return '';
  }

  // get n
  const numLength = nums[0].length;

  let matchedStr = '';

  // early return flag
  let found = false;

  // find any match string and early return
  const findMatchStr = (len: number, currentStr: string) => {
    // early return when the first solution found
    if (found) {
      return;
    }
    if (currentStr.length === numLength && !nums.includes(currentStr)) {
      matchedStr = currentStr;
      found = true;
      return;
    }

    if (currentStr.length < numLength) {
      findMatchStr(len + 1, currentStr + '0');
      findMatchStr(len + 1, currentStr + '1');
    }
  };

  // recursively gen pair
  findMatchStr(0, '');

  return matchedStr;
}
```

實測加上一個基本的 flag 後再跑一次降低到 0ms，也差真多有可能是壞掉了。

## 複雜度分析

如果 `n` 代表輸入的 `nums` 陣列中每個字的長度，以及 `nums` 的長度：

- 時間複雜度：
  - 深度為 `n` 的決策樹，每一層都在決定要選 `0` 或是 `1`
  - 最差情況時，當 `nums` 幾乎包含所有可能字串時，會需要從 `000...000` 一直遞迴到 `111...111`，這代表最差情況可能會遍歷所有 `2^n` 個可能的字串
  - 在每次找到長度為 `n` 的字串時，執行 `nums.includes(currentStr)` 會需要 `O(n)` 的複雜度
  - 綜上所述，最差狀況下可能會是 `O(2^n * n)`
- 空間複雜度：只會跟遞迴的 call stack 有關，會需要找到長度為 `n` 的深度，所以為 `O(n)`

## 其他解法探索

如果不使用遞迴來解的話，也可以試著把二進位字串轉成十進位數字：

```ts
function findDifferentBinaryStringNumber(nums: string[]): string {
  const integers = new Set<number>();

  // 轉換 nums 裡的二進位字串為數字，存入 Set
  for (const num of nums) {
    integers.add(parseInt(num, 2));
  }

  const n = nums.length;

  // 遍歷從 0 到 n，找出不在 Set 中的數字
  for (let num = 0; num <= n; num++) {
    if (!integers.has(num)) {
      // 轉成二進位
      let ans = num.toString(2);

      // 確保長度為 n，補零
      return ans.padStart(n, '0');
    }
  }

  return '';
}
```

此解法的複雜度：

- 一個迴圈轉數字塞入 Set 並轉成十進位：`O(n)`，其中轉十進位的複雜度為最差可能為 `O(n)`，因為要 parse n 個字元，因此總共是 `O(n^2)`
- 一個迴圈確認當前數字不在 Set 中：`O(n)`，但其中在用 `num.toString(2)` 轉二進位的操作上理論上是 `O(logN)`，但又加上 padStart 的操作是 `O(n)`，所以總共也是可能接近 `O(n^2)`
- 因此最差狀況時間複雜度為 `O(n^2)`
- 另外用了一個 Set 存數字，空間複雜度為 `O(n)`

Cantor's Diagonal Argument：神奇的演算法，且剛好限制 `nums` 長度為 `n`，所以這做法是可行的，就是將 `nums` 做成一個方陣，並求其對角線上的每個 `1` 或 `0` 的翻轉，一定為可行解，可以將時間複雜度降到 `O(n)`，空間複雜度降到 `O(1)` (如果不計入回傳字串的空間的話)：

```ts
function findDifferentBinaryString(nums: string[]): string {
  const len = nums.length;
  const ans = Array.from({ length: len }, () => '');

  for (let i = 0; i < nums.length; i++) {
    ans[i] = nums[i][i] === '0' ? '1' : '0';
  }

  return ans.join('');
}
```

官方教學沒提到，但討論區其他人提到最直覺是想到 Trie 的方式，雖然對這個結構還不太熟，但看起來像是實際做成一個稱作 Trie 的前綴樹，然後跟一開始的遞迴方式有點像去建造出每種可能的字串。但實際上空間複雜度會更大到 `O(n^2)`。
