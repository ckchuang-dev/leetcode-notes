import { binarySearch } from './binarySearch';

describe('Basic Binary Search', () => {
  test.each([
    [[-1, 0, 3, 5, 9, 12], 9, 4],
    [[-1, 0, 3, 5, 9, 12], 2, -1],
    [[1], 1, 0],
    [[1, 3, 5, 7, 9], 7, 3],
    [[], 10, -1]
  ])('should return %s for search(%s, %s)', (nums, target, expected) => {
    expect(binarySearch(nums, target)).toBe(expected);
  });
});
