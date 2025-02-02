# 1752. Check if Array Is Sorted and Rotated

- [Question link](https://leetcode.com/problems/check-if-array-is-sorted-and-rotated)
- 主題：Array
- 難度：Easy
- Daily：2025-02-02

## 筆記

一開始沒想到特別的解法，用偏向暴力解雙層迴圈先去排序陣列後，再一一比對每一種旋轉法看是否與 `nums` 相等：

```ts
function check(nums: number[]): boolean {
  // 若 nums 長度小於等於 1 回傳 true
  const len = nums.length;

  if (len <= 1) {
    return true;
  }

  // 將 nums 做遞增排序
  const sortedNums = [...nums].sort((a, b) => a - b);
  let pivot = 0;
  let counter = 0;

  // 跑 for 迴圈去變換陣列確認是否與 nums 相等
  while (pivot < len) {
    for (let i = 0; i < len; i++) {
      if (sortedNums[i] !== nums[i]) {
        break;
      }
      counter++;
    }
    if (counter === len) {
      return true;
    }
    const val = sortedNums.shift();

    sortedNums.push(val);
    console.log(sortedNums);
    pivot++;
    counter = 0;
  }

  return false;
}
```

雖然這個解法可以 AC，但時間複雜度 (`O(n^2)`) 從排名看起來是太高，研究了一下其他更有效率的解法。

看到這個最佳解可以把時間複雜度降到 `O(n)` 且空間複雜度降低到 `O(1)`：

```ts
function check(nums: number[]): boolean {
  // 計算當前 nums 相鄰數字間遞減次數
  let count = 0;
  const n = nums.length;

  for (let i = 0; i < n; i++) {
    // 當前數比下一個數字大則計數
    if (nums[i] > nums[(i + 1) % n]) {
      count++;
    }

    // 只要遞減超過 1 次則代表不可能透過旋轉排序完成
    if (count > 1) {
      return false;
    }
  }

  return true;
}
```

乍看之下有點難懂，但如果用範例搭配著理解後就能知道這解法的聰明之處。題目是想確認該數字陣列是否可以經過「旋轉」後成為非遞減順序的數組，換個角度想只要跑一個迴圈依序去檢查當前與下一個數的呈現遞減的次數是否超過 1 次即能確認，因為遞減 2 次以上代表沒辦法透過旋轉元素的方式排序完成。

舉範例一 `nums = [3, 4, 5, 1, 2]` 來說：

- nums[0] = 3，nums[1] = 4 → 3 < 4 ✅
- nums[1] = 4，nums[2] = 5 → 4 < 5 ✅
- nums[2] = 5，nums[3] = 1 → 5 > 1 ❌ (count = 1)
- nums[3] = 1，nums[4] = 2 → 1 < 2 ✅
- nums[4] = 2，nums[0] = 3 → 2 < 3 ✅

下降次數 1 次所以符合需求。

再舉範例二的 `nums = [2, 1, 3, 4]` 來看：

- nums[0] = 2，nums[1] = 1 → 2 > 1 ❌ (count = 1)
- nums[1] = 1，nums[2] = 3 → 1 < 3 ✅
- nums[2] = 3，nums[3] = 4 → 3 < 4 ✅
- nums[3] = 4，nums[0] = 2 → 4 > 2 ❌ (count = 2)

因為遞減次數 `count` 超過 1，所以無法透過旋轉方式完成排序。
