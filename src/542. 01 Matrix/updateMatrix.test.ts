import { updateMatrix } from './updateMatrix';

const testCases = [
  {
    mat: [
      [0, 0, 0],
      [0, 1, 0],
      [0, 0, 0]
    ],
    expected: [
      [0, 0, 0],
      [0, 1, 0],
      [0, 0, 0]
    ]
  },
  {
    mat: [
      [0, 0, 0],
      [0, 1, 0],
      [1, 1, 1]
    ],
    expected: [
      [0, 0, 0],
      [0, 1, 0],
      [1, 2, 1]
    ]
  },
  {
    mat: [[0]],
    expected: [[0]]
  },
  {
    mat: [
      [1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1],
      [1, 1, 0, 1, 1],
      [1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1]
    ],
    expected: [
      [4, 3, 2, 3, 4],
      [3, 2, 1, 2, 3],
      [2, 1, 0, 1, 2],
      [3, 2, 1, 2, 3],
      [4, 3, 2, 3, 4]
    ]
  }
];

describe('01 Matrix', () => {
  test.each(testCases)(
    'should return expected result for given matrix',
    ({ mat, expected }) => {
      expect(updateMatrix(mat)).toEqual(expected);
    }
  );

  // 壓測案例 (10^4 × 10^4 矩陣，只有左上角是 0)
  test('should handle large matrix performance test', () => {
    const largeTestSize = 10 ** 4;
    const largeMat = Array.from({ length: largeTestSize }, () =>
      Array(largeTestSize).fill(1)
    );
    largeMat[0][0] = 0;

    const result = updateMatrix(largeMat);
    expect(result[0][0]).toBe(0);
    expect(result[largeTestSize - 1][largeTestSize - 1]).toBe(
      largeTestSize * 2 - 2
    );
  });
});
