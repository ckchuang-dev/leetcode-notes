export function check1(nums: number[]): boolean {
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
    const val = sortedNums.shift()!;

    sortedNums.push(val);
    console.log(sortedNums);
    pivot++;
    counter = 0;
  }

  return false;
}

export function check2(nums: number[]): boolean {
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
