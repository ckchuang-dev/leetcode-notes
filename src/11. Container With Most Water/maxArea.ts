export function maxArea(height: number[]): number {
  // edge case for empty input
  if (height.length === 0) {
    return 0;
  }
  // declare max multiply
  let max = 0;

  // declare two pointer to calculate
  let left = 0;
  let right = height.length - 1;

  // run a while loop when left < right
  while (left < right) {
    // calculate current max and move pointer
    const currentWidth = right - left;
    const currentHeight = Math.min(height[left], height[right]);
    max = Math.max(max, currentWidth * currentHeight);

    // move the pointer when smaller than another
    if (height[left] < height[right]) {
      left++;
    } else {
      right--;
    }
  }

  // return result
  return max;
}
