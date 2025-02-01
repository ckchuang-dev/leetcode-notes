function isArraySpecial(nums: number[]): boolean {
  if (nums.length <= 1) {
    return true;
  }

  // run a for loop for each num, started from index 1
  for (let i = 1; i < nums.length; i++) {
    // check whether each parity is different
    const current = nums[i] % 2;
    const next = nums[i + 1] % 2;
    const prev = nums[i - 1] % 2;
    if (current === next || current === prev) {
      return false;
    }
  }

  return true;
}
