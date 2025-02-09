export function countBadPairs(nums: number[]): number {
  let n = nums.length;
  let totalPairs = (n * (n - 1)) / 2;
  let goodPairs = 0;

  let countMap = new Map<number, number>();

  for (let i = 0; i < n; i++) {
    let diff = nums[i] - i;
    if (countMap.has(diff)) {
      goodPairs += countMap.get(diff)!;
    }
    countMap.set(diff, (countMap.get(diff) || 0) + 1);
  }

  return totalPairs - goodPairs;
}
