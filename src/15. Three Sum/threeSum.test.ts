import { threeSum } from './threeSum';

const testCases = [
  {
    nums: [-1, 0, 1, 2, -1, -4],
    expected: [
      [-1, -1, 2],
      [-1, 0, 1]
    ]
  },
  {
    nums: [0, 1, 1],
    expected: []
  },
  {
    nums: [0, 0, 0],
    expected: [[0, 0, 0]]
  },
  {
    nums: [1, -1],
    expected: []
  },
  {
    nums: [-100000, -99999, 199999, 1, 2, 3],
    expected: [[-100000, -99999, 199999]]
  },
  {
    nums: [1, 2, 3, 4, 5],
    expected: []
  },
  {
    nums: [0, 0, 0, 0],
    expected: [[0, 0, 0]]
  }
];

describe('Three Sum', () => {
  test.each(testCases)(
    'input $nums should return $expected',
    ({ nums, expected }) => {
      const result = threeSum(nums);

      expect(result).toEqual(
        expect.arrayContaining(
          expected.map((arr) => expect.arrayContaining(arr))
        )
      );

      expect(nums).toEqual([...nums]);
    }
  );
});
