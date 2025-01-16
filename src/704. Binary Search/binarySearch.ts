export function binarySearch(nums: number[], target: number): number {
  // declare left and right
  let left = 0;
  let right = nums.length - 1;

  // run a while loop when left position smaller than right
  while (left <= right) {
    const mid = left + Math.floor((left + right) / 2);

    if (nums[mid] === target) {
      return mid;
    }

    if (nums[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  // return when not found
  return -1;
}
