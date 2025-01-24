export function majorityElement(nums: number[]): number | null {
  // declare a map
  const countMap = new Map<number, number>();
  const halfLen = nums.length / 2;

  // run a for loop to check whether current num amount > n/2
  for (let num of nums) {
    const count = (countMap.get(num) || 0) + 1;
    countMap.set(num, count);

    if (count > halfLen) {
      return num;
    }
  }

  return null;
}
