function twoSumTwoPointer(numbers: number[], target: number): number[] {
  let left = 0;
  let right = numbers.length - 1;

  while (left < right) {
    const sum = numbers[left] + numbers[right];
    if (sum > target) {
      right--;
    } else if (sum < target) {
      left++;
    } else {
      return [left, right];
    }
  }

  // edge case
  return [];
};

function twoSumBinarySearch(numbers: number[], target: number): number[] {
  for (let i = 0; i < numbers.length; i++) {
    let l = i + 1
    let r = numbers.length - 1;
    let targetValue = target - numbers[i];

    while (l <= r) {
      let mid = l + Math.floor((r - l) / 2);

      if (numbers[mid] === targetValue) {
        return [i + 1, mid + 1];
      } else if (numbers[mid] < targetValue) {
        l = mid + 1;
      } else {
        r = mid - 1;
      }
    }
  }

  return [];
}