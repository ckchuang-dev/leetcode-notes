export function twoSum(nums: number[], target: number): number[] {
  // declare a hash map with key for current number and value for its index
  const hashMap = new Map<number, number>();

  for (let i = 0; i < nums.length; i++) {
    // find pair with difference
    const diff = target - nums[i];

    if (hashMap.has(diff)) {
      return [hashMap.get(diff) as number, i];
    } else {
      hashMap.set(nums[i], i);
    }
  }

  // prevent edge case
  return [];
}
