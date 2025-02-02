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

雖然這個解法可以 AC，但複雜度從排名看起來是太高，研究了一下其他更有效率的解法。

```ts
function check(nums: number[]): boolean {
  let count = 0;
  const n = nums.length;

  for (let i = 0; i < n; i++) {
    if (nums[i] > nums[(i + 1) % n]) {
      count++;
    }

    if (count > 1) {
      return false;
    }
  }

  return true;
}
```
