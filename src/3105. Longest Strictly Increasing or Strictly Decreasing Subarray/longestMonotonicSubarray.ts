export function longestMonotonicSubarray1(nums: number[]): number {
  // 處理 edge cases
  const len = nums.length;

  if (len <= 1) {
    return len;
  }

  // 宣告最長子陣列長度
  let maxSubArrayLen = 0;

  // 用兩個迴圈來尋找最長嚴格遞增子陣列
  for (let start = 0; start < len; start++) {
    let currentLen = 1;
    // 第二層迴圈的初始為第一層索引加上當前索引
    for (let pos = start + 1; pos < len; pos++) {
      // 依序確認當前值與前一個值遞增關係
      if (nums[pos] > nums[pos - 1]) {
        currentLen++;
      } else {
        // 若不為遞增即中斷
        break;
      }
    }
    maxSubArrayLen = Math.max(maxSubArrayLen, currentLen);
  }

  // 用兩個迴圈來尋找最長嚴格遞減子陣列
  for (let start = 0; start < len; start++) {
    let currentLen = 1;

    for (let pos = start + 1; pos < len; pos++) {
      if (nums[pos] < nums[pos - 1]) {
        currentLen++;
      } else {
        break;
      }
    }
    maxSubArrayLen = Math.max(maxSubArrayLen, currentLen);
  }

  // 回傳最長子陣列長度
  return maxSubArrayLen;
}

export function longestMonotonicSubarray2(nums: number[]): number {
  let maxSubArrayLen = 1;
  let incLen = 1;
  let decLen = 1;

  for (let i = 0; i < nums.length - 1; i++) {
    const curr = nums[i];
    const next = nums[i + 1];

    if (next > curr) {
      // 遞增
      incLen++;
      decLen = 1;
    } else if (next < curr) {
      // 遞減
      decLen++;
      incLen = 1;
    } else {
      // 相等
      incLen = 1;
      decLen = 1;
    }

    maxSubArrayLen = Math.max(maxSubArrayLen, Math.max(incLen, decLen));
  }

  return maxSubArrayLen;
}
