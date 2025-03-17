function longestConsecutive(nums: number[]): number {
  const numSet = new Set([...nums]);
  let maxLen = 0;

  for (let num of numSet.values()) {
    // 非起點則略過
    if (numSet.has(num - 1)) {
      continue;
    }

    let currentLen = 1;
    let next = num + 1;

    while (numSet.has(next)) {
      currentLen++;
      next++;
    }

    // 找到當前起點的最長序列後，紀錄到最大長度中
    maxLen = Math.max(maxLen, currentLen);
  }

  return maxLen;
};