# \[M\] 49. Group Anagrams

## 題目

- [LeetCode 連結](https://leetcode.com/problems/group-anagrams/)
- **主題**：Hash Table、String、Sorting
- **難度**：Medium

## 題目描述

給定一個字串陣列 `strs`，將字母異位詞組合在一起。可以按任意順序返回結果列表。

字母異位詞 (Anagrams) 指的是由重新排列源單詞的字母得到的一個新單詞，所有源單詞中的字母通常恰好只用一次。

### 範例 1

```plain
輸入：strs = ["eat","tea","tan","ate","nat","bat"]
輸出：[["bat"],["nat","tan"],["ate","eat","tea"]]
```

### 範例 2

```plain
輸入：strs = [""]
輸出：[[""]]
```

### 範例 3

```plain
輸入：strs = ["a"]
輸出：[["a"]]
```

### 限制條件

- `1 <= strs.length <= 10^4`
- `0 <= strs[i].length <= 100`
- `strs[i]` 由小寫英文字母組成

## 問題釐清

- 確認關於 anagrams 的定義，像是 eat、ate、tea 這些詞彼此都是對方的 anagrams。(也可見 [242\. Valid Anagram](https://leetcode.com/problems/valid-anagram) 這題 easy )
- `strs` 中會有相同的字串嗎，像是 `[“ab“, “ab“, "c", "c"]` 這樣，如果重複應該也是會被歸類到同一組中，也就是說輸出會是 `[[“ab“, “ab“], [“c“, “c“]]`
- `strs` 中的字串是否也可能不等長

## 提出思路

直覺的想法是用一個 hash map 來存同一組異位詞，key 的部份可以用排序過的字串方便 mapping，value 則為一個字串陣列存每一組結果。

如此實作的話會需要用一個單層迴圈去遍歷 `strs`，假設陣列長度為 `N`，陣列中的字串平均長度為 `K`，則預期的複雜度應該會是：

- 單層迴圈 `O(N)`
- 確認 mapping：`O(1)`
- 每一次的排序字串：`O(K log K)`
- 總時間複雜度為 `O(N * K log K)`
- 空間複雜度用上一個 hash map 儲存，會是 `O(N * K)`

## 實作

```ts
function groupAnagrams(strs: string[]): string[][] {
  const hashMap = new Map<string, string[]>();

  for (let str of strs) {
    const key = str.split('').sort().join();

    if (hashMap.has(key)) {
      hashMap.set(key, [...hashMap.get(key)!, str]);
    } else {
      hashMap.set(key, [str]);
    }
  }

  return Array.from(hashMap.values());
};
```

## 進階挑戰或其他解法探索

看到官方解答中還可以對時間複雜度來優化，核心概念是避開上面的排序，改用一個固定為 26 個字母的 char code 計數並作為 key，就可以把時間複雜度降到 `O(N * K)`

雖然可以寫在一起，但為了可讀性把計數產 key 的邏輯另外收成另一個函式：

```ts
function getKeyByCharCount(str: string): string {
  const countArr = Array(26).fill(0);

  for (let c of str) {
    countArr[c.charCodeAt(0) - "a".charCodeAt(0)]++;
  }

  return countArr.reduce((accu, curr) => `${accu}#${curr}`, '');
}

function groupAnagrams(strs: string[]): string[][] {
  // early return for edge cases
  if (strs.length === 0) {
    return [];
  }

  const hashMap = new Map<string, string[]>();

  for (let str of strs) {
    const key = getKeyByCharCount(str);

    if (hashMap.has(key)) {
      hashMap.set(key, [...hashMap.get(key)!, str]);
    } else {
      hashMap.set(key, [str]);
    }
  }

  return Array.from(hashMap.values());
}
```

雖然理論上這寫法的時間複雜度更低，但實際在 LeetCode 上去 submit 後測試卻是大輸 sorting 法，後來詢問了 GPT 後，提供一個建議是這裡 `reduce` 因為做了反覆拼接字串，實際在底層會造成額外 GC 開銷，如果改用 `countArr.join('#')` 就合理許多了。
