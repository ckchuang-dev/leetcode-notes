function maxAbsoluteSum(nums: number[]): number {
  const n = nums.length;
  const dpMaxSum = Array.from({ length: n }, () => 0);
  const dpMinSum = Array.from({ length: n }, () => 0);
  let absMax = Math.abs(nums[0]);

  // 初始化 DP 陣列第一個值
  dpMaxSum[0] = nums[0];
  dpMinSum[0] = nums[0];

  for (let i = 1; i < n; i++) {
    const max = nums[i] + dpMaxSum[i - 1];
    const min = nums[i] + dpMinSum[i - 1];

    // 累加子陣列總和與當前數值相比，求最大、最小值
    dpMaxSum[i] = Math.max(max, nums[i]);
    dpMinSum[i] = Math.min(min, nums[i]);

    // 在同個迴圈中計算絕對值最大值
    absMax = Math.max(absMax, dpMaxSum[i], Math.abs(dpMinSum[i]));
  }

  return absMax;
}
