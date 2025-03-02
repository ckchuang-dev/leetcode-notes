# [E] 2570. Merge Two 2D Arrays by Summing Values

## 題目

- [LeetCode 連結](https://leetcode.com/problems/merge-two-2d-arrays-by-summing-values)
- **主題**：Array, Two Pointers, Hash Table
- **難度**：Easy (Rating: 1281)
- **Daily**：2025-03-02

## 題目描述

給定兩個二維整數陣列 `nums1` 和 `nums2`。

- `nums1[i] = [idi, vali]` 表示具有 ID `idi` 的數值為 `vali`。
- `nums2[i] = [idi, vali]` 表示具有 ID `idi` 的數值為 `vali`。

每個陣列都包含唯一的 ID，並且按照 ID 的升序排序。

請將兩個陣列合併成一個新的陣列，並按照以下條件處理：

1. 只包含至少出現在一個陣列中的 ID。
2. 每個 ID 只能出現一次，其對應的值應該是該 ID 在兩個陣列中的值的總和。如果某個 ID 只出現在其中一個陣列，則假設在另一個陣列中的值為 0。
3. 返回的陣列必須按照 ID 升序排列。

### 範例 1

```plain
輸入：nums1 = [[1,2],[2,3],[4,5]], nums2 = [[1,4],[3,2],[4,1]]
輸出：[[1,6],[2,3],[3,2],[4,6]]
解釋：
- ID = 1，值為 2 + 4 = 6。
- ID = 2，值為 3。
- ID = 3，值為 2。
- ID = 4，值為 5 + 1 = 6。
```

### 範例 2

```plain
輸入：nums1 = [[2,4],[3,6],[5,5]], nums2 = [[1,3],[4,3]]
輸出：[[1,3],[2,4],[3,6],[4,3],[5,5]]
解釋：
沒有重複的 ID，因此只需直接包含每個 ID 及其對應的值。
```

### 限制條件

- `1 <= nums1.length, nums2.length <= 200`
- `nums1[i].length == nums2[j].length == 2`
- `1 <= idi, vali <= 1000`
- 兩個陣列中的 ID 均唯一。
- 兩個陣列的 ID 按嚴格遞增順序排列。

## 問題釐清

- 兩個陣列都只有獨立的 id，且升序排列，確保不用考慮同陣列裡的合併問題

## 提出思路

直覺上是可以做一個 hash map 來處理：

- 迴圈掃過一次 `nums1`，依照 key, value 放入 map
- 迴圈掃過一次 `nums2`，依照 key, value 放入 map，若存在則加總
- map 轉陣列並做排序後回傳

## **實作**

```ts
function mergeArrays(nums1: number[][], nums2: number[][]): number[][] {
  const hashMap = new Map<number, number>();

  for (let [k, v] of nums1) {
    hashMap.set(k, v);
  }

  for (let [k, v] of nums2) {
    if (hashMap.has(k)) {
      hashMap.set(k, hashMap.get(k)! + v);
    } else {
      hashMap.set(k, v);
    }
  }

  return Array.from(hashMap).sort((a, b) => a[0] - b[0]);
}
```

## **複雜度分析**

如果 `nums1` 長度為 N，`nums2` 長度為 M，合併後的長度為 K：

- **時間複雜度：**
  - 分別跑迴圈做 hash map 需要 `O(N + M)`
  - 最後 Map 轉陣列的操作會跑過 `O(K)`
  - 做排序需要 `O(K log K)`
  - 因此總共會花費 `O(N + M + K log K)`
- **空間複雜度：** `O(K)`，用來儲存 hash map

## 其他更優解

上面的解法其實浪費掉題目已經排序好的這個特性，後來看了下教學也可以用 two pointer 來解，也試著理解一下思路：

- 用兩個指針 `i`, `j` 來分別指 `nums1` 跟 `nums2`
- 如果 `nums1[i][0] === nums2[j][0]`，則合併相加並移動 `i` 和 `j`
- 如果 `nums1[i][0] < nums2[j][0]`，則加入 `nums1[i]`，然後移動 `i`。反之，加入 `nums2[j]`，然後移動 `j`
- 最後，若 `nums1` 或 `nums2` 中有剩餘的部份，將剩餘數組加入結果陣列

```ts
function mergeArraysTwoPointer(
  nums1: number[][],
  nums2: number[][]
): number[][] {
  let res: number[][] = [];
  let i = 0;
  let j = 0;

  while (i < nums1.length && j < nums2.length) {
    if (nums1[i][0] === nums2[j][0]) {
      res.push([nums1[i][0], nums1[i][1] + nums2[j][1]]);
      i++;
      j++;
    } else if (nums1[i][0] < nums2[j][0]) {
      res.push([nums1[i][0], nums1[i][1]]);
      i++;
    } else {
      res.push([nums2[j][0], nums2[j][1]]);
      j++;
    }
  }

  if (i < nums1.length) {
    res = res.concat(nums1.slice(i, nums1.length));
  } else {
    res = res.concat(nums2.slice(j, nums2.length));
  }

  return res;
}
```

複雜度分析：

- **時間複雜度：** 迴圈的最差狀況下跑過 N + M 的長度，所以是 `O(N + M)`
- **空間複雜度：** 結果陣列最差狀況下會是全部都不同的 N + M 長度，所以是 `O(N + M)`
