export function maxAscendingSum(nums: number[]): number {
  // declare max sum and current substring sum
  let max = nums[0];
  let currentSum = nums[0];

  // run a for loop to check ascending sum
  for (let i = 1; i < nums.length; i++) {
    // check if current num and prev num are in ascending order
    if (nums[i] > nums[i - 1]) {
      currentSum += nums[i];
    } else {
      max = Math.max(max, currentSum);
      currentSum = nums[i];
    }
  }

  // return final result
  return Math.max(max, currentSum);
}
