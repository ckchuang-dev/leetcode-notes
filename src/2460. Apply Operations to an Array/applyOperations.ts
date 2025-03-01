function applyOperations(nums: number[]): number[] {
  const n = nums.length;
  const nonZeroNums: number[] = [];

  for (let i = 0; i < n - 1; i++) {
    if (nums[i] === nums[i + 1]) {
      nums[i] = nums[i] * 2;
      nums[i + 1] = 0;
    }
    if (nums[i] !== 0) {
      nonZeroNums.push(nums[i]);
    }
  }
  // handle edge num
  if (nums[n - 1] !== 0) {
    nonZeroNums.push(nums[n - 1]);
  }

  // concat non-zeros and remaining zeros
  return [
    ...nonZeroNums,
    ...Array.from({ length: n - nonZeroNums.length }, () => 0)
  ];
}
