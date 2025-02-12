export function maximumSumSlow(nums: number[]): number {
  // declare hash map
  const sumDigitsToNumber: Record<number, number[]> = {};
  let max = -1;

  // run a for loop to calculate sum of digits, push into hash map
  for (let num of nums) {
    let sum = 0;
    let currentNum = num;

    while (currentNum > 0) {
      sum += currentNum % 10;
      currentNum = Math.floor(currentNum / 10);
    }
    if (sumDigitsToNumber[sum]) {
      sumDigitsToNumber[sum].push(num);
    } else {
      sumDigitsToNumber[sum] = [num];
    }
  }

  // check each combination sum, return the max
  for (let numbers of Object.values(sumDigitsToNumber)) {
    if (numbers.length < 2) {
      continue;
    }

    for (let i = 0; i < numbers.length - 1; i++) {
      for (let j = i + 1; j < numbers.length; j++) {
        max = Math.max(max, numbers[i] + numbers[j]);
      }
    }
  }

  return max;
}

// better implementation: record max number to hash map and calculate max sum each time
export function maximumSum(nums: number[]): number {
  // declare hash map
  const sumToMaxNum: Record<number, number> = {};
  let maxSum = -1;

  // run a for loop to calculate sum of digits, push into hash map
  for (let num of nums) {
    let digitsSum = 0;
    let remaining = num;

    // sum up each digit
    while (remaining > 0) {
      digitsSum += remaining % 10;
      remaining = Math.floor(remaining / 10);
    }

    // pair exist, calculate max sum
    if (sumToMaxNum[digitsSum]) {
      maxSum = Math.max(maxSum, num + sumToMaxNum[digitsSum]);
    }

    // replace max num if needed
    sumToMaxNum[digitsSum] = Math.max(num, sumToMaxNum[digitsSum] ?? 0);
  }

  return maxSum;
}
