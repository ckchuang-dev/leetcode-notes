function maximumCountBasic(nums: number[]): number {
  let positives = 0;
  let negatives = 0;

  for (let num of nums) {
    if (num > 0) {
      positives++;
    } else if (num < 0) {
      negatives++;
    }
  }

  return Math.max(positives, negatives);
}

function binarySearch(nums: number[], target: number): number {
  let left = 0,
    right = nums.length;

  while (left < right) {
    let mid = Math.floor((left + right) / 2);
    if (nums[mid] < target) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }
  return left;
}

function maximumCountBinarySearch(nums: number[]): number {
  let posIndex = binarySearch(nums, 1);
  let positives = nums.length - posIndex;
  let negIndex = binarySearch(nums, 0);
  let negatives = negIndex;

  return Math.max(positives, negatives);
}
