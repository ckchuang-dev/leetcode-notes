import { majorityElement } from './majorityElement';

describe('Majority Element', () => {
  test.each([
    [[3, 2, 3], 3],
    [[2, 2, 1, 1, 1, 2, 2], 2],
    [[-1, -1, -1, 3, 3], -1],
    [[1], 1],
    [[1, 1, 2, 2], null],
    [[2147483647, 2147483647, -2147483648, 2147483647], 2147483647]
  ])('%j as input, the result should be %i', (nums: number[], expected) => {
    expect(majorityElement(nums)).toBe(expected);
  });
});
