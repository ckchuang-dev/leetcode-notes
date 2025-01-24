import { twoSum } from './twoSum';

describe('Two Sum', () => {
  test.each([
    [[2, 7, 11, 15], 9, [0, 1]],
    [[3, 2, 4], 6, [1, 2]],
    [[3, 3], 6, [0, 1]],
    [[1, 5, 3, 6, 8], 11, [1, 3]],
    [[-3, 4, 3, 90], 0, [0, 2]],
    [[1, 5, 3, 6, 8], 99, []],
  ])(
    'input %j with target %i should return %j',
    (nums: number[], target: number, expected: number[]) => {
      expect(twoSum(nums, target)).toEqual(expected);
    }
  );
});
