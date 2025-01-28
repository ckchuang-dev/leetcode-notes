// 用 hash map 版本的 two sum 並排除重複結果
function twoSum(nums: number[], target: number): number[][] {
  const hashMap = new Map<number, number>();
  const resultMap = new Map<number, number[]>();

  for (let i = 0; i < nums.length; i++) {
    // find pair with difference
    const diff = target - nums[i];

    if (hashMap.has(diff) && !resultMap.has(diff)) {
      resultMap.set(diff, [diff, nums[i]]);
    } else {
      hashMap.set(nums[i], i);
    }
  }

  return Array.from(resultMap.values());
}

export function threeSum(nums: number[]): number[][] {
  // handle edge case
  if (nums.length < 3) {
    return [];
  }
  // sort nums with new array
  const sortedNums = [...nums].sort((a, b) => a - b);

  // declare result
  const result: number[][] = [];

  // for X + Y = -Z, run a for loop to handle each Z
  for (let i = 0; i < sortedNums.length - 2; i++) {
    const current = sortedNums[i];

    // when current Z is same as previous one, skip
    if (i !== 0 && current === sortedNums[i - 1]) {
      continue;
    }
    // handle two sum for X, Y
    const pairs = twoSum(sortedNums.slice(i + 1), -current);

    for (let pair of pairs) {
      result.push([current, ...pair]);
    }
  }

  // return final result
  return result;
}
