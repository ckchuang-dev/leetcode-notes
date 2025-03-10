# \[M\] 3306. Count of Substrings Containing Every Vowel (母音) and K Consonants (子音) II

## 題目

- [LeetCode 連結](https://leetcode.com/problems/count-of-substrings-containing-every-vowel-and-k-consonants-ii/)
- **主題**：Hash Table, String, Sliding Window
- **難度**：Medium (Rating: 2200)
- **Daily**：2025-03-10

## 題目描述

給定一個字串 `word` 和一個非負整數 `k`。

請返回 `word` 中包含每個母音（`a`、`e`、`i`、`o` 和 `u`）至少一次且恰好有 `k` 個子音的子字串總數。

### 範例 1

```plain
輸入：word = "aeioqq", k = 1
輸出：0
解釋：
沒有包含所有母音的子字串。
```

### 範例 2

```plain
輸入：word = "aeiou", k = 0
輸出：1
解釋：
唯一包含所有母音且沒有子音的子字串是 word[0..4]，即 "aeiou"。
```

### 範例 3

```plain
輸入：word = "ieaouqqieaouqq", k = 1
輸出：3
解釋：
包含所有母音且有一個子音的子字串有：
- word[0..5]，即 "ieaouq"。
- word[6..11]，即 "qieaou"。
- word[7..12]，即 "ieaouq"。
```

### 限制條件

- `5 <= word.length <= 200,000`
- `word` 僅由小寫英文字母組成。
- `0 <= k <= word.length - 5`

---

## 釐清問題

- 從題目看起來 `k` 只限制了子字串中的子音數量，但母音則可能可以出現多次？

## 測試案例

- 參考討論區發現有兩個極端的測試案例可能會讓解法上少繞一點彎路：
  - word = "iqeaouqi", k = 2 ⇒ 輸出應為 3
    - 因為 `iqeaouq`、`qeaouqi`，以及最關鍵的 `iqeaouqi` 都是符合的
  - word = "aouiei", k = 0 ⇒ 輸出應為 2
    - 同理 `aouie` 跟 `aouiei` 都符合

## 提出思路

看這個 rating 超出目前能力，直接參考官方解答學習一下。

相似問題：

- [3\. Longest Substring Without Repeating Characters](https://leetcode.com/problems/longest-substring-without-repeating-characters/)
- [2461\. Maximum Sum of Distinct Subarrays With Length K](https://leetcode.com/problems/maximum-sum-of-distinct-subarrays-with-length-k/)

解法有三種：

- 暴力解：遍歷全部子字串找到符合的，但會浪費太多時間處理重複的解
- 基本 sliding window：直接以找「剛好 k 個子音」的解，會需要另外處理一個 `nextConsonant` 的陣列來輔助判斷，空間複雜度會增加
- 最佳解版本 sliding window：放寬條件改去找「至少 k 個子音」的解，相對簡單

直接從最佳解出發的話，可以轉為解決以下兩個子問題：

1. 找出包含每個母音至少一次且包含**至少** `k` 個子音的子字串總數，記為 `f(k)`；
2. 找出包含每個母音至少一次且包含**至少** `k + 1` 個子音的子字串總數，記為 `f(k + 1)`。

如此一來，要找的「剛好 k 個子音」的解就是 `f(k) - f(k + 1)`。

也就是說，可以把問題轉為去設計一個函式 `f(k)` 來計算包含每個母音至少一次且包含「至少」 `k` 個子音的子字串總數。

使用 sliding window 的話，實作如下：

```ts
// 判斷字元是否為母音
const isVowel = (c: string): boolean => {
  return ['a', 'e', 'i', 'o', 'u'].includes(c);
};

// 計算至少 k 個子音的子字串數量
const atLeastK = (word: string, k: number): number => {
  const wordLen = word.length;
  let numValidSubstrings = 0;
  let start = 0;
  let end = 0;
  let vowelCount = new Map<string, number>();
  let consonantCount = 0;

  while (end < wordLen) {
    let newChar = word[end];

    // 更新母音或子音計數
    if (isVowel(newChar)) {
      vowelCount.set(newChar, (vowelCount.get(newChar) || 0) + 1);
    } else {
      consonantCount++;
    }

    // 當包含所有母音且子音數量 >= k 時，計算有效子字串數量
    while (vowelCount.size === 5 && consonantCount >= k) {
      // 計算所有包含當前子字串的所有解數量
      numValidSubstrings += wordLen - end;

      let startLetter = word[start];

      // 依序移除窗口左側的字元，調整母音、子音計數，直到當前窗口的解不合法，則開始找下一組解
      if (isVowel(startLetter)) {
        vowelCount.set(startLetter, (vowelCount.get(startLetter) || 0) - 1);
        if (vowelCount.get(startLetter) === 0) {
          vowelCount.delete(startLetter);
        }
      } else {
        consonantCount--;
      }
      start++;
    }

    end++;
  }

  return numValidSubstrings;
};

const countOfSubstrings = (word: string, k: number): number => {
  // 剛好 k 個子音解數量 = 至少 k 個子音數量 - 至少 k + 1 個子音數量
  return atLeastK(word, k) - atLeastK(word, k + 1);
};
```

如果 `n` 代表 `word` 長度：

- 時間複雜度：`O(n)`，while loop 跑過兩次 n 長度的計算
- 空間複雜度：`O(1)`，只有用上常數變數的空間
