import { permute } from './permute';

describe('Permutations', () => {
  test.each([
    {
      nums: [1, 2, 3],
      expected: [
        [1, 2, 3],
        [1, 3, 2],
        [2, 1, 3],
        [2, 3, 1],
        [3, 1, 2],
        [3, 2, 1]
      ]
    },
    {
      nums: [0, 1],
      expected: [
        [0, 1],
        [1, 0]
      ]
    },
    { nums: [1], expected: [[1]] },
    { nums: [-1, -2, -3, -4, -5, -6], expectedLength: 720 }
  ])(
    'should generate all permutations for $nums',
    ({ nums, expected, expectedLength }) => {
      const result = permute(nums);

      if (expectedLength) {
        expect(result.length).toEqual(expectedLength);
      } else {
        expect(result).toEqual(expected);
      }
    }
  );

  it('should handle long input and check for stack overflow', () => {
    const len = 20;
    const largeArray = Array.from({ length: len }, (_, i) => i + 1);
    let isOverflowed = false;

    try {
      permute(largeArray);
    } catch (error) {
      isOverflowed = true;
    }

    expect(isOverflowed).toBe(false);
  });
});
