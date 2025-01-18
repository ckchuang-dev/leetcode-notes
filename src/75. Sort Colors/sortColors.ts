export function sortColors(nums: (0 | 1 | 2)[]): void {
  // declare count map
  const counts = [0, 0, 0];

  // run a for loop to count each amount of color
  for (let num of nums) {
    counts[num]++;
  }

  // run a for loop to replace input nums with count map
  for (let i = 0; i < nums.length; i++) {
    if (counts[0]) {
      nums[i] = 0;
      counts[0]--;
    } else if (counts[1]) {
      nums[i] = 1;
      counts[1]--;
    } else {
      nums[i] = 2;
      counts[2]--;
    }
  }
}

export function sortColorsThreePointers(nums: number[]): void {
  let left = 0;
  let right = nums.length - 1;
  let current = 0;

  while (current <= right) {
    if (nums[current] === 0) {
      [nums[left], nums[current]] = [nums[current], nums[left]];
      left++;
      current++;
    } else if (nums[current] === 2) {
      [nums[current], nums[right]] = [nums[right], nums[current]];
      right--;
    } else {
      current++;
    }
  }
}
